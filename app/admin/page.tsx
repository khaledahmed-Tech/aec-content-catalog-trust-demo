"use client";

import { useEffect, useMemo, useState } from "react";
import { catalogAssets, contentRequests, datasetMeta } from "@/src/data";
import type { ContentRequest } from "@/src/types/requests";
import type { Discipline } from "@/src/types/catalog";
import { daysBetween, getAdminReviewPriority, median } from "@/src/lib/catalog-logic";
import { ModuleIntroCard, PmTakeaway } from "@/components/catalog-ui";
import { PageIntro } from "@/components/ui";
import { AuditTrail, PriorityBadge, PriorityBreakdown, RequestStatusBadge, ValidationSummary, type DemoAuditEntry } from "@/components/request-admin-ui";
import { demoTimestamp, emptyDemoRequestState, loadDemoRequestState, nextAuditId, saveDemoRequestState, type DemoRequestState } from "@/src/lib/demo-request-state";

type PriorityBand = "Urgent" | "High" | "Normal";
type AgeBand = "under7" | "days7To14" | "days15To30" | "over30";

type QueueItem = {
  request: ContentRequest;
  priority: ReturnType<typeof getAdminReviewPriority>;
  age: number;
};

const disciplines: Discipline[] = ["Architecture", "Structural", "MEP", "Civil", "Interior", "General"];
const owners = ["Architecture Content Team", "Building Systems Content Team", "Civil Content Team", "Electrical Content Team", "Interior Content Team", "Structural Content Team", "General Standards Team"];

export default function AdminPage() {
  const [demoState, setDemoState] = useState<DemoRequestState>(emptyDemoRequestState);
  const [selectedId, setSelectedId] = useState<string>("AEC-REQ-0004");
  const [filters, setFilters] = useState<{ status: string; discipline: string; requestType: string; owner: string; ageBand: string; priorityBand: string }>({ status: "Open", discipline: "", requestType: "", owner: "", ageBand: "", priorityBand: "" });
  const [owner, setOwner] = useState(owners[0]);
  const [linkedAssetId, setLinkedAssetId] = useState("");
  const [resultingVersion, setResultingVersion] = useState("");
  const [decisionNote, setDecisionNote] = useState("");
  const [actionErrors, setActionErrors] = useState<string[]>([]);

  useEffect(() => { setDemoState(loadDemoRequestState()); }, []);

  const requests = useMemo(() => [...contentRequests, ...demoState.localRequests].map((request) => ({ ...request, ...demoState.requestOverrides[request.requestId] } as ContentRequest)), [demoState]);
  const queue = useMemo(() => requests.map((request): QueueItem => ({ request, priority: getAdminReviewPriority({ reviewItemId: `LOCAL-${request.requestId}`, itemType: "Content Request", entityId: request.requestId, title: request.title, discipline: request.discipline, submittedAt: request.submittedAt, assignedOwner: request.assignedOwner, reviewStatus: "Open", prioritySource: "Content-request priority rule", priority: request.priority, reasonChips: [], recommendedNextAction: "Review user context and record a simulated decision.", queueRank: 0 }, catalogAssets, requests), age: daysBetween(request.submittedAt, datasetMeta.asOfDate) })).sort((a, b) => b.priority.score - a.priority.score || a.request.submittedAt.localeCompare(b.request.submittedAt) || a.request.requestId.localeCompare(b.request.requestId)), [requests]);
  const filteredQueue = queue.filter(({ request, priority, age }) => {
    const open = !["Fulfilled", "Declined"].includes(request.status);
    if (filters.status === "Open" && !open) return false;
    if (filters.status && filters.status !== "Open" && request.status !== filters.status) return false;
    if (filters.discipline && request.discipline !== filters.discipline) return false;
    if (filters.requestType && request.requestType !== filters.requestType) return false;
    if (filters.owner === "Unassigned" && request.assignedOwner) return false;
    if (filters.owner && filters.owner !== "Unassigned" && request.assignedOwner !== filters.owner) return false;
    if (filters.priorityBand && priority.band !== filters.priorityBand) return false;
    if (filters.ageBand && !matchesAgeBand(age, filters.ageBand as AgeBand)) return false;
    return true;
  });
  const selected = queue.find((item) => item.request.requestId === selectedId) ?? filteredQueue[0] ?? queue[0];
  const selectedAudit = selected ? demoState.auditEntries.filter((entry) => entry.requestId === selected.request.requestId) : [];
  const selectedIsTerminal = selected ? ["Fulfilled", "Declined"].includes(selected.request.status) : false;
  const openRequests = queue.filter((item) => !["Fulfilled", "Declined"].includes(item.request.status));
  const summary = { open: openRequests.length, high: openRequests.filter((item) => ["Urgent", "High"].includes(item.priority.band)).length, medianAge: median(openRequests.map((item) => item.age)) ?? 0, unassigned: openRequests.filter((item) => !item.request.assignedOwner).length };

  const persist = (nextState: DemoRequestState) => { saveDemoRequestState(nextState); setDemoState(nextState); };
  const applyUpdate = (request: ContentRequest, changes: Partial<ContentRequest>, action: string, note?: string) => {
    const sequence = demoState.auditEntries.length + demoState.localRequests.length;
    const timestamp = demoTimestamp(sequence);
    const auditEntry: DemoAuditEntry = { auditEventId: nextAuditId(demoState.auditEntries.length), requestId: request.requestId, action, fromValue: request.status, toValue: changes.status ?? request.status, note: note ?? (decisionNote || null), occurredAt: timestamp };
    const nextState = { ...demoState, requestOverrides: { ...demoState.requestOverrides, [request.requestId]: { ...demoState.requestOverrides[request.requestId], ...changes, updatedAt: timestamp } }, auditEntries: [...demoState.auditEntries, auditEntry] };
    persist(nextState);
    setActionErrors([]);
  };

  const transition = (status: ContentRequest["status"]) => {
    if (!selected) return;
    const errors: string[] = [];
    if (status === "Declined" && !decisionNote.trim()) errors.push("Decline requires a decision note.");
    if (status === "Fulfilled") {
      if (!decisionNote.trim()) errors.push("Fulfill requires a decision note.");
      if (!linkedAssetId) errors.push("Fulfill requires a linked approved asset.");
      if (!resultingVersion.trim()) errors.push("Fulfill requires a resulting version.");
    }
    if (errors.length > 0) { setActionErrors(errors); return; }
    applyUpdate(selected.request, { status, decisionNote: decisionNote.trim() || selected.request.decisionNote, linkedAssetId: linkedAssetId || selected.request.linkedAssetId, resultingVersion: resultingVersion || selected.request.resultingVersion }, `request_status_changed:${status}`, decisionNote.trim());
  };

  return <div className="space-y-8"><PageIntro eyebrow="Module 4 · Govern the queue" title="Admin review queue" description="What should a content admin triage next, why, and what simulated decision can they record?" /><div className="grid gap-6 lg:grid-cols-[1fr_340px]"><ModuleIntroCard title="Transparent triage"><p>Priority is recalculated from deterministic demand, urgency, age, coverage, and substitute inputs. Admins can filter and act, but they cannot manually overwrite priority points.</p></ModuleIntroCard><PmTakeaway>Catalog trust improves when demand and decisions are inspectable. A visible audit trail makes governance less opaque without turning priority into an automated decision.</PmTakeaway></div><section className="grid gap-4 md:grid-cols-4"><SummaryCard label="Open requests" value={summary.open} /><SummaryCard label="High priority" value={summary.high} /><SummaryCard label="Median age" value={`${summary.medianAge} days`} /><SummaryCard label="Unassigned" value={summary.unassigned} /></section><section className="card space-y-4"><p className="eyebrow">Queue filters</p><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6"><Select label="Status" value={filters.status} options={["Open", "Submitted", "Triaged", "In Review", "Fulfilled", "Declined"]} onChange={(value) => setFilters((current) => ({ ...current, status: value }))} /><Select label="Discipline" value={filters.discipline} options={disciplines} onChange={(value) => setFilters((current) => ({ ...current, discipline: value }))} /><Select label="Request type" value={filters.requestType} options={["New Content", "Revision"]} onChange={(value) => setFilters((current) => ({ ...current, requestType: value }))} /><Select label="Owner" value={filters.owner} options={["Unassigned", ...owners]} onChange={(value) => setFilters((current) => ({ ...current, owner: value }))} /><Select label="Age" value={filters.ageBand} options={["under7", "days7To14", "days15To30", "over30"]} onChange={(value) => setFilters((current) => ({ ...current, ageBand: value }))} /><Select label="Priority" value={filters.priorityBand} options={["Urgent", "High", "Normal"]} onChange={(value) => setFilters((current) => ({ ...current, priorityBand: value }))} /></div></section><section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"><div className="space-y-4">{filteredQueue.map((item) => <button key={item.request.requestId} onClick={() => setSelectedId(item.request.requestId)} className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm ${selected?.request.requestId === item.request.requestId ? "border-[var(--action)] ring-2 ring-[var(--action)]/20" : "border-slate-200"}`}><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold text-slate-950">{item.request.title}</h2><p className="mt-1 text-sm text-slate-600">{item.request.requestId} · {item.request.requestType} · {item.request.discipline}</p></div><div className="flex flex-wrap gap-2"><RequestStatusBadge status={item.request.status} /><PriorityBadge band={item.priority.band} /></div></div><div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600"><span>{item.age} days old</span><span>Required by {item.request.requiredBy ?? "not set"}</span><span>Owner: {item.request.assignedOwner ?? "Unassigned"}</span><span>Score: {item.priority.score}</span></div></button>)}{filteredQueue.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">No requests match the selected filters.</div> : null}</div>{selected ? <aside className="card space-y-5"><div><p className="eyebrow">Request detail</p><h2 className="mt-2 text-xl font-bold text-slate-950">{selected.request.title}</h2><div className="mt-3 flex flex-wrap gap-2"><RequestStatusBadge status={selected.request.status} /><PriorityBadge band={selected.priority.band} /><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{selected.priority.score} points</span></div></div><dl className="grid gap-3 text-sm"><Info label="User need" value={selected.request.projectNeed} /><Info label="Source search" value={selected.request.sourceQuery || "No originating query captured"} /><Info label="Demand evidence" value={`${selected.request.relatedZeroResultCount} zero-result searches · ${selected.request.relatedOpenRequestCount} open similar requests`} /><Info label="Substitute" value={selected.request.substituteAccepted ? "Approved substitute acceptable" : "No acceptable substitute"} /></dl><PriorityBreakdown priority={selected.priority} /><ValidationSummary errors={actionErrors} /><div className="grid gap-3"><Select label="Assign owner" value={owner} options={owners} onChange={setOwner} /><button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700" onClick={() => applyUpdate(selected.request, { assignedOwner: owner }, "owner_assigned", `Assigned to ${owner}`)}>Assign owner (simulated)</button><Select label="Linked approved asset" value={linkedAssetId} options={catalogAssets.filter((asset) => asset.approvalStatus === "Approved").map((asset) => asset.assetId)} onChange={setLinkedAssetId} /><input className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={resultingVersion} onChange={(event) => setResultingVersion(event.target.value)} placeholder="Resulting version for fulfillment" /><textarea className="min-h-20 rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={decisionNote} onChange={(event) => setDecisionNote(event.target.value)} placeholder="Decision note required for decline or fulfill" /></div><div className="flex flex-wrap gap-2"><button disabled={selectedIsTerminal} className="button disabled:cursor-not-allowed disabled:opacity-50" onClick={() => transition("Triaged")}>Triage</button><button disabled={selectedIsTerminal} className="button disabled:cursor-not-allowed disabled:opacity-50" onClick={() => transition("In Review")}>Move to review</button><button disabled={selectedIsTerminal} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50" onClick={() => applyUpdate(selected.request, { status: "Submitted" }, "request_clarification_requested", "Clarification requested in simulated workflow.")}>Request clarification</button><button disabled={selectedIsTerminal} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" onClick={() => transition("Fulfilled")}>Fulfill</button><button disabled={selectedIsTerminal} className="rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" onClick={() => transition("Declined")}>Decline</button></div><section><p className="eyebrow">Simulated audit trail</p><div className="mt-3"><AuditTrail entries={selectedAudit} /></div></section><p className="rounded-xl bg-stone-50 p-3 text-xs leading-5 text-slate-600">All actions are browser-local simulations. Priority is a triage aid, not a safety, engineering, compliance, or criticality score.</p></aside> : null}</section></div>;
}

function matchesAgeBand(age: number, band: AgeBand) { if (band === "under7") return age < 7; if (band === "days7To14") return age >= 7 && age <= 14; if (band === "days15To30") return age >= 15 && age <= 30; return age > 30; }
function SummaryCard({ label, value }: { label: string; value: string | number }) { return <div className="card"><p className="eyebrow">{label}</p><p className="mt-2 text-3xl font-bold text-slate-950">{value}</p></div>; }
function Info({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</dt><dd className="mt-1 text-slate-700">{value}</dd></div>; }
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="block text-sm font-semibold text-slate-700">{label}<select className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={value} onChange={(event) => onChange(event.target.value)}><option value="">Any</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
