import Link from "next/link";
import type { CatalogAsset, TrustBand } from "@/src/types/catalog";
import type { GovernanceWarningResult } from "@/src/lib/catalog-logic";

export function ModuleIntroCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="card"><p className="eyebrow">What this screen demonstrates</p><h2 className="mt-3 text-xl font-bold text-slate-950">{title}</h2><div className="mt-3 text-sm leading-6 text-slate-600">{children}</div></section>;
}

export function PmTakeaway({ children }: { children: React.ReactNode }) {
  return <aside className="rounded-2xl border border-[var(--border)] bg-[var(--module-accent)] p-5"><p className="eyebrow text-[var(--action)]">PM takeaway</p><div className="mt-2 text-sm leading-6 text-[var(--ink)]">{children}</div></aside>;
}

export function StatusBadge({ status }: { status: CatalogAsset["approvalStatus"] }) {
  const tone = status === "Approved" ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : status === "Pending Review" ? "bg-amber-50 text-amber-900 ring-amber-200" : "bg-rose-50 text-rose-800 ring-rose-200";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}>{status}</span>;
}

export function TrustBadge({ band }: { band: TrustBand }) {
  const tone = band === "High" ? "bg-emerald-50 text-emerald-800" : band === "Moderate" ? "bg-amber-50 text-amber-900" : "bg-rose-50 text-rose-800";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{band} trust</span>;
}

export function WarningBadge({ count }: { count: number }) {
  if (count === 0) return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">No warnings</span>;
  return <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">{count} warning{count === 1 ? "" : "s"}</span>;
}

export function MetricPill({ label, value }: { label: string; value: string | number }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{label}: <strong>{value}</strong></span>;
}

export function PlaceholderPreview({ label = "Illustrative metadata preview" }: { label?: string }) {
  return <div className="relative min-h-40 overflow-hidden rounded-2xl border border-dashed border-[var(--border)] bg-stone-50 p-4" aria-label={label}><div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(135deg, rgba(169,84,61,.16) 1px, transparent 1px), linear-gradient(45deg, rgba(36,50,58,.10) 1px, transparent 1px)", backgroundSize: "18px 18px" }} /><div className="relative h-28 rounded-xl border border-slate-300 bg-white/70"><div className="absolute left-5 top-5 h-16 w-20 rounded-lg border-2 border-slate-400" /><div className="absolute bottom-5 right-5 h-12 w-24 rounded-full border-2 border-[var(--action)]" /></div><p className="relative mt-3 text-xs font-semibold text-slate-500">{label}</p></div>;
}

export function EmptyState({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="text-lg font-bold text-slate-950">{title}</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>{actionHref && actionLabel ? <Link className="button mt-5 inline-flex" href={actionHref}>{actionLabel}</Link> : null}</div>;
}

export function WarningList({ warnings }: { warnings: GovernanceWarningResult[] }) {
  if (warnings.length === 0) return <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">No deterministic governance warnings for the selected context.</p>;
  return <div className="grid gap-3">{warnings.map((warning) => <article key={`${warning.severity}-${warning.message}`} className="rounded-xl border border-slate-200 bg-white p-4"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{warning.severity}</span><h3 className="font-semibold text-slate-950">{warning.message}</h3></div><p className="mt-2 text-sm text-slate-600">Next action: {warning.nextAction}</p>{warning.relatedAssetIds.length > 0 ? <p className="mt-2 text-xs font-semibold text-slate-500">Related: {warning.relatedAssetIds.join(", ")}</p> : null}</article>)}</div>;
}
