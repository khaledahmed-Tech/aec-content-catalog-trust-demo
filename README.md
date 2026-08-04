# AEC Content Catalog Trust & Reuse Prototype

The **AEC Content Catalog Trust & Reuse Prototype** is an interview-ready, synthetic product case study for governed discovery and reuse of design-content metadata. The thesis is that a catalog earns reuse when it helps a practitioner find an appropriate approved asset quickly and makes the evidence of governance, lifecycle, metadata quality, compatibility context, and limitations easy to understand.

## Why it exists

This prototype demonstrates product framing for a cross-sided catalog workflow: designers and engineers need fast, trustworthy discovery, while content admins need structured demand, explainable queue priority, and telemetry that reveals where catalog coverage or governance is breaking down.

It is intentionally modest. The goal is to show product decisions, deterministic logic, safe boundaries, and interview-ready storytelling—not to prove production integration or domain authority.

## What it demonstrates

- **Search and governed reuse:** default catalog results prioritize assets that pass hard reuse-eligibility gates.
- **Explainable trust:** trust is shown through deterministic components for governance, metadata, lifecycle clarity, freshness, and duplicate confidence.
- **Unmet-demand capture:** failed or narrow searches can become structured new-content or revision requests.
- **Human admin triage:** queue priority is computed, visible, and auditable; admins cannot manually overwrite the score.
- **Product telemetry:** metrics connect discovery, approved selection, blocked attempts, requests, catalog health, and investigation prompts.
- **Browser-local simulation:** request and admin actions use current-session/browser-local state only.

## What it does not claim

- It is **not** a Building Information Modeling (BIM) authoring tool, Computer-Aided Design (CAD) tool, production content-management system, design-file validator, engineering certification system, or reproduction of any commercial catalog.
- It does **not** load, download, insert, parse, convert, certify, validate, or generate design files.
- It does **not** use Autodesk APIs, external design-content services, backend services, authentication, databases, production analytics, or artificial intelligence.
- Plain-text labels such as Revit and AutoCAD appear only as synthetic metadata examples and do not imply technical validation, interoperability testing, endorsement, or integration.

## Route map

| Route | Purpose |
| --- | --- |
| `/` | Guided mission home, practice scenario, module map, and recommended interview path. |
| `/catalog` | Search, filters, deterministic ranking, eligible results, and governed exceptions. |
| `/catalog/[assetId]` | Asset detail with eligibility, trust breakdown, warnings, metadata, and simulated reuse. |
| `/requests` | New-content and revision request form with validation and browser-local submissions. |
| `/admin` | Request/admin triage queue with deterministic priority, filters, decisions, and audit entries. |
| `/telemetry` | Synthetic telemetry dashboard with metric definitions and product opportunity cards. |
| `/about` | Scope, architecture, guardrails, glossary, positioning, and discovery questions. |

## How to run locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Verification commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Current implementation status

Implemented in the current branch:

- Next.js App Router shell, global navigation, persistent synthetic-data disclaimer, and warm card-based product-demo styling.
- Canonical typed synthetic seed data for assets, content requests, admin items, telemetry events, failed-search examples, governance warnings, and dataset metadata.
- Deterministic product logic for eligibility, trust score, search ranking, governance warnings, admin priority, telemetry summaries, and opportunity cards.
- Catalog Home, Asset Detail, Content Request, Admin Review Queue, Telemetry Dashboard, Home, About, and not-found routes.
- Browser-local request/admin demo state and a visible Reset Demo control in the application shell.
- Unit tests for seed integrity and deterministic product logic.
- Final interview documentation, positioning guidance, synthetic-data guardrails, and QA checklist.

## Synthetic-data disclaimer

**Synthetic product prototype. Records and interactions are fictional metadata only. No design files, technical validation, software integration, or vendor affiliation.**

The trust score is a synthetic catalog-confidence indicator. It is not a certification of design quality, engineering fitness, safety, constructability, file integrity, code compliance, standards compliance, or production readiness.

Telemetry is synthetic instrumentation for a product demo. It is not customer evidence, market evidence, Autodesk data, or proof of production impact.

## Design disclaimer

This prototype uses a generic guided-learning and card-based product-demo structure. It is not affiliated with, endorsed by, or visually copied from Salesforce Trailhead, Salesforce Lightning Design System, Autodesk, or Autodesk Content Catalog.

## Interview-safe usage guidance

Use this as evidence of product thinking: governed publishing, discovery, reuse, lifecycle management, request triage, telemetry, and adoption loops. Do not present it as proof of BIM practitioner expertise or real design-content validation.

A safe positioning statement:

> I built this as a synthetic product case study, not as an attempt to reproduce a commercial content catalog or present myself as a BIM authoring expert. My adjacent platform experience is in governed publishing, discovery, access, reusable assets, lifecycle management, telemetry, and adoption. The bridge is the product problem, not a claim that APIs, developer templates, and BIM content are technically equivalent.

## Recommended five-minute demo path

1. Open `/catalog` and search `single flush door 900`.
2. Open `AEC-AST-0001` and point out eligibility before trust score.
3. Return to `/catalog`, search `recessed fire extinguisher cabinet`, and use the request path.
4. Submit a structured request in `/requests` without adding real project/customer data.
5. Open `/admin`, inspect priority components, and record a simulated decision note.
6. Open `/telemetry` and discuss discovery, reuse, demand, catalog health, and opportunity cards.

## Known limitations

- The app is a static/browser-local prototype; refreshing can clear volatile UI state depending on browser storage behavior.
- No real design files, file previews, file validation, vendor APIs, authentication, database, or production analytics are implemented.
- Thresholds for trust, freshness, priority, and telemetry are synthetic hypotheses to validate with BIM managers, content admins, designers, and engineers.
- Browser-level visual QA requires installing dependencies and running the app locally.

## Claim and branding guardrails

- Do not introduce Autodesk logos, brand colors, screenshots, product claims, APIs, or implied affiliation.
- Do not introduce Salesforce logos, Trailhead naming, mascots, badge graphics, SLDS components, or implied affiliation.
- Do not claim real BIM, Revit, AutoCAD, Autodesk, or design-tool integration.
- Do not claim trust, priority, or telemetry scores represent engineering safety, code compliance, standards certification, constructability, file integrity, customer evidence, or production readiness.
