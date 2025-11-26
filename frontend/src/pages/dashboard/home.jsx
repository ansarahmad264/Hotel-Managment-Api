import React from "react";

const productRows = [
  { name: "Truffle Pasta", price: "$18.00", status: "Active", stock: 22, category: "Mains" },
  { name: "Charcoal Burger", price: "$14.50", status: "Low stock", stock: 6, category: "Mains" },
  { name: "Citrus Cooler", price: "$7.00", status: "Inactive", stock: 0, category: "Beverages" },
  { name: "Matcha Cheesecake", price: "$9.20", status: "Active", stock: 14, category: "Dessert" },
];

const orderRows = [
  { id: "#4821", customer: "Alex Carter", total: "$64.00", items: 3, status: "In Kitchen", time: "12:45 PM" },
  { id: "#4819", customer: "Priya Singh", total: "$42.50", items: 2, status: "Ready", time: "12:38 PM" },
  { id: "#4816", customer: "Diego Alvarez", total: "$58.00", items: 4, status: "On the way", time: "12:22 PM" },
  { id: "#4811", customer: "Sarah Nguyen", total: "$33.00", items: 2, status: "Pending", time: "12:05 PM" },
];

const statusStyles = {
  Active: "text-emerald-200 bg-emerald-500/10 border-emerald-500/40",
  "Low stock": "text-amber-200 bg-amber-500/10 border-amber-500/40",
  Inactive: "text-slate-300 bg-slate-800/60 border-slate-700",
  Pending: "text-amber-200 bg-amber-500/10 border-amber-500/30",
  Ready: "text-emerald-200 bg-emerald-500/10 border-emerald-500/30",
  "In Kitchen": "text-sky-200 bg-sky-500/10 border-sky-500/30",
  "On the way": "text-emerald-100 bg-emerald-500/15 border-emerald-500/30",
};

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active Products", value: "48", delta: "+3 new today", accent: "from-emerald-400/60 to-emerald-500/50" },
          { title: "Orders Today", value: "126", delta: "18 in prep", accent: "from-amber-300/70 to-amber-500/40" },
          { title: "Avg. Prep Time", value: "12m", delta: "2m faster", accent: "from-sky-300/70 to-emerald-400/50" },
          { title: "Revenue", value: "$4.8k", delta: "Daily run rate", accent: "from-emerald-300/60 to-amber-400/60" },
        ].map((card) => (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 px-4 py-5 shadow-lg shadow-black/30"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-20`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{card.title}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">{card.value}</p>
                <p className="text-xs text-emerald-200">{card.delta}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-emerald-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 7" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-black/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Products</p>
              <h2 className="text-xl font-semibold text-slate-50">Product Management</h2>
              <p className="text-sm text-slate-400">Control menu visibility, pricing, and availability.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500/60">
              <span>New dish</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Active</p>
              <p className="text-2xl font-semibold text-emerald-200">36</p>
              <p className="text-xs text-slate-500">Live on the app</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Low stock</p>
              <p className="text-2xl font-semibold text-amber-200">4</p>
              <p className="text-xs text-slate-500">Need restock soon</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Hidden</p>
              <p className="text-2xl font-semibold text-slate-200">8</p>
              <p className="text-xs text-slate-500">Temporarily unavailable</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800/80">
            <div className="grid grid-cols-5 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
              <div className="col-span-2">Item</div>
              <div>Price</div>
              <div>Status</div>
              <div className="text-right">Stock</div>
            </div>
            <div className="divide-y divide-slate-800/70 bg-slate-900/60">
              {productRows.map((product) => (
                <div key={product.name} className="grid grid-cols-5 items-center px-4 py-3 text-sm text-slate-100 hover:bg-slate-800/40">
                  <div className="col-span-2">
                    <p className="font-medium text-slate-50">{product.name}</p>
                    <p className="text-xs text-slate-400">{product.category}</p>
                  </div>
                  <p className="text-slate-200">{product.price}</p>
                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[product.status] || "bg-slate-800/60 text-slate-200"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current/70" />
                    {product.status}
                  </span>
                  <div className="flex items-center justify-end gap-3">
                    <span className="rounded-full bg-slate-800/80 px-2 py-1 text-xs text-slate-300">
                      {product.stock} left
                    </span>
                    <button className="text-xs font-semibold text-emerald-300 hover:text-emerald-200">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Dish name</label>
              <input
                type="text"
                placeholder="Smoky peri-peri wings"
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="12.50"
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Category</label>
              <select className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40">
                <option>Mains</option>
                <option>Starters</option>
                <option>Dessert</option>
                <option>Beverages</option>
              </select>
            </div>
            <div className="flex items-end justify-end sm:col-span-2 lg:col-span-4">
              <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500/60">
                Save product
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-black/30">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Orders</p>
              <h2 className="text-xl font-semibold text-slate-50">Live orders</h2>
              <p className="text-sm text-slate-400">Keep the queue flowing and notify couriers.</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
              6 awaiting
            </span>
          </div>

          <div className="space-y-3">
            {orderRows.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4 shadow-inner shadow-black/10 transition hover:border-emerald-500/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-50">
                      {order.id} - {order.customer}
                    </p>
                    <p className="text-xs text-slate-400">
                      {order.items} items - {order.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[order.status] || "bg-slate-800/60 text-slate-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-200">
                  <p className="font-semibold">{order.total}</p>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700">
                      Update status
                    </button>
                    <button className="rounded-lg bg-emerald-500/90 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/25 hover:bg-emerald-400">
                      Notify courier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Kitchen tracker</p>
            <div className="mt-3 space-y-2">
              {[
                { label: "Prep", value: 48 },
                { label: "Ready for pickup", value: 28 },
                { label: "On the way", value: 24 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-black/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Service quality</p>
              <h3 className="text-lg font-semibold text-slate-50">Order timeline</h3>
            </div>
            <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-300">Last 2 hours</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { title: "Prep time stable", desc: "Tickets moving in under 12 minutes on average.", tone: "text-emerald-200" },
              { title: "Delivery zone B", desc: "Riders delayed due to rain. Increase buffer by 4 mins.", tone: "text-amber-200" },
              { title: "Menu rotation", desc: "Starters outperform mains by 12%. Consider upsell combos.", tone: "text-slate-200" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-4 py-3">
                <p className={`text-sm font-semibold ${item.tone}`}>{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-black/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Quick actions</p>
              <h3 className="text-lg font-semibold text-slate-50">Workflow</h3>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
              Auto-sync
            </span>
          </div>

          <div className="space-y-3">
            {[
              { title: "Pause delivery slots", desc: "Stop accepting deliveries for 20 minutes.", cta: "Pause now" },
              { title: "Push promo", desc: "Highlight desserts for dinner rush.", cta: "Send banner" },
              { title: "Print prep list", desc: "Hand kitchen the latest order queue.", cta: "Download" },
            ].map((action) => (
              <div key={action.title} className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-slate-100">{action.title}</p>
                <p className="text-xs text-slate-400">{action.desc}</p>
                <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200">
                  {action.cta}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
