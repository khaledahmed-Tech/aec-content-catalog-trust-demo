# Demo Script — AEC Content Catalog Trust & Reuse Prototype

## Opening disclaimer

This is a synthetic product-thinking prototype. It does not recreate a commercial catalog, load design files, validate Building Information Modeling (BIM) or Computer-Aided Design (CAD) content, integrate with Revit or AutoCAD, or claim vendor affiliation. The demo is about product framing: governed discovery, trust evidence, requests, admin triage, and telemetry.

## Five-minute interview script

### 0:00–0:30 — Set context

- **Route:** `/catalog`
- **Action:** Open Catalog Home.
- **What should appear:** Search, filters, reuse-eligible default, and the persistent synthetic prototype disclaimer.
- **Talking point:** “I built this as a modest synthetic product-thinking exercise. It does not recreate a commercial catalog, load design files, or claim BIM authoring. I focused on one question: how could a catalog make approved reuse easier while keeping trust, lifecycle, requests, and product learning visible?”
- **Fallback:** If the catalog has stale browser state, click Reset Demo in the shell and return to `/catalog`.

### 0:30–1:15 — Find approved content

- **Route:** `/catalog`
- **Action:** Search `single flush door 900`; show Reuse Eligible and filters.
- **What should appear:** Eligible results first, including the single flush door asset, with result counts and metadata cards.
- **Talking point:** “The default is intentionally governed: approved and current results first. Search combines name, tags, and parameter metadata, while discipline, content type, software, and version context act as hard filters. Popularity has only a small ranking weight, so frequent use cannot overpower governance.”
- **Fallback:** Clear filters and search `single flush door`.

### 1:15–2:05 — Explain trust

- **Route:** `/catalog/AEC-AST-0001`
- **Action:** Open the top asset; review eligibility, trust breakdown, warnings, and metadata.
- **What should appear:** Reuse eligibility before trust score, a five-component trust breakdown, declared compatibility labels, and “No design file loaded” language.
- **Talking point:** “Eligibility and trust are separate. Approval is the gate; the score explains catalog confidence through governance, metadata, lifecycle clarity, freshness, and duplicate risk. It is not engineering or compliance certification. The compatibility label is declared metadata, not a validated integration.”
- **Fallback:** If the URL context changed, open any approved asset from catalog results and use the same eligibility-versus-trust explanation.

### 2:05–2:50 — Capture unmet demand

- **Route:** `/catalog` → `/requests`
- **Action:** Return to search; run `recessed fire extinguisher cabinet`; start a missing-content request.
- **What should appear:** Zero-result state with active context and a Request missing content action; then a request form with source context.
- **Talking point:** “When search fails, the experience should not end. The query and filters carry into a structured request, reducing re-entry and giving the admin the context needed to triage. I support new content and revision requests, while deliberately avoiding project files or sensitive data.”
- **Fallback:** Navigate directly to `/requests?sourceQuery=recessed%20fire%20extinguisher%20cabinet&discipline=Architecture&contentType=Revit%20Family&software=Revit`.

### 2:50–3:40 — Review as admin

- **Route:** `/admin`
- **Action:** Submit the request, open Admin Queue, open the new request, and show the priority breakdown.
- **What should appear:** The submitted request, score/band, point-level priority contributions, simulated actions, and audit entry area.
- **Talking point:** “The queue score is deterministic and explainable. It combines demand evidence, required-by proximity, age, coverage gap, and substitute availability. It is a product-priority aid, not a safety score. Decisions require notes and create a simple audit event.”
- **Fallback:** If the submitted request is not present after refresh, use seeded request `AEC-REQ-0004` to show urgent priority and decision evidence.

### 3:40–4:30 — Use telemetry

- **Route:** `/telemetry`
- **Action:** Point to discovery, governed reuse, request, and catalog-health metrics.
- **What should appear:** Synthetic telemetry cards, numerator/denominator details, failed searches, request aging, metadata distribution, governance risks, and opportunity cards.
- **Talking point:** “The dashboard closes the product loop. It distinguishes successful search, zero results, approved selection, blocked attempts, request aging, and metadata health. Opportunity cards identify where to investigate; they do not make roadmap decisions automatically.”
- **Fallback:** If filters hide too much, reset telemetry filters to All.

### 4:30–5:00 — Close with humility

- **Route:** `/telemetry` or `/`
- **Action:** Return to an opportunity card or the guided home.
- **What should appear:** Product insight framing and the five-module loop.
- **Talking point:** “What I am demonstrating is how I frame a cross-sided platform problem: practitioner discovery, admin governance, lifecycle trust, and product telemetry. My next step would be to test the thresholds and workflow assumptions with BIM managers and design practitioners, because I would not treat this prototype as domain truth.”
- **Fallback:** Use the Home page module cards to summarize the product loop in one sentence.

## Two-minute condensed demo

1. **Catalog:** Search `single flush door 900` and say the default view favors reuse-eligible content while hard filters prevent mismatches.
2. **Asset detail:** Open `AEC-AST-0001` and say eligibility is the gate while trust is an explanation, not certification.
3. **Requests:** Show the zero-result path for `recessed fire extinguisher cabinet` and explain structured demand capture.
4. **Admin:** Show one priority breakdown and say the score is deterministic, auditable, and not a safety metric.
5. **Telemetry:** Show one opportunity card and say it prompts investigation rather than making roadmap decisions.

## Click order checklist

1. Reset Demo.
2. `/catalog`.
3. Search `single flush door 900`.
4. Open `AEC-AST-0001`.
5. Back to `/catalog`.
6. Search `recessed fire extinguisher cabinet`.
7. Request missing content.
8. Submit a sanitized request.
9. `/admin`.
10. Open the new or seeded request.
11. `/telemetry`.
12. Close on Home or an opportunity card.

## Demo operating checklist

- Reset Demo before the interview.
- Confirm the approved asset `AEC-AST-0001` loads.
- Confirm the seeded zero-result query `recessed fire extinguisher cabinet` works.
- Keep one pending, one superseded, and one low-trust approved asset ready for follow-up questions.
- Keep narration focused on product decisions, not code stack, unless asked.
- Stop at five minutes and offer deeper dives based on the interviewer’s interest.

## What to avoid saying

- “This validates BIM content.”
- “This integrates with Revit or AutoCAD.”
- “This is Autodesk-approved.”
- “This certifies quality, safety, standards compliance, code compliance, or constructability.”
- “This telemetry proves customer demand.”
- “This priority score is an engineering or safety criticality score.”
- “This automatically decides the roadmap.”

## Troubleshooting notes

- If local state looks confusing, click Reset Demo and restart from Catalog.
- If a request disappears after browser storage is cleared, submit it again or use seeded urgent request `AEC-REQ-0004` in Admin.
- If the app is not running, install dependencies with `npm install` and start with `npm run dev`.
- If dependencies are unavailable, use the README and this script to walk through screenshots or source-level behavior.

## Optional deeper-dive paths

- **Trust logic:** Show the five components and explain why approval remains separate from score.
- **Search ranking:** Explain hard filters, text match, trust, freshness, usage, and deterministic tie-breaks.
- **Request prioritization:** Show demand evidence, deadline proximity, age, coverage gap, and substitute acceptance.
- **Telemetry/opportunity cards:** Show metric denominators and explain why cards are investigation prompts only.
