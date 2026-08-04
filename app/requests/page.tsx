"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { catalogAssets, contentRequests, datasetMeta } from "@/src/data";
import type { ContentType, Discipline, SoftwareCompatibility } from "@/src/types/catalog";
import type { ContentRequest } from "@/src/types/requests";
import { ModuleIntroCard, PmTakeaway } from "@/components/catalog-ui";
import { PageIntro } from "@/components/ui";
import { AuditTrail, RequestStatusBadge, ValidationSummary, type DemoAuditEntry } from "@/components/request-admin-ui";
import { demoTimestamp, emptyDemoRequestState, loadDemoRequestState, nextAuditId, nextLocalRequestId, saveDemoRequestState, type DemoRequestState } from "@/src/lib/demo-request-state";

const disciplines: Discipline[] = ["Architecture", "Structural", "MEP", "Civil", "Interior", "General"];
const contentTypes: ContentType[] = ["Revit Family", "AutoCAD Block", "Material", "Detail", "Template", "Schedule"];
const softwareOptions: SoftwareCompatibility[] = ["Revit", "AutoCAD"];

type RequestFormState = {
  requestType: "New Content" | "Revision";
  title: string;
  discipline: Discipline | "";
  desiredContentType: ContentType | "";
  software: SoftwareCompatibility | "";
  compatibleVersionNeed: string;
  projectNeed: string;
  requiredBy: string;
  businessReason: string;
  substituteAccepted: boolean;
  supportingNotes: string;
  existingAssetId: string;
};

const blankForm: RequestFormState = { requestType: "New Content", title: "", discipline: "", desiredContentType: "", software: "", compatibleVersionNeed: "2026", projectNeed: "", requiredBy: "2026-08-14", businessReason: "", substituteAccepted: true, supportingNotes: "", existingAssetId: "" };

export default function RequestsPage() {
  const searchParams = useSearchParams();
  const [demoState, setDemoState] = useState<DemoRequestState>(emptyDemoRequestState);
  const [form, setForm] = useState<RequestFormState>(blankForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<ContentRequest | null>(null);
  const contextSummary = useMemo(() => ({ sourceQuery: searchParams.get("sourceQuery") ?? "", assetId: searchParams.get("assetId") ?? searchParams.get("existingAssetId") ?? "", discipline: searchParams.get("discipline") ?? "", contentType: searchParams.get("contentType") ?? "", software: searchParams.get("software") ?? "", compatibleVersion: searchParams.get("compatibleVersion") ?? "" }), [searchParams]);

  useEffect(() => {
    const loaded = loadDemoRequestState();
    setDemoState(loaded);
    setForm((current) => ({ ...current, requestType: contextSummary.assetId ? "Revision" : current.requestType, existingAssetId: contextSummary.assetId || current.existingAssetId, discipline: (contextSummary.discipline as Discipline) || current.discipline, desiredContentType: (contextSummary.contentType as ContentType) || current.desiredContentType, software: (contextSummary.software as SoftwareCompatibility) || current.software, compatibleVersionNeed: contextSummary.compatibleVersion || current.compatibleVersionNeed, title: searchParams.get("title") ?? current.title }));
  }, [contextSummary, searchParams]);

  const submittedRequests = [...contentRequests, ...demoState.localRequests];
  const auditForConfirmation = confirmation ? demoState.auditEntries.filter((entry) => entry.requestId === confirmation.requestId) : [];

  const update = <K extends keyof RequestFormState>(key: K, value: RequestFormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const validate = () => {
    const nextErrors: string[] = [];
    if (!form.title.trim()) nextErrors.push("Title is required.");
    if (!form.discipline) nextErrors.push("Discipline is required.");
    if (!form.desiredContentType) nextErrors.push("Desired content type is required.");
    if (!form.software) nextErrors.push("Software metadata label is required.");
    if (!form.compatibleVersionNeed.trim()) nextErrors.push("Compatible-version need is required.");
    if (!form.projectNeed.trim()) nextErrors.push("Project need is required. Keep it sanitized and fictional.");
    if (!form.requiredBy) nextErrors.push("Required-by date is required.");
    if (form.requiredBy && form.requiredBy < datasetMeta.asOfDate) nextErrors.push(`Required-by date cannot be earlier than the synthetic current date ${datasetMeta.asOfDate}.`);
    if (!form.businessReason.trim()) nextErrors.push("Business reason is required.");
    if (form.requestType === "Revision" && !form.existingAssetId) nextErrors.push("Existing asset reference is required for revision requests.");
    return nextErrors;
  };

  const submit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    const requestId = nextLocalRequestId(demoState.localRequests.length);
    const sequence = demoState.localRequests.length + demoState.auditEntries.length;
    const timestamp = demoTimestamp(sequence);
    const newRequest: ContentRequest = { requestId, requestType: form.requestType, title: form.title.trim(), discipline: form.discipline as Discipline, desiredContentType: form.desiredContentType as ContentType, software: form.software as SoftwareCompatibility, compatibleVersionNeed: form.compatibleVersionNeed.trim(), projectNeed: form.projectNeed.trim(), requiredBy: form.requiredBy, businessReason: `${form.businessReason.trim()}${form.supportingNotes.trim() ? ` Supporting notes: ${form.supportingNotes.trim()}` : ""}`, existingAssetId: form.requestType === "Revision" ? form.existingAssetId : null, substituteAccepted: form.substituteAccepted, sourceQuery: contextSummary.sourceQuery, sourceFilters: { discipline: form.discipline as Discipline, contentType: form.desiredContentType as ContentType, software: form.software as SoftwareCompatibility, compatibleVersion: form.compatibleVersionNeed }, status: "Submitted", submittedAt: timestamp, updatedAt: timestamp, assignedOwner: null, relatedZeroResultCount: contextSummary.sourceQuery ? 1 : 0, relatedOpenRequestCount: 0, coverageStatus: "No Approved Candidate", linkedAssetId: form.requestType === "Revision" ? form.existingAssetId : null, resultingVersion: null, decisionNote: null, priority: { demandEvidence: contextSummary.sourceQuery ? 10 : 0, requiredByProximity: 0, requestAge: 3, coverageGap: 15, noAcceptableSubstitute: form.substituteAccepted ? 0 : 10, score: 0, band: "Normal" } };
    const auditEntry: DemoAuditEntry = { auditEventId: nextAuditId(demoState.auditEntries.length), requestId, action: "content_request_submitted", fromValue: null, toValue: "Submitted", note: "Simulated browser-local request submission.", occurredAt: timestamp };
    const nextState = { ...demoState, localRequests: [...demoState.localRequests, newRequest], auditEntries: [...demoState.auditEntries, auditEntry] };
    saveDemoRequestState(nextState);
    setDemoState(nextState);
    setConfirmation(newRequest);
    setErrors([]);
  };

  const cancel = () => { setForm(blankForm); setErrors([]); setConfirmation(null); };

  return <div className="space-y-8"><PageIntro eyebrow="Module 3 · Capture unmet demand" title="Submit a content request" description="Can a designer communicate an unmet synthetic content need with enough context for transparent governance?" /><div className="grid gap-6 lg:grid-cols-[1fr_340px]"><ModuleIntroCard title="Structured demand capture"><p>This workflow captures sanitized catalog context, need, timing, and substitute acceptance without collecting real project identifiers, customer names, personal data, attachments, or proprietary content.</p></ModuleIntroCard><PmTakeaway>Failed discovery becomes more useful when it preserves user intent and filter context. Structured requests help admins distinguish coverage gaps from taxonomy or governance issues.</PmTakeaway></div>{Object.values(contextSummary).some(Boolean) ? <section className="card"><p className="eyebrow">Originating context</p><div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">{Object.entries(contextSummary).filter(([, value]) => value).map(([key, value]) => <p key={key} className="rounded-xl bg-stone-50 p-3"><span className="font-semibold">{key}: </span>{value}</p>)}</div></section> : null}<section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><div className="card space-y-5"><ValidationSummary errors={errors} /><div className="grid gap-4 md:grid-cols-2"><Select label="Request type" value={form.requestType} options={["New Content", "Revision"]} onChange={(value) => update("requestType", value as RequestFormState["requestType"])} /><Field label="Title" value={form.title} onChange={(value) => update("title", value)} /><Select label="Discipline" value={form.discipline} options={disciplines} onChange={(value) => update("discipline", value as Discipline | "")} /><Select label="Desired content type" value={form.desiredContentType} options={contentTypes} onChange={(value) => update("desiredContentType", value as ContentType | "")} /><Select label="Software metadata label" value={form.software} options={softwareOptions} onChange={(value) => update("software", value as SoftwareCompatibility | "")} /><Field label="Compatible-version need" value={form.compatibleVersionNeed} onChange={(value) => update("compatibleVersionNeed", value)} /><Field label="Required-by date" type="date" value={form.requiredBy} onChange={(value) => update("requiredBy", value)} />{form.requestType === "Revision" ? <Select label="Existing asset reference" value={form.existingAssetId} options={catalogAssets.map((asset) => asset.assetId)} onChange={(value) => update("existingAssetId", value)} /> : null}</div><TextArea label="Project need" value={form.projectNeed} onChange={(value) => update("projectNeed", value)} /><TextArea label="Business reason" value={form.businessReason} onChange={(value) => update("businessReason", value)} /><TextArea label="Supporting notes (optional, synthetic only)" value={form.supportingNotes} onChange={(value) => update("supportingNotes", value)} /><label className="flex items-center gap-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={form.substituteAccepted} onChange={(event) => update("substituteAccepted", event.target.checked)} /> An approved substitute would be acceptable</label><p className="rounded-xl bg-stone-50 p-3 text-xs leading-5 text-slate-600">Do not enter real project names, customer data, personal information, files, attachments, or proprietary design details.</p><div className="flex flex-wrap gap-3"><button className="button" onClick={submit}>Submit simulated request</button><button className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700" onClick={cancel}>Cancel</button></div></div><aside className="space-y-6">{confirmation ? <section className="card"><p className="eyebrow">Submission confirmation</p><h2 className="mt-2 text-xl font-bold text-slate-950">{confirmation.requestId}</h2><p className="mt-2 text-sm text-slate-600">Status: <RequestStatusBadge status={confirmation.status} /></p><p className="mt-3 text-sm text-slate-600">The request is browser-local and simulated. It is now visible in the Admin Queue on this device.</p><Link className="button mt-5 inline-flex" href="/admin">Open Admin Queue →</Link><div className="mt-5"><AuditTrail entries={auditForConfirmation} /></div></section> : <section className="card"><p className="eyebrow">Review before submit</p><p className="mt-3 text-sm leading-6 text-slate-600">Validation preserves your entered values. Submission creates a deterministic local ID, Submitted status, timestamps, and a visible simulated audit entry.</p></section>}</aside></section><section className="card"><p className="eyebrow">Seeded and current-session requests</p><div className="mt-4 grid gap-3">{submittedRequests.map((request) => <article key={request.requestId} className="rounded-xl border border-slate-200 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold text-slate-950">{request.title}</h3><p className="text-sm text-slate-600">{request.requestId} · {request.requestType} · {request.discipline}</p></div><RequestStatusBadge status={request.status} /></div></article>)}</div></section></div>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<textarea className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<select className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={value} onChange={(event) => onChange(event.target.value)}><option value="">Select...</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
