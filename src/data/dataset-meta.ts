export const datasetMeta = {
 title:"Architecture, Engineering, and Construction Content Catalog Trust & Reuse Prototype — Synthetic Dataset",version:"1.0",asOfDate:"2026-08-03",
 purpose:"Interview-safe seed data for a lightweight product prototype focused on governed discovery, trust, reuse, requests, admin review, and telemetry.",
 disclaimer:"This dataset is entirely synthetic. It does not copy Autodesk data, contain functional design files, validate technical content, or claim that any record is valid BIM or CAD content. Software names and compatible-version values are fictional catalog metadata labels only; they do not imply integration, interoperability testing, endorsement, or affiliation.",
 trustGuardrail:"The trust score is a synthetic indicator of catalog-record confidence. It is not a certification of design quality, engineering fitness, safety, constructability, code compliance, file integrity, or standards compliance.",
 recordCounts:{assets:20,contentRequests:8,adminReviewItems:6,telemetryEvents:10,failedSearchExamples:5,governanceWarnings:5},
} as const;
export const glossary = [
 {abbreviation:"AEC",definition:"Architecture, Engineering, and Construction"},{abbreviation:"BIM",definition:"Building Information Modeling"},{abbreviation:"CAD",definition:"Computer-Aided Design"},{abbreviation:"MEP",definition:"Mechanical, Electrical, and Plumbing"},{abbreviation:"CDE",definition:"Common Data Environment"},{abbreviation:"IFC",definition:"Industry Foundation Classes"},{abbreviation:"ACC",definition:"Autodesk Construction Cloud"},
] as const;
export const productLogic = {
 reuseEligibility:"Eligible only when approvalStatus is Approved, deprecatedReason is null, and a selected software-version context appears in compatibleVersions.",
 trustScore:"Governance evidence (30) + metadata completeness (20) + lifecycle clarity (20) + record freshness (15) + duplicate confidence (15).",
 searchRanking:"Hard filters first, then 65% text match + 15% trust + 10% normalized freshness + 10% normalized usage. Popularity cannot override governance eligibility.",
 requestPriority:"Demand evidence (30) + required-by proximity (25) + request age (20) + coverage gap (15) + no acceptable substitute (10).",
 warningRule:"Duplicate and stale warnings identify where a human should investigate; they do not auto-merge, delete, approve, or certify content.",
} as const;
