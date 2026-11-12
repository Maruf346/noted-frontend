import {
  Feather,
  FileText,
  LogOut,
  Menu,
  Newspaper,
  Search,
  ShieldCheck,
  Tags,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "./Logo";

const mainLinks = [
  { to: "/notes", label: "My notes", icon: FileText },
  { to: "/posts", label: "Community", icon: Newspaper },
];
const adminLinks = [
  { to: "/admin/users", label: "Manage users", icon: Users },
  { to: "/admin/notes", label: "All notes", icon: ShieldCheck },
  { to: "/admin/interests", label: "Interest groups", icon: Tags },
];
const titles = {
  "/notes": ["My notes", "Capture what matters and find it when you need it."],
  "/posts": ["Community", "Ideas shared by people in your circle."],
  "/admin/users": ["Manage users", "Roles, access, and member details."],
  "/admin/notes": ["All notes", "Review notes across the platform."],
  "/admin/interests": ["Interest groups", "See how your community connects."],
};

function SideLink({ item, close }) {
  const Icon = item.icon;
  return (
    <NavLink
      onClick={close}
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
      }
    >
      <Icon size={18} />
      {item.label}
    </NavLink>
  );
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [title, subtitle] = titles[location.pathname] || [
    "Noted",
    "Your ideas, organized.",
  ];
  const signOut = () => {
    logout();
    navigate("/login");
  };
  const sidebar = (
    <>
      <div className="mb-8 px-2">
        <Logo />
      </div>
      <nav className="space-y-1">
        {mainLinks.map((item) => (
          <SideLink
            key={item.to}
            item={item}
            close={() => setMobileOpen(false)}
          />
        ))}
        {user?.role === "admin" && (
          <>
            <p className="mb-2 mt-7 px-3 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">
              Administration
            </p>
            {adminLinks.map((item) => (
              <SideLink
                key={item.to}
                item={item}
                close={() => setMobileOpen(false)}
              />
            ))}
          </>
        )}
      </nav>
      <div className="mt-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white">
        <p className="text-sm font-semibold">Keep ideas moving</p>
        <p className="mt-1 text-xs leading-5 text-indigo-100">
          Small notes become meaningful work.
        </p>
      </div>
      <button
        onClick={signOut}
        className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600"
      >
        <LogOut size={18} />
        Sign out
      </button>
    </>
  );
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#e8ebff_0,transparent_28%),#f7f9fc]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/70 bg-white/80 p-5 backdrop-blur-xl lg:flex">
        {sidebar}
      </aside>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="flex h-full w-72 flex-col bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 p-2 text-slate-500"
            >
              <X />
            </button>
            {sidebar}
          </aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-18 items-center gap-3 border-b border-slate-200/60 bg-white/70 px-4 backdrop-blur-xl sm:px-8">
          <button
            className="rounded-xl border border-slate-200 bg-white p-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="w-full rounded-xl border border-slate-200 bg-white/80 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
              placeholder="Search your workspace"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name}
              </p>
              <p className="text-xs capitalize text-slate-400">{user?.role}</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
              {user?.name?.[0]}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-8">
          <div className="mb-7">
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-indigo-500">
              <Feather size={13} />
              Workspace
            </p>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
