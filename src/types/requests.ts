import type { ApprovalStatus, ContentType, Discipline, DuplicateRisk, ISODateTime, SoftwareCompatibility, TrustBand } from "./catalog";

export interface CatalogFilters {
  discipline?: Discipline;
  contentType?: ContentType;
  software?: SoftwareCompatibility;
  compatibleVersion?: string;
  approvalStatus?: ApprovalStatus;
  trustBand?: TrustBand;
  duplicateRisk?: DuplicateRisk;
  updatedWithinDays?: number;
  governedOnly?: boolean;
}
export interface RequestPriority {
  demandEvidence: number; requiredByProximity: number; requestAge: number;
  coverageGap: number; noAcceptableSubstitute: number; score: number;
  band: "Urgent" | "High" | "Normal";
}
export interface SubmissionPriority {
  governanceBlock: number; duplicateRisk: number; metadataGap: number;
  queueAge: number; historicalUsage: number; score: number;
  band: "Urgent" | "High" | "Normal";
}
export interface ContentRequest {
  requestId: string; requestType: "New Content" | "Revision"; title: string;
  discipline: Discipline; desiredContentType: ContentType; software: SoftwareCompatibility;
  compatibleVersionNeed: string; projectNeed: string; requiredBy: string | null;
  businessReason: string; existingAssetId: string | null; substituteAccepted: boolean;
  sourceQuery: string; sourceFilters: CatalogFilters;
  status: "Draft" | "Submitted" | "Triaged" | "In Review" | "Fulfilled" | "Declined";
  submittedAt: ISODateTime; updatedAt: ISODateTime; assignedOwner: string | null;
  relatedZeroResultCount: number; relatedOpenRequestCount: number;
  coverageStatus: "No Approved Candidate" | "Weak Candidate Only" | "Approved Candidate Exists";
  linkedAssetId: string | null; resultingVersion: string | null; decisionNote: string | null;
  priority: RequestPriority;
}
export interface AdminReviewItem {
  reviewItemId: string; itemType: "Content Request" | "Content Submission"; entityId: string;
  title: string; discipline: Discipline; submittedAt: ISODateTime; assignedOwner: string | null;
  reviewStatus: "Open" | "In Review" | "Awaiting Comparison" | "Changes Requested";
  prioritySource: string; priority: RequestPriority | SubmissionPriority; reasonChips: string[];
  recommendedNextAction: string; queueRank: number;
}
