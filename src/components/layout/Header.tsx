import { Menu, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = { "/dashboard": "Operations overview", "/citizens": "Citizen management", "/officers": "Officer management", "/requests": "Service requests", "/projects": "Project management", "/district-intelligence": "District intelligence", "/profile": "Profile", "/settings": "Settings" };

const Header = ({ onMenu }: { onMenu: () => void }) => {
  const location = useLocation();
  const title = titles[location.pathname] || "Operations workspace";

  return (

    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="flex min-h-12 items-center justify-between gap-4">
        <div className="flex items-center gap-3"><button type="button" aria-label="Open navigation" onClick={onMenu} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"><Menu size={21} /></button><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">BHIV Gov Operations</p><h2 className="text-lg font-semibold text-slate-900 md:text-xl">{title}</h2></div></div>
        <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 lg:flex"><Search size={16} /><span>Search workspace</span><kbd className="ml-5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px]">/</kbd></div><div className="hidden h-8 w-px bg-slate-200 sm:block" /><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--portal-navy)] text-white"><User size={17} /></div><div className="hidden md:block"><p className="text-sm font-semibold text-slate-800">Riddhi Khatate</p><p className="text-xs text-slate-500">Administrator</p></div></div></div>
      </div>
    </header>
  );
};

export default Header;