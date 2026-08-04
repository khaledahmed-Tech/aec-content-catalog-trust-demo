# AEC Content Catalog Trust & Reuse Prototype — Product Specification

## Outcome and product thesis

This interview-ready prototype demonstrates governed discovery and reuse using static, synthetic metadata. A catalog earns reuse when it helps a practitioner find an appropriate approved asset quickly and makes governance, lifecycle, metadata quality, declared compatibility context, and limitations understandable.

The core loop is: search for reusable content; separate eligible records from governed exceptions; inspect approval, lifecycle, metadata, warnings, and explainable trust evidence; simulate reuse or request missing/revised content; triage demand with transparent human review; and inspect deterministic telemetry for product-learning opportunities.

## Scope and routes

The required routes are:

- `/`: guided mission, practice scenario, five modules, progress, and start/resume actions.
- `/catalog`: URL-backed search, hard filters, deterministic ranking, reuse-eligible results, and separately presented governed exceptions.
- `/catalog/[assetId]`: eligibility, calculated trust, mandatory guardrail, warnings, metadata, parameters, and fictional version history.
- `/requests`: validated new-content and revision request flows with browser-local submission.
- `/admin`: transparent request and submission queues, simulated human decisions, and audit history.
- `/telemetry`: deterministic product-instrumentation summaries, accessible visuals, and evidence-based Product insight cards.
- `/about`: thesis, architecture, glossary, methodology, disclaimers, and non-goals.

At this data-foundation stage, every route exists and the canonical source records are now represented as typed static modules under `src/data`. Detailed workflows remain deliberately deferred.

## Canonical data and deterministic domain layer

The typed data layer preserves the supplied 20 assets, 8 requests, 6 review items, 10 events, 5 failed searches, and 5 warnings. Calculations must use the fixed `datasetMeta.asOfDate` of `2026-08-03`, never the machine clock. A future separate version extension must provide exactly one matching current version for every asset and histories for at least five.

Pure domain functions must calculate—not merely render seed fixtures for—trust, eligibility, search ranking, governance warnings, admin priority, and telemetry. Approval and reuse eligibility are hard gates; trust is a separate explanatory signal and popularity cannot override governance. Warnings prompt investigation and all governance decisions remain human-in-the-loop. Deterministic integrity and unit tests must reconcile every fixture.

## Local simulation architecture

Seed arrays remain immutable. Future simulated changes will use React context plus `useReducer`, hydrate after mount, and persist only overrides to `aec-content-catalog-trust-demo:v1`. IDs and timestamps are deterministic. Required actions cover module visits, requests, asset status, reuse selection/blocking, admin decisions, warning dismissal, and reset. Reset must be confirmed and restore the entire seed-derived demo state.

## Experience direction

The interface uses an original, warm, card-based enterprise learning journey: Mission, Module, Step, guided walkthrough, practice scenario, progress, and Product insight. It is calm rather than gamified, responsive, keyboard accessible, and based on CSS variables. Every screen includes a large header, step label, demonstration panel, concise insight, disclaimer, static-data states, and next action.

The five modules are Discover content, Evaluate trust, Capture unmet demand, Govern the queue, and Learn from telemetry. The home scenario asks a designer to find an approved metric single-flush door record for declared Revit 2026 metadata, inspect trust, and record a simulation. That label is metadata only and makes no compatibility or integration claim.

## Mandatory guardrails

Persistent application disclaimer:

> Synthetic product prototype. Records and interactions are fictional metadata only. No design files, technical validation, software integration, or vendor affiliation.

Wherever trust is explained:

> The trust score indicates confidence in the synthetic catalog record. It is not a certification of design quality, engineering fitness, safety, constructability, file integrity, code compliance, or standards compliance.

The prototype has no backend, database, authentication, runtime network calls, external APIs, file actions, real design files, production analytics, artificial-intelligence ranking, or automated governance. It does not author BIM or CAD content and does not claim integration, validation, safety, fitness, compliance, or certification.

No vendor logos, colors, screenshots, proprietary UI, brand claims, or implied affiliation may appear. In particular, do not use Autodesk branding or claims, and do not use Salesforce branding, the Trailhead name, mascots, badge graphics, or SLDS components. Plain-text software labels are permitted solely as synthetic record metadata.

## Verification and definition of done

The completed implementation requires strict TypeScript, Tailwind CSS, a small dependency surface, Vitest unit/integrity coverage, all seven navigable routes, hydration-safe browser state, accessible controls and charts, and passing lint, type-check, tests, and production build. Documentation must ultimately include a five-minute demo script, interview positioning, synthetic-data guardrails, and a comprehensive README. No route may remain a placeholder at final completion; this foundation phase intentionally precedes that work.

## Deterministic product logic implemented

The current codebase now includes pure TypeScript product-logic functions for reuse eligibility, trust scoring, search ranking, governance warnings, admin request priority, telemetry summaries, and deterministic product opportunity cards. The logic is local, synthetic, explainable, and does not validate design files, technical content, safety, code compliance, constructability, interoperability, or production readiness.

## Catalog and asset detail implemented

The catalog and asset-detail routes now consume the canonical typed dataset and deterministic catalog logic. The catalog supports local query/filter/sort state, separates reuse-eligible results from governed exceptions, and links records to detail pages. Asset detail displays eligibility before trust, deterministic warning evidence, declared compatibility metadata, parameters, and simulated-only reuse/update actions. URL-backed catalog state and full version-history data remain future improvements.

## Request and admin workflows implemented

The request and admin routes now consume canonical requests/assets plus browser-local simulated additions and overrides for the request/admin demo flow. Requests validate required structured fields, preserve URL-originating context, create deterministic local request and audit IDs, and avoid files, personal data, customer data, and proprietary project details. The admin queue recalculates deterministic request priority, preserves ordering, exposes point-level reasons, filters requests, and records simulated browser-local audit entries for assignment and status decisions.

## Telemetry dashboard implemented

The telemetry route now consumes canonical synthetic assets, requests, telemetry events, failed searches, governance warnings, deterministic telemetry summary logic, and browser-local request/admin state where available. It displays metric definitions, numerator/denominator details, filter context, synthetic-data labels, deterministic opportunity cards, catalog-health distributions, demand views, failed-search examples, and PM learning sections. Current-session request/admin state affects request-derived metrics; seeded telemetry events remain canonical synthetic events.

## Final interview documentation and reset control

The README now reflects the implemented product loop, route map, interview-safe usage guidance, current implementation status, synthetic-data disclaimer, and design disclaimer. Dedicated documentation covers the five-minute demo script, interview positioning, synthetic-data guardrails, and QA checklist.

A lightweight Reset Demo control is available in the application shell. It clears browser-local request/admin state and returns the walkthrough to seeded behavior without modifying canonical data or implying backend persistence.
