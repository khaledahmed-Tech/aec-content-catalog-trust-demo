import Link from "next/link";
import { Callout, PageIntro } from "@/components/ui";

const modules = [
  ["01", "Discover content", "Search for a suitable, approved catalog record.", "/catalog"],
  ["02", "Evaluate trust", "Inspect eligibility, lifecycle context, and explainable evidence.", "/catalog/AEC-AST-0001"],
  ["03", "Capture unmet demand", "Preserve failed-search context in a structured request.", "/requests"],
  ["04", "Govern the queue", "Triage demand with transparent, human-reviewed priority.", "/admin"],
  ["05", "Learn from telemetry", "Investigate discovery gaps and governance bottlenecks.", "/telemetry"],
];

const demoPath = [
  "Search single flush door 900 in Catalog.",
  "Open AEC-AST-0001 and explain eligibility before trust.",
  "Run the zero-result request path for recessed fire extinguisher cabinet.",
  "Show Admin priority and a simulated audit note.",
  "Close with Telemetry opportunity cards and domain-humility questions.",
];

export default function Home() {
  return (
    <div>
      <PageIntro
        eyebrow="Mission · Guided walkthrough"
        title="Build confidence in governed content reuse"
        description="A catalog earns reuse when it helps a practitioner find an appropriate approved record quickly and makes governance, lifecycle, metadata quality, compatibility context, and limitations easy to understand. This is a synthetic product-thinking demonstration; it contains fictional metadata and performs no file or software action."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="button inline-flex" href="/catalog?scenario=metric-single-flush-door">Start guided walkthrough →</Link>
        <Link className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold" href="/catalog">Explore catalog</Link>
      </div>

      <section className="card mt-10">
        <p className="eyebrow">Practice scenario</p>
        <h2 className="mt-3 text-xl font-bold">Find an approved metric single-flush door record</h2>
        <p className="mt-2 max-w-3xl leading-7 text-[var(--muted-ink)]">A designer declares a Revit 2026 context, searches the synthetic catalog, inspects trust evidence, and records a simulated reuse selection. Software and version labels are metadata only; compatibility is not technically validated.</p>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Five modules</p>
        <h2 className="mt-2 text-2xl font-bold">Follow the governed reuse loop</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {modules.map(([n, title, text, href]) => (
            <Link href={href} key={n} className="card group min-h-56 transition hover:-translate-y-0.5">
              <span className="text-sm font-bold text-[var(--action)]">{n}</span>
              <h3 className="mt-8 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">{text}</p>
              <span className="mt-5 block text-sm font-semibold">Open module →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="card mt-8">
        <p className="eyebrow">How to use this in an interview</p>
        <h2 className="mt-2 text-xl font-bold">Recommended five-minute path</h2>
        <ol className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted-ink)] md:grid-cols-5">
          {demoPath.map((step, index) => (
            <li key={step} className="rounded-xl border border-[var(--border)] bg-[var(--canvas)] p-4">
              <span className="font-bold text-[var(--action)]">{index + 1}. </span>{step}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="card"><h2 className="font-bold">What this prototype proves</h2><p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">A coherent product story can connect governed discovery, explainable trust evidence, unmet demand, human triage, and product instrumentation.</p></section>
        <section className="card"><h2 className="font-bold">What it does not do</h2><p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">It does not author, download, insert, parse, validate, certify, or integrate design content, and it demonstrates no production outcome.</p></section>
      </div>

      <div className="mt-6"><Callout title="PM takeaway">Approval and reuse eligibility are hard governance gates. The trust score explains catalog-record confidence but never overrides approval, lifecycle, or declared-compatibility gates.</Callout></div>
    </div>
  );
}
