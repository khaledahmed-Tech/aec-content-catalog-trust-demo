import { describe, expect, it } from "vitest";
import { adminReviewItems, catalogAssets, contentRequests, failedSearchExamples, governanceWarnings, telemetryEvents } from "../data";
import { calculateReuseEligibility, calculateTelemetrySummary, calculateTrustScore, getAdminReviewPriority, getGovernanceWarnings, median, rankSearchResults, safeRate } from "../lib/catalog-logic";

const byId = (id: string) => catalogAssets.find((asset) => asset.assetId === id)!;

describe("seed integrity", () => {
  it("preserves canonical record counts", () => {
    expect(catalogAssets).toHaveLength(20);
    expect(contentRequests).toHaveLength(8);
    expect(adminReviewItems).toHaveLength(6);
    expect(telemetryEvents).toHaveLength(10);
    expect(failedSearchExamples).toHaveLength(5);
    expect(governanceWarnings).toHaveLength(5);
  });
});

describe("trust scoring and eligibility", () => {
  it("reconciles all seed trust fixtures", () => {
    for (const asset of catalogAssets) {
      const result = calculateTrustScore(asset);
      expect(result.score, asset.assetId).toBe(asset.trustScore);
      expect(result.band, asset.assetId).toBe(asset.trustBand);
    }
  });

  it("handles status and duplicate-risk gates without letting trust override eligibility", () => {
    expect(calculateTrustScore(byId("AEC-AST-0004")).components.governanceEvidence).toBe(10);
    expect(calculateTrustScore(byId("AEC-AST-0005")).components.governanceEvidence).toBe(5);
    expect(calculateTrustScore(byId("AEC-AST-0007")).components.lifecycleClarity).toBe(8);
    expect(calculateTrustScore(byId("AEC-AST-0010")).components.lifecycleClarity).toBe(5);
    expect(calculateReuseEligibility(byId("AEC-AST-0004")).eligible).toBe(false);
    expect(calculateReuseEligibility(byId("AEC-AST-0013")).eligible).toBe(true);
  });

  it("applies metadata, freshness, and band boundaries", () => {
    const base = { ...byId("AEC-AST-0013"), metadataCompleteness: 100, lastUpdated: "2026-02-04", duplicateRisk: "Low" as const };
    expect(calculateTrustScore(base).components.recordFreshness).toBe(15);
    expect(calculateTrustScore({ ...base, lastUpdated: "2026-02-03" }).components.recordFreshness).toBe(10);
    expect(calculateTrustScore({ ...base, lastUpdated: "2025-08-03" }).components.recordFreshness).toBe(10);
    expect(calculateTrustScore({ ...base, lastUpdated: "2025-08-02" }).components.recordFreshness).toBe(5);
    expect(calculateTrustScore({ ...base, lastUpdated: "2024-08-03" }).components.recordFreshness).toBe(5);
    expect(calculateTrustScore({ ...base, lastUpdated: "2024-08-02" }).components.recordFreshness).toBe(0);
    expect(calculateTrustScore({ ...base, metadataCompleteness: 84, duplicateRisk: "Medium" }).band).toBe("Moderate");
    expect(calculateTrustScore({ ...base, metadataCompleteness: 0, duplicateRisk: "High" }).band).toBe("Low");
  });
});

describe("search ranking", () => {
  it("filters, ranks exact/phrase matches, and separates governed exceptions", () => {
    const door = rankSearchResults(catalogAssets, "Single Flush Door", { discipline: "Architecture", contentType: "Revit Family", software: "Revit", compatibleVersion: "2026" });
    expect(door.eligibleResults[0].asset.assetId).toBe("AEC-AST-0001");
    expect(door.governedExceptions).toHaveLength(0);
    const exceptions = rankSearchResults(catalogAssets, "legacy north arrow", { software: "AutoCAD", compatibleVersion: "2026", governedOnly: false });
    expect(exceptions.eligibleResults.every((result) => result.eligible)).toBe(true);
    expect(exceptions.governedExceptions.some((result) => result.asset.assetId === "AEC-AST-0007")).toBe(true);
  });

  it("matches tags and parameters and keeps popularity bounded", () => {
    const tag = rankSearchResults(catalogAssets, "accessibility", { software: "AutoCAD" });
    expect(tag.eligibleResults[0].asset.assetId).toBe("AEC-AST-0006");
    const param = rankSearchResults(catalogAssets, "Nominal Thickness", { discipline: "Interior", governedOnly: false });
    expect(param.eligibleResults[0].asset.assetId).toBe("AEC-AST-0002");
    expect(param.governedExceptions[0].asset.assetId).toBe("AEC-AST-0018");
  });
});

describe("governance warnings", () => {
  it("orders blocking warnings ahead of high and caution warnings", () => {
    const warnings = getGovernanceWarnings(byId("AEC-AST-0005"), { compatibleVersion: "2026" });
    expect(warnings[0].severity).toBe("Block");
    expect(warnings.map((warning) => warning.message)).toContain("Declared compatibility mismatch");
    expect(warnings.map((warning) => warning.message)).toContain("Material metadata gaps");
  });

  it("detects duplicate, stale, lifecycle, and low metadata cautions", () => {
    expect(getGovernanceWarnings(byId("AEC-AST-0010"))[0].message).toContain("Lifecycle block");
    expect(getGovernanceWarnings(byId("AEC-AST-0016")).map((warning) => warning.message)).toEqual(expect.arrayContaining(["Possible duplicate or ambiguous record", "Record may be stale", "Metadata is incomplete"]));
  });
});

describe("admin priority", () => {
  it("recalculates all seed priority fixture scores", () => {
    for (const item of adminReviewItems) {
      const priority = getAdminReviewPriority(item, catalogAssets, contentRequests);
      expect(priority.score, item.reviewItemId).toBe(item.priority.score);
      expect(priority.band, item.reviewItemId).toBe(item.priority.band);
      expect(priority.components).toHaveLength(5);
    }
  });
});

describe("telemetry", () => {
  it("calculates seed funnel and operational metrics", () => {
    const summary = calculateTelemetrySummary(telemetryEvents, catalogAssets, contentRequests, failedSearchExamples, governanceWarnings);
    expect(summary.searchSuccessRate).toMatchObject({ numerator: 3, denominator: 4, value: 0.75 });
    expect(summary.zeroResultRate).toMatchObject({ numerator: 1, denominator: 4, value: 0.25 });
    expect(summary.searchToSelectionConversion).toMatchObject({ numerator: 1, denominator: 4, value: 0.25 });
    expect(summary.approvedSelectionRate).toMatchObject({ numerator: 1, denominator: 1, value: 1 });
    expect(summary.blockedAttemptRate).toMatchObject({ numerator: 1, denominator: 2, value: 0.5 });
    expect(summary.medianTimeToSelectionSeconds).toBe(140);
    expect(summary.requestFulfillmentRate.numerator).toBe(2);
    expect(summary.requestFulfillmentRate.denominator).toBe(3);
    expect(summary.medianOpenRequestAgeDays).toBe(24);
    expect(summary.pendingReviewAging).toEqual({ under7: 1, days7To14: 1, days15To30: 1, over30: 2 });
    expect(summary.metadataCompletenessDistribution).toEqual({ under70: 1, from70To84: 5, from85To94: 9, from95To100: 5 });
  });

  it("handles median and zero denominators", () => {
    expect(median([10, 30, 20])).toBe(20);
    expect(median([10, 20])).toBe(15);
    expect(safeRate(0, 0).displayValue).toBe("Not enough data");
  });
});
