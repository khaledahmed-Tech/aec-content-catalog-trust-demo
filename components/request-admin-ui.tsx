import type { ContentRequest } from "@/src/types/requests";
import type { AdminPriorityResult } from "@/src/lib/catalog-logic";

export interface DemoAuditEntry {
  auditEventId: string;
  requestId: string;
  action: string;
  fromValue?: string | null;
  toValue?: string | null;
  note?: string | null;
  occurredAt: string;
}

export function RequestStatusBadge({ status }: { status: ContentRequest["status"] }) {
  const tone = status === "Fulfilled" ? "bg-emerald-50 text-emerald-800" : status === "Declined" ? "bg-rose-50 text-rose-800" : status === "In Review" ? "bg-blue-50 text-blue-800" : "bg-amber-50 text-amber-900";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

export function PriorityBadge({ band }: { band: AdminPriorityResult["band"] }) {
  const tone = band === "Urgent" ? "bg-rose-50 text-rose-800" : band === "High" ? "bg-amber-50 text-amber-900" : "bg-slate-100 text-slate-700";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{band}</span>;
}

export function ValidationSummary({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4" role="alert"><p className="font-bold text-rose-900">Please fix these fields before submitting.</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-800">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>;
}

export function AuditTrail({ entries }: { entries: DemoAuditEntry[] }) {
  if (entries.length === 0) return <p className="rounded-xl bg-stone-50 p-4 text-sm text-slate-600">No simulated audit entries yet for this request.</p>;
  return <ol className="space-y-3 border-l border-slate-200 pl-4">{entries.map((entry) => <li key={entry.auditEventId} className="text-sm"><p className="font-semibold text-slate-900">{entry.action}</p><p className="text-slate-600">{entry.occurredAt}{entry.note ? ` · ${entry.note}` : ""}</p>{entry.fromValue || entry.toValue ? <p className="text-xs text-slate-500">{entry.fromValue ?? "—"} → {entry.toValue ?? "—"}</p> : null}</li>)}</ol>;
}

export function PriorityBreakdown({ priority }: { priority: AdminPriorityResult }) {
  return <div className="grid gap-2">{priority.components.map((component) => <div key={component.label} className="rounded-xl border border-slate-200 bg-white p-3"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-800">{component.label}</span><span className="text-sm font-bold text-slate-950">{component.points} pts</span></div><p className="mt-1 text-xs leading-5 text-slate-500">{component.explanation}</p></div>)}</div>;
}
