/**
 * "Download CSV" — one button, usable on every tab.
 *
 * HOW TO USE IT
 * -------------
 *     import DownloadCsvButton from "../components/common/DownloadCsvButton";
 *     ...
 *     <DownloadCsvButton tab="citizens" />
 *
 * Put it in the header row of each page, beside the search box or the "Add" button:
 *
 *     Citizens.tsx  -> <DownloadCsvButton tab="citizens" />
 *     Officers.tsx  -> <DownloadCsvButton tab="officers" />
 *     Requests.tsx  -> <DownloadCsvButton tab="requests" />
 *     Projects.tsx  -> <DownloadCsvButton tab="projects" />
 *
 * WHY IT CARRIES ITS OWN STYLES
 * -----------------------------
 * `src/components/common/Button.tsx` and `src/components/ui/*.tsx` are currently EMPTY FILES in the repo
 * (0 bytes — see the note sent with this file). Importing one of them would make this component fail to
 * render. It is deliberately self-contained so it works the moment it is dropped in, and it uses the same
 * Tailwind utilities the rest of the portal uses, so it will not look foreign.
 *
 * WHY IT HAS THREE STATES
 * -----------------------
 * A download is a network call and can fail — most obviously with 401 once the VM sets an API key. A
 * button that silently does nothing on failure is the exact problem the task calls out: the app must not
 * "pretend everything is fine". So: idle, downloading, and a visible error the user can read.
 */
import { useState } from "react";

import { downloadCsv, type ExportTab } from "../../services/exports";

type Props = {
  tab: ExportTab;
  /** Optional label override, e.g. "Export citizens". Defaults to "Download CSV". */
  label?: string;
  className?: string;
};

export default function DownloadCsvButton({ tab, label = "Download CSV", className = "" }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      await downloadCsv(tab);
    } catch (e) {
      // Show the server's reason. "401 Unauthorized" tells an operator to check the key; "failed" does not.
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-busy={busy}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2
                   text-sm font-medium text-gray-700 shadow-sm transition
                   hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {/* A download glyph, inline so this file needs no icon package. */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {busy ? "Preparing…" : label}
      </button>

      {error && (
        <p role="alert" className="text-xs text-red-600">
          Could not download: {error}
        </p>
      )}
    </div>
  );
}
