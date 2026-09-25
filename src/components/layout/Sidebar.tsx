import { useLocation, Link } from "react-router-dom";
import { BarChart3, BriefcaseBusiness, Building2, ClipboardList, Leaf, Settings, ShieldCheck, Users, X } from "lucide-react";

type SidebarProps = { isOpen: boolean; onClose: () => void };

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);
  const navigation = [
    { label: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { label: "Requests", path: "/requests", icon: ClipboardList },
    { label: "Projects", path: "/projects", icon: BriefcaseBusiness },
    { label: "Citizens", path: "/citizens", icon: Users },
    { label: "Officers", path: "/officers", icon: ShieldCheck },
    { label: "District Intelligence", path: "/district-intelligence", icon: Leaf },
  ];

  return (
    <>
      {isOpen && <button type="button" aria-label="Dismiss navigation overlay" onClick={onClose} className="fixed inset-0 z-30 bg-slate-950/40 md:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col bg-[var(--portal-navy)] px-4 py-5 text-white shadow-2xl transition-transform duration-200 md:static md:translate-x-0 md:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-3">
          <Link to="/dashboard" onClick={onClose} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300"><Building2 size={21} /></span>
            <span><span className="block text-sm font-semibold tracking-wide">BHIV GOV OPS</span><span className="block text-xs text-slate-400">Operations + intelligence</span></span>
          </Link>
          <button type="button" aria-label="Close navigation" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 md:hidden"><X size={19} /></button>
        </div>
        <div className="mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Workspace</div>
        <nav aria-label="Primary navigation" className="mt-3 flex flex-1 flex-col gap-1">
          {navigation.map(({ label, path, icon: Icon }) => <Link key={path} to={path} onClick={onClose} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive(path) ? "bg-teal-500/15 text-teal-200 shadow-inner" : "text-slate-300 hover:bg-white/8 hover:text-white"}`} aria-current={isActive(path) ? "page" : undefined}><Icon size={18} /><span>{label}</span>{isActive(path) && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-300" />}</Link>)}
          <div className="my-4 border-t border-white/10" />
          <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Account</div>
          <Link to="/profile" onClick={onClose} className={`mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive("/profile") ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}><Users size={18} />Profile</Link>
          <Link to="/settings" onClick={onClose} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive("/settings") ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}><Settings size={18} />Settings</Link>
        </nav>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-2 text-xs font-semibold text-teal-200"><Leaf size={15} /> Intelligence workspace</div><p className="mt-2 text-xs leading-5 text-slate-400">Live agricultural evidence, presented with source and quality context.</p><div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Connected workspace</div></div>
      </aside>
    </>
  );
};

export default Sidebar;