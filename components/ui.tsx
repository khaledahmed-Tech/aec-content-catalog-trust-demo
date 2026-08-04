import Link from "next/link";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h1><p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{description}</p></header>;
}

export function Callout({ title = "Product insight", children }: { title?: string; children: React.ReactNode }) {
  return <aside className="rounded-xl border border-amber-300 bg-amber-50 p-5"><p className="text-xs font-bold uppercase tracking-widest text-amber-900">{title}</p><div className="mt-2 text-sm leading-6 text-amber-950">{children}</div></aside>;
}

export function EmptyPage({ eyebrow, title, description, takeaway }: { eyebrow: string; title: string; description: string; takeaway: string }) {
  return <div><PageIntro eyebrow={eyebrow} title={title} description={description} /><div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]"><section className="card"><span className="pill">Foundation route</span><h2 className="mt-5 text-xl font-bold">What this screen demonstrates</h2><p className="mt-3 text-slate-600">The route and product framing are in place without fabricating the missing canonical records or prematurely implementing detailed product logic.</p><div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-stone-50 p-8 text-center text-sm text-slate-500">Detailed workflow intentionally deferred until the canonical seed-data step.</div></section><Callout title="Product insight">{takeaway}</Callout></div><Link className="button mt-8 inline-flex" href="/about">Review scope and guardrails →</Link></div>;
}
