export type ISODate = string;
export type ISODateTime = string;

export type ApprovalStatus = "Approved" | "Pending Review" | "Needs Revision" | "Superseded" | "Deprecated";
export type ContentType = "Revit Family" | "AutoCAD Block" | "Material" | "Detail" | "Template" | "Schedule";
export type Discipline = "Architecture" | "Structural" | "MEP" | "Civil" | "Interior" | "General";
export type SoftwareCompatibility = "Revit" | "AutoCAD";
export type DuplicateRisk = "Low" | "Medium" | "High";
export type TrustBand = "High" | "Moderate" | "Low";

export interface CatalogParameter {
  name: string;
  value: string | number | boolean;
  unit: string | null;
  dataType: "number" | "string" | "boolean" | "enum";
}

export interface TrustComponents {
  governanceEvidence: number;
  metadataPoints: number;
  lifecycleClarity: number;
  recordFreshness: number;
  duplicateConfidence: number;
}

export interface CatalogAsset {
  assetId: string;
  name: string;
  description: string;
  contentType: ContentType;
  discipline: Discipline;
  software: SoftwareCompatibility;
  compatibleVersions: string[];
  approvalStatus: ApprovalStatus;
  version: string;
  owner: string;
  lastUpdated: ISODate;
  metadataCompleteness: number;
  usageCount: number;
  lastUsed: ISODate;
  duplicateRisk: DuplicateRisk;
  tags: string[];
  parameters: CatalogParameter[];
  relatedStandard: string;
  warningMessage: string | null;
  deprecatedReason: string | null;
  trustScore: number;
  trustBand: TrustBand;
  trustComponents: TrustComponents;
}

export type WarningType = "Duplicate" | "Stale" | "Duplicate and Stale";
export type WarningSeverity = "Caution" | "High";
export interface GovernanceWarning {
  warningId: string;
  assetId: string;
  warningType: WarningType;
  severity: WarningSeverity;
  detectedAt: ISODateTime;
  ageDays: number;
  message: string;
  evidence: string;
  relatedAssetIds: string[];
  recommendedAction: string;
  dismissible: boolean;
}
