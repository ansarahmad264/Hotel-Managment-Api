import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { shortText } from "@/lib/utils";
import {
  DeleteProductApi,
  UpdateProductApi,
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
  // delete loading state
  const [deletingId, setDeletingId] = useState(null);
  // delete confirmation dialog
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // edit dialog
  const [editDialog, setEditDialog] = useState(null);
  // edit form data
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  // edit submitting
  const [editSubmitting, setEditSubmitting] = useState(false);

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
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log("Error--", error);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user.id]);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    const { id, name } = deleteConfirm;

    try {
      setDeletingId(id);
      const response = await DeleteProductApi(id);
      console.log("response from product---", response);

      // success
      if (response?.success) {
        // Instantly update UI by filtering out the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );

        toast.success(response?.message || "Product deleted successfully", {
          description: `${name} has been removed`,
        });
      } else {
        toast.error(response?.message || "Failed to delete product");
      }
    } catch (error) {
      console.log("Error--", error);
      toast.error("An error occurred while deleting the product");
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  const handleEditOpen = (product) => {
    setEditDialog(product);
    setEditFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      imageUrl: product.imageUrl || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editDialog) return;

    // Validation
    if (!editFormData.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!editFormData.price || parseFloat(editFormData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      setEditSubmitting(true);
      const response = await UpdateProductApi(editDialog.id, {
        ...editFormData,
        price: parseFloat(editFormData.price),
        userId: user.id,
      });

      console.log("Update response:", response);

      if (response?.success) {
        // Instantly update UI
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editDialog.id
              ? {
                  ...product,
                  ...editFormData,
                  price: parseFloat(editFormData.price),
                }
              : product
          )
        );

        toast.success(response?.message || "Product updated successfully");
        setEditDialog(null);
        setEditFormData({
          name: "",
          description: "",
          price: "",
          imageUrl: "",
        });
      } else {
        toast.error(response?.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
    } finally {
      setEditSubmitting(false);
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
              Manage your menu items, pricing, and inventory.
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
              <div className="p-8 text-center text-slate-500">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No products found. Add your first product to get started.
              </div>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-7 items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <div className="">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                  </div>
                  <div>{shortText(item.description, 30)}</div>
                  <div className="font-semibold text-slate-900">
                    ${item.price}
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-end items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({ id: item.id, name: item.name })
                      }
                      disabled={deletingId === item.id}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-red-500 text-white px-3 py-2 text-sm font-semibold transition hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditOpen(item)}
                      disabled={deletingId === item.id}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-slate-900">
                "{deleteConfirm?.name}"
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name *</Label>
              <Input
                id="edit-name"
                name="name"
                type="text"
                value={editFormData.name}
                onChange={handleEditChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Price *</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={editFormData.price}
                onChange={handleEditChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                name="imageUrl"
                type="url"
                value={editFormData.imageUrl}
                onChange={handleEditChange}
                placeholder="https://example.com/image.jpg"
              />
              {editFormData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={editFormData.imageUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-lg object-cover border border-slate-200"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialog(null)}
                disabled={editSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={editSubmitting}
                className="bg-slate-900 hover:bg-slate-700"
              >
                {editSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
