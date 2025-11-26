import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Overview", to: "/dashboard/home", icon: "grid" },
  { label: "Orders", to: "/dashboard/orders", icon: "receipt" },
];

const iconPaths = {
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  receipt: "M7 3h10l2 2v14l-2-2-2 2-2-2-2 2-2-2-2 2V5l2-2Zm0 0v16",
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex h-screen">
        <aside className=" hidden w-64 flex-col border-r border-slate-800/80 bg-slate-900/60 px-4 py-6 lg:flex">
          <div className="mb-8 flex items-center gap-2 px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M10 18h10"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                DineFlow
              </p>
              <p className="text-sm font-semibold text-emerald-300">Manager</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/40"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-emerald-200",
                  ].join(" ")
                }
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={iconPaths[item.icon]}
                    />
                  </svg>
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-3 rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800/80">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Logged in
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
                {user?.name?.[0]?.toUpperCase() ||
                  user?.email?.[0]?.toUpperCase() ||
                  "A"}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-100">
                  {user?.name || "Admin"}
                </p>
                <p className="text-slate-400">{user?.email || "Signed in"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-500/60"
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M10 18h10"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
                    Dashboard
                  </p>
                  <p className="text-lg font-semibold text-slate-50">
                    {location.pathname.includes("orders")
                      ? "Orders"
                      : "Products & Orders"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 shadow-inner shadow-black/20 sm:flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-3.5-3.5M5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
                    />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search menu or order ID"
                    className="bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500/70"
                >
                  <span>Logout</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17.5 21 12l-6-5.5M21 12H9M13 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* remove sidebar scroll */}
          <main className="no-scrollbar flex-1 overflow-auto px-4 pb-10 my-10 sm:px-6 lg:px-8 ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
