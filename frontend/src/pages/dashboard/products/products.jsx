import { Button } from "@/components/ui/button";
import { shortText } from "@/lib/utils";
import {
  DeleteProductApi,
  EditProductApi,
  GetProductsApi,
} from "@/services/product/product.services";
import { useAuthStore } from "@/store/auth.slice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const summary = [
  { label: "Live items", value: "42", hint: "Shown to guests" },
  { label: "Low stock", value: "6", hint: "Need restock" },
  { label: "Hidden", value: "8", hint: "Disabled temporarily" },
];

const Products = () => {
  // navigate
  const navigate = useNavigate();
  // products
  const [products, setProducts] = useState([]);
  // user
  const user = useAuthStore((state) => state.user);
  // loader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await GetProductsApi(user.id);
        console.log("responseseee--", response);

        // success
        if (response?.success && response?.data?.length > 0) {
          setProducts(response?.data);
          setLoading(false);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log("Error--", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user.id]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteProductApi(id);
      console.log("response from product---", response);

      // success
      if (response?.success) {
        toast.success(response?.message, {
          description: `${id} deleted successfully`,
        });
      }
    } catch (error) {
      console.log("Error--", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await EditProductApi(id);
      console.log("response from product---", response);

      // success
      if (response?.success) {
        toast.success(response?.message, {
          description: `${id} edited successfully`,
        });
      }
    } catch (error) {
      console.log("Error--", error);
    }
  };

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
          <div className="grid grid-cols-7 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            <div className="">Image</div>
            <div className="col-span-2">Item</div>
            <div>Description</div>
            <div>Price</div>
            <div className="text-right">Created At</div>
            <div className="text-right">Action</div>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : (
              products.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-7 items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <div className="">
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className=" w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                  </div>
                  <div>{shortText(item.description, 30)}</div>
                  <div className="font-semibold text-slate-900">
                    {item.price}
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-end items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex cursor-pointer items-center gap-4 rounded-xl bg-red-400 text-white px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(item.id)}
                      className="inline-flex cursor-pointer items-center gap-4 rounded-xl bg-emerald-400 px-3 py-2 text-sm font-semibold text-white transition focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
