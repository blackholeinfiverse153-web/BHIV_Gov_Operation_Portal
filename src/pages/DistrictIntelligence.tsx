import { useEffect, useState } from "react";
import { AlertTriangle, Check, ChevronDown, Database, LoaderCircle, RefreshCw } from "lucide-react";
import { districtIntelligence, type IntelligenceCatalog, type UnifiedIntelligence } from "../services/districtIntelligence";

const state = "maharashtra";
const configuredDistrict = import.meta.env.VITE_PILOT_DISTRICT || "";

function formatLabel(value: string) { return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

function valuesFrom(value: unknown, depth = 0): string[] {
  if (depth > 2 || value === null || value === undefined) return [];
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return [String(value)];
  if (Array.isArray(value)) return value.slice(0, 3).flatMap((item) => valuesFrom(item, depth + 1));
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    return ["recommendation", "status", "confidence", "message", "detail", "observed_at", "freshness"]
      .flatMap((key) => record[key] === undefined ? [] : [`${formatLabel(key)}: ${valuesFrom(record[key], depth + 1).join(", ")}`]);
  }
  return [];
}

type SourceRecord = { name: string; fields: Record<string, string> };

function sourcesFrom(value: unknown, result: SourceRecord[] = []) {
  if (value === null || value === undefined || typeof value !== "object") return result;
  if (Array.isArray(value)) { value.forEach((item) => sourcesFrom(item, result)); return result; }
  const record = value as Record<string, unknown>;
  if (record.source_id || record.source_name || record.attribution) {
    const fields = Object.fromEntries(Object.entries(record).filter(([, item]) => typeof item === "string" || typeof item === "number" || typeof item === "boolean").map(([key, item]) => [formatLabel(key), String(item)]));
    const name = String(record.source_name || record.source_id || "Unidentified source");
    if (!result.some((source) => source.name === name && source.fields["Source Id"] === fields["Source Id"])) result.push({ name, fields });
  }
  Object.values(record).forEach((item) => sourcesFrom(item, result));
  return result;
}

function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900"><div className="flex gap-3"><AlertTriangle className="shrink-0" size={20} /><div><h2 className="font-semibold">District Intelligence is unavailable</h2><p className="mt-1 text-sm">{message}</p><button type="button" onClick={retry} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white"><RefreshCw size={16} /> Retry</button></div></div></div>;
}

export default function DistrictIntelligence() {
  const [catalog, setCatalog] = useState<IntelligenceCatalog | null>(null);
  const [district, setDistrict] = useState(configuredDistrict);
  const [crop, setCrop] = useState("");
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<UnifiedIntelligence | null>(null);
  const [cropMenuOpen, setCropMenuOpen] = useState(false);

  const loadCatalog = async () => { setCatalogLoading(true); setError(""); try { setCatalog(await districtIntelligence.getCatalog(state)); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to load the AIAIC catalog."); } finally { setCatalogLoading(false); } };
  const loadIntelligence = async () => { if (!district.trim() || !crop) return; setLoading(true); setError(""); try { setResult(await districtIntelligence.getUnified(crop, district.trim(), state)); } catch (reason) { setResult(null); setError(reason instanceof Error ? reason.message : "Unable to load district intelligence."); } finally { setLoading(false); } };
  useEffect(() => {
    const timer = globalThis.setTimeout(() => { void loadCatalog(); }, 0);
    return () => globalThis.clearTimeout(timer);
  }, []);

  const serviceEntries = result ? Object.entries(result).filter(([, value]) => value !== null && value !== undefined) : [];
  const sources = result ? sourcesFrom(result) : [];

  return <div className="space-y-4">
    <header><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Agriculture intelligence</p><span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Live service</span></div><h1 className="mt-1 text-3xl font-bold text-slate-900">District Intelligence</h1><p className="mt-2 max-w-3xl text-slate-600">One-district-first view of crop, market, weather, water and storage evidence returned by the configured intelligence service.</p></header>
    {!configuredDistrict && <div className="flex items-center gap-2 text-xs text-slate-500"><span className="rounded-full border border-slate-200 bg-white px-2 py-1 font-semibold text-slate-600">Configuration</span><span>Pilot district is not configured. Enter the approved district to continue.</span></div>}
    {error && <ErrorState message={error} retry={error.includes("catalog") ? () => void loadCatalog() : () => void loadIntelligence()} />}
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <label className="text-sm font-medium text-slate-700">Pilot district<input value={district} onChange={(event) => { setDistrict(event.target.value); setResult(null); }} placeholder="Approved district name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <div className="relative text-sm font-medium text-slate-700"><span>Crop</span>{catalogLoading ? <span className="mt-1 block text-sm font-normal text-slate-500">Loading catalog...</span> : <><button type="button" aria-haspopup="listbox" aria-expanded={cropMenuOpen} onClick={() => setCropMenuOpen((open) => !open)} className="mt-1 flex min-h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left font-normal text-slate-800 shadow-sm transition hover:border-teal-600 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-700/10"><span className={crop ? "" : "text-slate-400"}>{crop || "Select a returned crop"}</span><ChevronDown size={17} className={`text-slate-400 transition-transform ${cropMenuOpen ? "rotate-180" : ""}`} /></button>{cropMenuOpen && <div role="listbox" aria-label="Returned crops" className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">{(catalog?.crops || []).map((item) => <button type="button" role="option" aria-selected={crop === item} key={item} onClick={() => { setCrop(item); setCropMenuOpen(false); }} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-normal text-slate-700 hover:bg-teal-50 hover:text-teal-800">{item}{crop === item && <Check size={15} className="text-teal-700" />}</button>)}</div>}</>}</div>
      <button type="button" disabled={!district.trim() || !crop || loading} onClick={() => void loadIntelligence()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400">{loading && <LoaderCircle className="animate-spin" size={18} />} Query live intelligence</button>
    </div><p className="mt-3 text-xs text-slate-500">State: Maharashtra <span className="mx-1 text-slate-300">•</span> Live evidence only <span className="mx-1 text-slate-300">•</span> No response is replaced with mock data.</p></section>
    {loading && <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600"><LoaderCircle className="animate-spin" size={18} /> Loading returned intelligence...</div>}
    {!loading && !result && !error && <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">Select the approved pilot district and a catalog crop to query live evidence.</div>}
    {!loading && result && serviceEntries.length === 0 && <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">The API returned no intelligence for this district and crop. This is an empty result, not a zero-valued KPI.</div>}
    {!loading && serviceEntries.length > 0 && <><section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{serviceEntries.map(([service, value]) => <article key={service} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{formatLabel(service)}</p><div className="mt-2 space-y-1.5 text-sm text-slate-700">{valuesFrom(value).slice(0, 8).map((item, index) => <p key={`${service}-${index}`}>{item}</p>)}{valuesFrom(value).length === 0 && <p className="text-slate-500">Returned data has no displayable summary fields.</p>}</div></article>)}</section><section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2"><Database className="text-emerald-700" size={19} /><div><h2 className="font-semibold text-slate-900">Data provenance</h2><p className="text-xs text-slate-500">{sources.length ? `${sources.length} source${sources.length === 1 ? "" : "s"} returned with this response` : "No source metadata returned"}</p></div></div>{sources.length ? <div className="mt-3 grid gap-2 sm:grid-cols-2">{sources.map((source, index) => <details key={`${source.name}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"><summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">{source.name}<span className="float-right text-xs font-medium text-teal-700">View details</span></summary><dl className="mt-3 space-y-1.5 border-t border-slate-200 pt-3 text-xs">{Object.entries(source.fields).map(([key, item]) => <div key={key} className="flex gap-3"><dt className="w-28 shrink-0 text-slate-500">{key}</dt><dd className="break-words text-slate-700">{item}</dd></div>)}</dl></details>)}</div> : <p className="mt-3 text-sm text-amber-800">The response did not include source metadata. Provenance status: UNKNOWN.</p>}</section></>}
  </div>;
}