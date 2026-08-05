import Link from "next/link";
import { Callout, PageIntro } from "@/components/ui";

const productLoop = [
  "Search for reusable catalog metadata.",
  "Evaluate eligibility, trust evidence, lifecycle, warnings, and declared compatibility.",
  "Request missing or revised content when the catalog does not meet the need.",
  "Review demand administratively with transparent priority and audit notes.",
  "Learn from synthetic telemetry about discovery gaps and governance bottlenecks.",
];

const discoveryQuestions = [
  "Which signals do designers actually use to decide whether content is trustworthy and appropriate?",
  "How do firms define Approved, Superseded, Deprecated, and Needs Revision across disciplines?",
  "Which metadata fields and parameter conventions matter most for search and reuse by content type?",
  "When does content freshness require a formal review date rather than a last-updated proxy?",
  "Who owns request triage, content creation, discipline approval, and final publication?",
  "Which telemetry signals indicate true reuse and value when a catalog is integrated into an authoring workflow?",
];

export default function About() {
  return (
    <div>
      <PageIntro
        eyebrow="About · Scope and method"
        title="A synthetic product case study for governed reuse"
        description="The AEC Content Catalog Trust & Reuse Prototype explores how a catalog can make approved reuse easier while keeping trust evidence, lifecycle state, requests, admin decisions, and product learning visible."
      />

      <section className="card mt-8">
        <p className="eyebrow">Interview-safe positioning</p>
        <p className="mt-3 text-lg leading-8 text-[var(--ink)]">
          I built this as a synthetic product case study, not as an attempt to reproduce a commercial content catalog or present myself as a BIM authoring expert. My adjacent platform experience is in governed publishing, discovery, access, reusable assets, lifecycle management, telemetry, and adoption. The bridge is the product problem, not a claim that APIs, developer templates, and BIM content are technically equivalent.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card">
          <p className="eyebrow">What it is</p>
          <h2 className="mt-2 text-xl font-bold">A browser-local product walkthrough</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted-ink)]">
            <li>• A guided demonstration of discovery, trust evidence, demand capture, admin review, and telemetry.</li>
            <li>• A static synthetic dataset plus deterministic TypeScript logic and browser-local simulated state.</li>
            <li>• A conversation artifact for product assumptions, validation questions, and platform-governance trade-offs.</li>
          </ul>
        </section>

        <section className="card">
          <p className="eyebrow">What it is not</p>
          <h2 className="mt-2 text-xl font-bold">Not a production design-content system</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted-ink)]">
            <li>• Not a BIM or CAD authoring tool, design-file validator, engineering certification system, or commercial catalog reproduction.</li>
            <li>• No file upload, download, insertion, parsing, conversion, technical validation, external API, authentication, or database.</li>
            <li>• No vendor affiliation, endorsement, copied visual system, customer evidence, or production-readiness claim.</li>
          </ul>
        </section>
      </div>

      <section className="card mt-6">
        <p className="eyebrow">Core product loop</p>
        <h2 className="mt-2 text-xl font-bold">From discovery to product learning</h2>
        <ol className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted-ink)] md:grid-cols-5">
          {productLoop.map((step, index) => (
            <li key={step} className="rounded-xl border border-[var(--border)] bg-[var(--canvas)] p-4">
              <span className="font-bold text-[var(--action)]">{index + 1}. </span>{step}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Callout title="Synthetic data disclaimer">
          Synthetic product prototype. Records and interactions are fictional metadata only. No design files, technical validation, software integration, or vendor affiliation.
        </Callout>
        <Callout title="Design disclaimer">
          This prototype uses a generic guided-learning and card-based product-demo structure. It is not affiliated with, endorsed by, or visually copied from Salesforce Trailhead, Salesforce Lightning Design System, Autodesk, or Autodesk Content Catalog.
        </Callout>
        <Callout title="Software-label clarification">
          Revit and AutoCAD appear only as plain synthetic metadata labels. They do not imply real integration, interoperability testing, file validation, or technical compatibility certification.
        </Callout>
        <Callout title="Telemetry guardrail">
          Dashboard metrics are synthetic instrumentation for a product demo. They are not customer evidence, market evidence, vendor data, or proof of production impact.
        </Callout>
      </div>

      <div className="mt-6">
        <Callout title="Trust-score guardrail">
          The trust score indicates confidence in the synthetic catalog record. It is not a certification of design quality, engineering fitness, safety, constructability, file integrity, code compliance, or standards compliance.
        </Callout>
      </div>

      <section className="card mt-6">
        <p className="eyebrow">Discovery before product decisions</p>
        <h2 className="mt-2 text-xl font-bold">Questions to validate with domain practitioners</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted-ink)] md:grid-cols-2">
          {discoveryQuestions.map((question) => <li key={question}>• {question}</li>)}
        </ul>
      </section>

      <section className="card mt-6">
        <p className="eyebrow">Glossary</p>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div><dt className="font-bold">AEC</dt><dd>Architecture, Engineering, and Construction</dd></div>
          <div><dt className="font-bold">BIM</dt><dd>Building Information Modeling</dd></div>
          <div><dt className="font-bold">CAD</dt><dd>Computer-Aided Design</dd></div>
          <div><dt className="font-bold">MEP</dt><dd>Mechanical, Electrical, and Plumbing</dd></div>
          <div><dt className="font-bold">CDE</dt><dd>Common Data Environment</dd></div>
          <div><dt className="font-bold">IFC</dt><dd>Industry Foundation Classes</dd></div>
        </dl>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="button inline-flex" href="/catalog">Start with catalog →</Link>
        <Link className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold" href="/">Return home</Link>
      </div>
    </div>
  );
}
