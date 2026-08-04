"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import { resetDemoRequestState } from "@/src/lib/demo-request-state";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = navItems.findIndex(({ href }) => href === "/" ? pathname === "/" : pathname.startsWith(href));
  const progress = Math.max(1, active + 1);
  const resetDemo = () => {
    if (window.confirm("Reset browser-local request and admin demo state? Seeded records will remain available.")) {
      resetDemoRequestState();
      window.location.href = "/";
    }
  };
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-slate-950 px-5 py-6 text-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--module-accent)] font-bold text-[var(--ink)]">AC</span>
          <span><strong className="block">AEC Content Catalog</strong><small className="text-stone-400">Trust &amp; reuse prototype</small></span>
        </Link>
        <nav className="mt-8 grid grid-cols-3 gap-2 lg:grid-cols-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const selected = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} aria-current={selected ? "page" : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${selected ? "bg-white/10 text-amber-100" : "text-stone-300 hover:bg-white/5 hover:text-white"}`}><span aria-hidden>{item.icon}</span>{item.label}</Link>;
          })}
        </nav>
        <div className="mt-10 hidden rounded-xl border border-white/10 bg-white/5 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-100">Guided walkthrough</p>
          <p className="mt-2 text-sm text-slate-300">Step {progress} of {navItems.length}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700"><div className="h-full rounded-full bg-[var(--action)] transition-all" style={{ width: `${progress / navItems.length * 100}%` }} /></div>
          <button type="button" onClick={resetDemo} className="mt-4 w-full rounded-lg border border-white/15 px-3 py-2 text-left text-xs font-semibold text-amber-100 transition hover:bg-white/10">Reset Demo</button>
          <p className="mt-2 text-xs leading-5 text-slate-400">Clears browser-local request and admin changes; seeded data stays intact.</p>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div><span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Interview walkthrough</span><p className="text-sm font-semibold text-slate-800">From discovery to trusted reuse</p></div>
          <div className="flex items-center gap-2"><button type="button" onClick={resetDemo} className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-700 transition hover:bg-stone-100">Reset Demo</button><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">Synthetic prototype</span></div>
        </header>
        <div role="note" className="border-b border-amber-300 bg-amber-50 px-5 py-2.5 text-center text-xs font-semibold text-amber-950 md:px-8">Synthetic product prototype. Records and interactions are fictional metadata only. No design files, technical validation, software integration, or vendor affiliation.</div>
        <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">{children}</main>
      </div>
    </div>
  );
}
