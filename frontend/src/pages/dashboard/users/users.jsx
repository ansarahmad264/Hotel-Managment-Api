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
import { useAuthStore } from "@/store/auth.slice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteUsersApi, GetUsersApi } from "@/services/users/user.services";

// Users
const Users = () => {
  // users
  const [users, setUsers] = useState([]);
  // user
  const user = useAuthStore((state) => state.user);
  // loader
  const [loading, setLoading] = useState(false);
  // delete loading state
  const [deletingId, setDeletingId] = useState(null);
  // delete confirmation dialog
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    // fetch users
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await GetUsersApi(user.id);
        console.log("responseseee--", response);

        // success
        if (response?.success && response?.data?.length > 0) {
          setUsers(response?.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.log("Error--", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user.id]);

  // Delete Confirmation Dialog
  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    const { id, name } = deleteConfirm;

    try {
      setDeletingId(id);
      const response = await DeleteUsersApi(id);
      console.log("response from user---", response);

      // success
      if (response?.success) {
        // Instantly update UI by filtering out the deleted user
        setUsers((prevusers) => prevusers.filter((user) => user.id !== id));

        toast.success(response?.message || "user deleted successfully", {
          description: `${name} has been removed`,
        });
      } else {
        toast.error(response?.message || "Failed to delete user");
      }
    } catch (error) {
      console.log("Error--", error);
      toast.error("An error occurred while deleting the user");
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-8 mt-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              users
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              User manager
            </h2>
          </div>
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
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No user found.
              </div>
            ) : (
              users.map((item) => (
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
    </div>
  );
};

export default Users;
