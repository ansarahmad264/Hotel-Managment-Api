import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { name: "Charcoal Burger", category: "Mains", price: "$14.50", stock: 12, status: "Active" },
  { name: "Truffle Pasta", category: "Mains", price: "$18.00", stock: 24, status: "Active" },
  { name: "Citrus Cooler", category: "Beverages", price: "$7.00", stock: 0, status: "Inactive" },
  { name: "Matcha Cheesecake", category: "Dessert", price: "$9.20", stock: 9, status: "Low stock" },
  { name: "Falafel Wrap", category: "Mains", price: "$11.00", stock: 15, status: "Active" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "Low stock": "bg-amber-50 text-amber-700 ring-amber-100",
  Inactive: "bg-slate-100 text-slate-700 ring-slate-200",
};

const summary = [
  { label: "Live items", value: "42", hint: "Shown to guests" },
  { label: "Low stock", value: "6", hint: "Need restock" },
  { label: "Hidden", value: "8", hint: "Disabled temporarily" },
];

const Products = () => {
  const navigate = useNavigate();
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
              Products
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              Menu manager
            </h2>
            <p className="text-sm text-slate-500">
              Dummy list for quick inventory and pricing review.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/products/add")}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Add product
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
          <div className="grid grid-cols-6 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            <div className="col-span-2">Item</div>
            <div>Category</div>
            <div>Price</div>
            <div>Status</div>
            <div className="text-right">Stock</div>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {products.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-6 items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
              >
                <div className="col-span-2">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">#{item.category}</p>
                </div>
                <div>{item.category}</div>
                <div className="font-semibold text-slate-900">{item.price}</div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                      statusStyles[item.status] || "bg-slate-100 text-slate-700 ring-slate-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    {item.stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
