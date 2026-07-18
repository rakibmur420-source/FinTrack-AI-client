"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AiAnalyzer from "@/components/AiAnalyzer";
import { api } from "@/lib/api";
import { Expense } from "@/types";
import { Trash2, Eye, Sparkles } from "lucide-react";

function ManageContent() {
  const queryClient = useQueryClient();
  const [bulkLoading, setBulkLoading] = useState(false);

  const { data: expenses, isLoading } = useQuery({
    queryKey: ["my-expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses/mine");
      return res.data as Expense[];
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense entry?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Deleted.");
      queryClient.invalidateQueries({ queryKey: ["my-expenses"] });
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const handleBulkClassify = async () => {
    setBulkLoading(true);
    try {
      const { data } = await api.post("/ai/classify/bulk");
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["my-expenses"] });
    } catch {
      toast.error("Bulk classification failed.");
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal">Manage your expenses</h1>
          <p className="mt-2 text-charcoal/60">View, tag, and remove your logged entries.</p>
        </div>
        <button
          onClick={handleBulkClassify}
          disabled={bulkLoading}
          className="flex items-center gap-2 rounded-full border border-mint px-4 py-2 text-sm text-mint hover:bg-mint/5 disabled:opacity-50"
        >
          <Sparkles size={16} /> {bulkLoading ? "Classifying..." : "Bulk auto-classify"}
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-charcoal/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-dim text-charcoal/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-charcoal/40">Loading...</td></tr>
            ) : expenses && expenses.length > 0 ? (
              expenses.map((e) => (
                <tr key={e._id} className="border-t border-charcoal/10">
                  <td className="px-4 py-3 font-medium text-charcoal">{e.title}</td>
                  <td className="px-4 py-3 text-charcoal/60">{e.category}</td>
                  <td className="px-4 py-3 font-data">${e.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-charcoal/60">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/expenses/${e._id}`} className="text-ink hover:text-gold" title="View">
                        <Eye size={16} />
                      </Link>
                      <button onClick={() => handleDelete(e._id)} className="text-rose hover:opacity-70" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-charcoal/40">No expenses logged yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <AiAnalyzer />
      </div>
    </div>
  );
}

export default function ManagePage() {
  return (
    <ProtectedRoute>
      <ManageContent />
    </ProtectedRoute>
  );
}
