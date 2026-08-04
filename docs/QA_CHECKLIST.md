# QA Checklist

## Route checklist

- [ ] `/` renders the guided mission home, practice scenario, five modules, interview usage card, and persistent disclaimer.
- [ ] `/catalog` renders search, filters, eligible results, governed exceptions, result counts, zero-result state, and detail links.
- [ ] `/catalog/[assetId]` renders a valid seeded asset with eligibility before trust, warnings, metadata, compatibility guardrail, and simulated actions.
- [ ] Invalid asset IDs render a useful not-found state.
- [ ] `/requests` validates required fields, preserves entered values after errors, pre-fills source context, and submits a browser-local request.
- [ ] `/admin` shows deterministic queue ordering, priority components, filters, allowed transitions, and audit entries.
- [ ] `/telemetry` recalculates synthetic metrics by filter, shows definitions and denominators, and labels charts as synthetic telemetry.
- [ ] `/about` explains scope, non-goals, disclaimers, positioning, product loop, glossary, and discovery questions.

## Demo path checklist

- [ ] Click Reset Demo before starting.
- [ ] Open `/catalog`.
- [ ] Search `single flush door 900`.
- [ ] Open `AEC-AST-0001` and show eligibility before trust.
- [ ] Return to `/catalog` and search `recessed fire extinguisher cabinet`.
- [ ] Start a content request with source context.
- [ ] Submit a sanitized request with no real project/customer/person details.
- [ ] Open `/admin` and inspect the submitted or seeded request priority breakdown.
- [ ] Record a simulated admin decision with a note.
- [ ] Open `/telemetry` and explain synthetic metrics and opportunity cards.

## Branding and claim-safety checklist

- [ ] No Autodesk logos, brand colors, screenshots, copied screens, API calls, or implied affiliation.
- [ ] No Salesforce logos, Trailhead naming, mascots, badge graphics, Salesforce Lightning Design System components, or implied affiliation.
- [ ] No commercial catalog imitation or feature-for-feature reproduction.
- [ ] No real Revit/AutoCAD integration claims.
- [ ] No authoring, download, insertion, validation, certification, constructability, safety, code, compliance, or file-integrity claims.

## Synthetic-data checklist

- [ ] Seed data remains fictional and local.
- [ ] No real customer, project, company, person, or proprietary information is collected or displayed.
- [ ] No RFA, DWG, model, drawing, project, attachment, upload, parse, or conversion behavior exists.
- [ ] Dataset record counts still reconcile with the canonical fixture.

## Trust-score and telemetry guardrail checklist

- [ ] Eligibility is displayed before trust score.
- [ ] Trust score never overrides approval or lifecycle gates.
- [ ] Trust-score guardrail appears wherever trust is explained.
- [ ] Telemetry is labeled as synthetic and not customer evidence.
- [ ] Metric cards expose definitions, numerator, denominator, and not-enough-data states.
- [ ] Opportunity cards are investigation prompts only.

## Basic responsive and browser QA checklist

- [ ] Test a laptop viewport around 1440 × 900.
- [ ] Test one narrow mobile viewport.
- [ ] Confirm no page-level horizontal overflow.
- [ ] Confirm long asset names, tags, and parameters wrap.
- [ ] Confirm focus states are visible for navigation, forms, filters, and buttons.
- [ ] Confirm status information is communicated by text, not color alone.

## Dependency, build, and test checklist

- [ ] `npm install` completes in the target environment.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] `npm run build` passes.
- [ ] Browser smoke test covers every route.

## Pre-interview reset checklist

- [ ] Click Reset Demo in the app shell.
- [ ] Refresh the browser and confirm request/admin state returned to seeded behavior.
- [ ] Confirm the approved asset path `/catalog/AEC-AST-0001` loads.
- [ ] Confirm the seeded failed search `recessed fire extinguisher cabinet` still produces the expected request path.
- [ ] Keep the demo script open as a timing guide.

## Known unavailable checks in this Codex environment

- Dependency-based checks may be unavailable when `node_modules` is not installed.
- Browser visual QA, screenshots, and responsive smoke tests require running the app with installed dependencies.
- External integration tests are intentionally not applicable because the prototype has no backend, APIs, file handling, authentication, or production analytics.
