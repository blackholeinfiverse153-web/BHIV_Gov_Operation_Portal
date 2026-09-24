/**
 * CSV download for each tab — drop-in, no changes needed to `api.ts`.
 *
 * WHAT THE BACKEND NOW OFFERS
 * ---------------------------
 * Four endpoints, one per tab, each returning the same rows the tab already shows:
 *
 *     GET /api/citizens.csv
 *     GET /api/officers.csv
 *     GET /api/requests.csv
 *     GET /api/projects.csv
 *
 * They sit behind the same API key as the JSON endpoints, and they are generated from the same query, so a
 * download can never quietly disagree with the table it came from.
 *
 * WHY THIS IS NOT `<a href={`${BASE}/api/citizens.csv`} download>`
 * ----------------------------------------------------------------
 * A plain anchor cannot send headers. It would work today and break the moment the VM sets
 * GOV_OPS_API_KEY — the browser would navigate to a 401 page and the user would see a blank tab with no
 * explanation. It also cannot show a spinner or an error. So the file is fetched like any other request,
 * turned into a blob, and saved.
 *
 * THE FILENAME COMES FROM THE SERVER.
 * The backend sends `Content-Disposition: attachment; filename="citizens-2026-09-24.csv"` and also
 * `Access-Control-Expose-Headers: Content-Disposition`, which is what lets this code read it across
 * origins. Without that second header the browser hides the first one and every download would be called
 * "download". There is a fallback below for that case, but the server header is preferred so the date in
 * the name is the server's date, not the viewer's.
 */

// ONE BASE FOR THE WHOLE APP — the same expression `api.ts` uses.
//
// This briefly read `import.meta.env.VITE_GOV_OPS_BASE`, which is defined in neither `.env` nor
// `.env.example`. `BASE` was therefore `undefined`, every request became "undefined/api/citizens.csv",
// and the browser resolved that against the dev-server origin and 404'd with nothing useful to read.
// Two variables for one host also lets the CSV quietly point somewhere the rest of the app does not.
const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8090";

/** The tabs that can be exported. Same names the backend uses, so a typo is a compile error. */
export type ExportTab = "citizens" | "officers" | "requests" | "projects";

/**
 * Sent on every request.
 *
 * `ngrok-skip-browser-warning` for the same reason `api.ts` sends it. `X-API-Key` only when one is
 * configured: the backend leaves the API open when GOV_OPS_API_KEY is unset, and sending an empty key
 * header is not the same thing as sending none.
 *
 * NOTE — a VITE_ variable is compiled into the browser bundle, so this key is visible to anyone who opens
 * devtools. It keeps out a stranger who finds the address; it is not a login. Treat it as such.
 */
function headers(): Record<string, string> {
  const key = import.meta.env.VITE_GOV_OPS_API_KEY;
  return {
    "ngrok-skip-browser-warning": "true",
    ...(key ? { "X-API-Key": key } : {}),
  };
}

/** Pull the server's filename out of Content-Disposition, if the browser was allowed to see it. */
function filenameFrom(disposition: string | null, tab: ExportTab): string {
  const match = disposition?.match(/filename="([^"]+)"/);
  if (match) return match[1];
  // The server could not be read (no CORS expose header, or an old build). Name it ourselves rather than
  // letting the browser call it "download" — but this is the fallback, not the normal path.
  const today = new Date().toISOString().slice(0, 10);
  return `${tab}-${today}.csv`;
}

/**
 * Download one tab as a CSV file.
 *
 * Throws on failure with the server's own reason attached, exactly as `http()` in `api.ts` does — a 401
 * means the key is missing or wrong, and the user can be told that instead of watching nothing happen.
 */
export async function downloadCsv(tab: ExportTab): Promise<void> {
  const res = await fetch(`${BASE}/api/${tab}.csv`, { headers: headers() });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`);
  }

  const blob = await res.blob();
  const name = filenameFrom(res.headers.get("Content-Disposition"), tab);

  // Save it. `URL.revokeObjectURL` matters: without it the blob stays in memory for the life of the tab,
  // and an operator who exports twenty times over a shift is holding twenty copies.
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
