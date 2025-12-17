import React from "react";

const users = [
  { name: "Alex Carter", role: "Manager", email: "alex@dineflow.app", status: "Active", lastActive: "10m ago" },
  { name: "Priya Singh", role: "Chef", email: "priya@dineflow.app", status: "Active", lastActive: "22m ago" },
  { name: "Diego Alvarez", role: "Front desk", email: "diego@dineflow.app", status: "Away", lastActive: "1h ago" },
  { name: "Sarah Nguyen", role: "Courier", email: "sarah@dineflow.app", status: "Offline", lastActive: "4h ago" },
  { name: "Noah Miles", role: "Chef", email: "noah@dineflow.app", status: "Active", lastActive: "5m ago" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Away: "bg-amber-50 text-amber-700 ring-amber-100",
  Offline: "bg-slate-100 text-slate-700 ring-slate-200",
};

const summary = [
  { label: "Team members", value: "18", hint: "Including contractors" },
  { label: "Active now", value: "11", hint: "Working in the app" },
  { label: "Invites pending", value: "3", hint: "Awaiting acceptance" },
];

const Users = () => {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-3">
        {summary.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {card.value}
            </p>
            <p className="text-xs text-slate-500">{card.hint}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Users
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              Team directory
            </h2>
            <p className="text-sm text-slate-500">
              Dummy data to showcase roles, contact, and status.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500">
              Invite user
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500">
              New role
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
          <div className="grid grid-cols-5 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            <div>Name</div>
            <div>Role</div>
            <div>Email</div>
            <div>Status</div>
            <div className="text-right">Last active</div>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {users.map((user) => (
              <div
                key={user.email}
                className="grid grid-cols-5 items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
              >
                <div>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div>{user.role}</div>
                <div className="truncate text-slate-600">{user.email}</div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                      statusStyles[user.status] || "bg-slate-100 text-slate-700 ring-slate-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="text-right text-sm text-slate-500">
                  {user.lastActive}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
