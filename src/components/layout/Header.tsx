import { LogOut, Menu, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";

const titles: Record<string, string> = { "/dashboard": "Operations overview", "/citizens": "Citizen management", "/officers": "Officer management", "/requests": "Service requests", "/projects": "Project management", "/district-intelligence": "District intelligence", "/profile": "Profile", "/settings": "Settings" };

const Header = ({ onMenu }: { onMenu: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const title = titles[location.pathname] || "Operations workspace";

  const handleLogout = async () => {
    setLogoutError("");
    if (await auth.logout()) {
      navigate("/login", { replace: true });
    } else {
      setLogoutError("BHIV Core could not confirm logout. Please try again.");
    }
  };

  if (auth.status !== "authenticated") return null;

  return (

    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="flex min-h-12 items-center justify-between gap-4">
        <div className="flex items-center gap-3"><button type="button" aria-label="Open navigation" onClick={onMenu} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"><Menu size={21} /></button><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">BHIV Gov Operations</p><h2 className="text-lg font-semibold text-slate-900 md:text-xl">{title}</h2></div></div>
        <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 lg:flex"><Search size={16} /><span>Search workspace</span><kbd className="ml-5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px]">/</kbd></div><div className="hidden h-8 w-px bg-slate-200 sm:block" /><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--portal-navy)] text-white"><User size={17} /></div><div className="hidden max-w-48 md:block"><p className="truncate text-sm font-semibold text-slate-800">{auth.user.email}</p><p className="truncate text-xs text-slate-500">{auth.user.roles.join(", ") || "BHIV Core user"}</p><p className="truncate text-[10px] text-slate-500">Tenant {auth.user.tenant_id}</p></div></div><button type="button" onClick={() => void handleLogout()} aria-label="Sign out" title="Sign out" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><LogOut size={18} /></button></div>
      </div>
      {logoutError && <p className="pb-1 text-right text-xs text-red-700" role="alert">{logoutError}</p>}
    </header>
  );
};

export default Header;