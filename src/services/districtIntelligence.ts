export type IntelligenceCatalog = {
  services: string[];
  crops: string[];
  [key: string]: unknown;
};

export type UnifiedIntelligence = Record<string, unknown>;

const BASE_URL = (import.meta.env.VITE_AQIAIC_BASE_URL || "").replace(
  /\/$/,
  "",
);
const REQUEST_TIMEOUT_MS = 15_000;

async function request<T>(path: string): Promise<T> {
  if (!BASE_URL)
    throw new Error(
      "AIAIC data service is not configured. Set VITE_AQIAIC_BASE_URL.",
    );
  const controller = new AbortController();
  const timer = globalThis.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { "ngrok-skip-browser-warning": "true" },
      signal: controller.signal,
    });
    const body = await response.text();
    let parsed: unknown = null;
    try {
      parsed = body ? JSON.parse(body) : null;
    } catch {
      parsed = body;
    }
    if (!response.ok) {
      const detail =
        typeof parsed === "object" && parsed !== null && "detail" in parsed
          ? String((parsed as { detail?: unknown }).detail)
          : body;
      throw new Error(
        `${response.status} ${response.statusText}${detail ? ` - ${detail}` : ""}`,
      );
    }
    return parsed as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw new Error("AIAIC data service did not respond in time.", {
        cause: error,
      });
    if (error instanceof Error) throw error;
    throw new Error("AIAIC data service is unavailable.", { cause: error });
  } finally {
    globalThis.clearTimeout(timer);
  }
}

export const districtIntelligence = {
  baseUrl: BASE_URL,
  getCatalog: (state: string) =>
    request<IntelligenceCatalog>(`/catalog?state=${encodeURIComponent(state)}`),
  getUnified: (crop: string, district: string, state: string) =>
    request<UnifiedIntelligence>(
      `/intelligence/unified?crop=${encodeURIComponent(crop)}&region=${encodeURIComponent(district)}&state=${encodeURIComponent(state)}&per_service=1`,
    ),
};
