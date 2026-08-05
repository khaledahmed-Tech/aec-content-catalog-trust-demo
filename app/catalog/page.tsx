"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { catalogAssets } from "@/src/data";
import type { ApprovalStatus, ContentType, Discipline, DuplicateRisk, SoftwareCompatibility, TrustBand } from "@/src/types/catalog";
import type { CatalogFilters } from "@/src/types/requests";
import { calculateTrustScore, getGovernanceWarnings, rankSearchResults, type RankedCatalogAsset } from "@/src/lib/catalog-logic";
import { EmptyState, ModuleIntroCard, PlaceholderPreview, PmTakeaway, StatusBadge, TrustBadge, WarningBadge } from "@/components/catalog-ui";
import { PageIntro } from "@/components/ui";

type SortOption = "relevance" | "trust" | "usage" | "updated";

const contentTypes: ContentType[] = ["Revit Family", "AutoCAD Block", "Material", "Detail", "Template", "Schedule"];
const disciplines: Discipline[] = ["Architecture", "Structural", "MEP", "Civil", "Interior", "General"];
const softwareOptions: SoftwareCompatibility[] = ["Revit", "AutoCAD"];
const approvalStatuses: ApprovalStatus[] = ["Approved", "Pending Review", "Needs Revision", "Superseded", "Deprecated"];
const trustBands: TrustBand[] = ["High", "Moderate", "Low"];
const duplicateRisks: DuplicateRisk[] = ["Low", "Medium", "High"];
const compatibleVersions = ["2022", "2023", "2024", "2025", "2026"];

function sortResults(results: RankedCatalogAsset[], sort: SortOption, browseMode = false) {
  return [...results].sort((a, b) => {
    if (browseMode && sort === "relevance") return b.trustScore - a.trustScore || b.asset.usageCount - a.asset.usageCount || a.asset.assetId.localeCompare(b.asset.assetId);
    if (sort === "trust") return b.trustScore - a.trustScore || a.asset.assetId.localeCompare(b.asset.assetId);
    if (sort === "usage") return b.asset.usageCount - a.asset.usageCount || a.asset.assetId.localeCompare(b.asset.assetId);
    if (sort === "updated") return new Date(b.asset.lastUpdated).getTime() - new Date(a.asset.lastUpdated).getTime() || a.asset.assetId.localeCompare(b.asset.assetId);
    return b.rankScore - a.rankScore || a.asset.assetId.localeCompare(b.asset.assetId);
  });
}

function AssetCard({ result }: { result: RankedCatalogAsset }) {
  const trust = calculateTrustScore(result.asset);
  const warningCount = getGovernanceWarnings(result.asset).length;
  return <article className="card grid gap-5 md:grid-cols-[180px_1fr]"><PlaceholderPreview /><div><div className="flex flex-wrap items-center gap-2"><StatusBadge status={result.asset.approvalStatus} /><TrustBadge band={trust.band} /><WarningBadge count={warningCount} /></div><h3 className="mt-4 text-xl font-bold text-slate-950"><Link className="hover:text-[var(--action)]" href={`/catalog/${result.asset.assetId}`}>{result.asset.name}</Link></h3><p className="mt-2 text-sm leading-6 text-slate-600">{result.asset.description}</p><dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Type</dt><dd>{result.asset.contentType}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Discipline</dt><dd>{result.asset.discipline}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Version</dt><dd>{result.asset.version}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Usage</dt><dd>{result.asset.usageCount} synthetic selections</dd></div><div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Updated</dt><dd>{result.asset.lastUpdated}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">Software metadata</dt><dd>{result.asset.software} · {result.asset.compatibleVersions.join(", ")}</dd></div></dl><Link className="button mt-5 inline-flex" href={`/catalog/${result.asset.assetId}`}>Review record →</Link></div></article>;
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? (searchParams.get("scenario") === "metric-single-flush-door" ? "single flush door 900" : "single flush door");
  const [draftQuery, setDraftQuery] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<CatalogFilters>({ governedOnly: true });
  const [sort, setSort] = useState<SortOption>("relevance");
  const ranked = useMemo(() => rankSearchResults(catalogAssets, query, filters), [query, filters]);
  const browseMode = query.trim().length === 0;
  const eligible = sortResults(ranked.eligibleResults, sort, browseMode);
  const exceptions = sortResults(ranked.governedExceptions, sort, browseMode);
  const total = eligible.length + exceptions.length;
  const requestHref = `/requests?type=New%20Content&sourceQuery=${encodeURIComponent(query)}&discipline=${filters.discipline ?? ""}&contentType=${filters.contentType ?? ""}&software=${filters.software ?? ""}&compatibleVersion=${filters.compatibleVersion ?? ""}`;
  const updateFilter = <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K] | "") => setFilters((current) => ({ ...current, [key]: value === "" ? undefined : value }));
  const clearAll = () => { setDraftQuery(""); setQuery(""); setFilters({ governedOnly: true }); setSort("relevance"); };
  return <div className="space-y-8"><PageIntro eyebrow="Module 1 · Discover content" title="Search the governed catalog" description="Can a designer quickly find suitable, approved synthetic content while keeping governed exceptions visible but separated?" /><div className="grid gap-6 lg:grid-cols-[1fr_340px]"><ModuleIntroCard title="Governance-first discovery"><p>Search and filters are deterministic gates over the canonical synthetic dataset. Reuse-eligible assets appear first; ineligible records only appear when governed exceptions are explicitly included.</p></ModuleIntroCard><PmTakeaway>Default discovery should reduce risk by showing approved, reusable records before popularity or curiosity. Exceptions remain discoverable for transparency, but not selectable as reusable content.</PmTakeaway></div><section className="card space-y-5"><div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]"><label className="block"><span className="text-sm font-semibold text-slate-700">Keyword search</span><input className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[var(--action)] focus:outline-none focus:ring-2 focus:ring-[var(--action)]/20" value={draftQuery} onChange={(event) => setDraftQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setQuery(draftQuery); }} placeholder="Search names, tags, parameters, and descriptions" /></label><button className="button self-end" onClick={() => setQuery(draftQuery)}>Search</button><button className="self-end rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700" onClick={clearAll}>Clear</button></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Select label="Content type" value={filters.contentType ?? ""} onChange={(value) => updateFilter("contentType", value as ContentType | "")} options={contentTypes} /><Select label="Discipline" value={filters.discipline ?? ""} onChange={(value) => updateFilter("discipline", value as Discipline | "")} options={disciplines} /><Select label="Software" value={filters.software ?? ""} onChange={(value) => updateFilter("software", value as SoftwareCompatibility | "")} options={softwareOptions} /><Select label="Compatible version" value={filters.compatibleVersion ?? ""} onChange={(value) => updateFilter("compatibleVersion", value)} options={compatibleVersions} /><Select label="Approval status" value={filters.approvalStatus ?? ""} onChange={(value) => updateFilter("approvalStatus", value as ApprovalStatus | "")} options={approvalStatuses} /><Select label="Trust band" value={filters.trustBand ?? ""} onChange={(value) => updateFilter("trustBand", value as TrustBand | "")} options={trustBands} /><Select label="Duplicate risk" value={filters.duplicateRisk ?? ""} onChange={(value) => updateFilter("duplicateRisk", value as DuplicateRisk | "")} options={duplicateRisks} /><label className="block text-sm font-semibold text-slate-700">Sort<select className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="relevance">Relevance</option><option value="trust">Trust score</option><option value="usage">Most reused</option><option value="updated">Recently updated</option></select></label></div><label className="flex items-center gap-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={filters.governedOnly !== false} onChange={(event) => updateFilter("governedOnly", event.target.checked ? true : false)} /> Reuse eligible only <span className="text-slate-500">Turn off to inspect governed exceptions in a separate section.</span></label></section><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-700">{total} result{total === 1 ? "" : "s"} for “{query || "all approved reusable records"}”</p><p className="text-xs text-slate-500">Compatibility is declared metadata only; no technical validation or integration is performed.</p></div>{total === 0 ? <EmptyState title="No matching catalog records" description={`No synthetic records matched ${query ? `“${query}”` : "the current browse"} with the active filters. This could indicate a content gap, taxonomy mismatch, or overly narrow filter set.`} actionHref={requestHref} actionLabel="Request missing content" /> : <><section className="space-y-4"><h2 className="text-lg font-bold text-slate-950">Reuse eligible results</h2>{eligible.length === 0 ? <EmptyState title="No eligible records in this filter set" description="Try clearing filters or include governed exceptions to inspect records that require review." /> : eligible.map((result) => <AssetCard key={result.asset.assetId} result={result} />)}</section>{filters.governedOnly === false ? <section className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50/40 p-5"><div><p className="eyebrow text-amber-900">Governed exceptions</p><h2 className="mt-2 text-lg font-bold text-slate-950">Ineligible / needs review</h2><p className="mt-2 text-sm text-slate-600">These records are visible for investigation only and are never promoted above eligible results.</p></div>{exceptions.length === 0 ? <EmptyState title="No governed exceptions match" description="The current filters only return reusable assets." /> : exceptions.map((result) => <AssetCard key={result.asset.assetId} result={result} />)}</section> : null}</>}</div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<select className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" value={value} onChange={(event) => onChange(event.target.value)}><option value="">Any</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
export default function Catalog() {
  return (
    <Suspense
      fallback={
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          Loading catalog walkthrough…
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}