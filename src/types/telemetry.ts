import type { ApprovalStatus, ContentType, Discipline, ISODateTime, SoftwareCompatibility } from "./catalog";
import type { CatalogFilters } from "./requests";
export type TelemetryEventType = "search_executed" | "asset_detail_viewed" | "reuse_selected" | "reuse_blocked" | "content_request_started" | "content_request_submitted" | "admin_decision_recorded";
export interface TelemetryEvent {
  eventId: string; eventType: TelemetryEventType; occurredAt: ISODateTime; sessionId: string;
  actorPersona: "Designer / Engineer" | "BIM Manager / Content Admin" | "Product Manager / Platform Owner";
  query: string | null; resultCount: number | null; activeFilters: CatalogFilters | null;
  assetId: string | null; requestId: string | null; discipline: Discipline | null;
  contentType: ContentType | null; software: SoftwareCompatibility | null;
  approvalStatusAtEvent: ApprovalStatus | null; trustScoreAtEvent: number | null; blockedReason: string | null;
}
export interface FailedSearchExample {
  failedSearchId: string; occurredAt: ISODateTime; sessionId: string; query: string;
  activeFilters: CatalogFilters; resultCount: 0; userIntent: string; likelyCause: string;
  suggestedNextAction: string; linkedRequestId: string | null;
}
