"use client";

import type { ContentRequest } from "../types/requests";
const STORAGE_KEY = "aec-content-catalog-trust-demo:request-admin:v1";
const BASE_TIMESTAMP = Date.parse("2026-08-03T19:00:00Z");

export interface DemoAuditEntry {
  auditEventId: string;
  requestId: string;
  action: string;
  fromValue?: string | null;
  toValue?: string | null;
  note?: string | null;
  occurredAt: string;
}

export interface DemoRequestState {
  localRequests: ContentRequest[];
  requestOverrides: Record<string, Partial<ContentRequest>>;
  auditEntries: DemoAuditEntry[];
}

export const emptyDemoRequestState: DemoRequestState = { localRequests: [], requestOverrides: {}, auditEntries: [] };

export function loadDemoRequestState(): DemoRequestState {
  if (typeof window === "undefined") return emptyDemoRequestState;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyDemoRequestState;
  const parsed = JSON.parse(raw) as Partial<DemoRequestState>;
  return { localRequests: parsed.localRequests ?? [], requestOverrides: parsed.requestOverrides ?? {}, auditEntries: parsed.auditEntries ?? [] };
}

export function saveDemoRequestState(state: DemoRequestState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetDemoRequestState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function demoTimestamp(sequence: number) {
  return new Date(BASE_TIMESTAMP + sequence * 1000).toISOString();
}

export function nextLocalRequestId(existingCount: number) {
  return `AEC-REQ-LOCAL-${String(existingCount + 1).padStart(3, "0")}`;
}

export function nextAuditId(existingCount: number) {
  return `AEC-AUD-LOCAL-${String(existingCount + 1).padStart(3, "0")}`;
}
