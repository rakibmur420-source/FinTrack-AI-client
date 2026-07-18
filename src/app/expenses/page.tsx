"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Expense, PaginationMeta } from "@/types";
import ExpenseCard from "@/components/ExpenseCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Search } from "lucide-react";

const CATEGORIES = [
  "all", "Food & Dining", "Transportation", "Housing & Utilities", "Shopping",
  "Health & Fitness", "Entertainment", "Education", "Travel", "Bills & Subscriptions", "Other",
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("-date");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["expenses", search, category, sort, page],
    queryFn: async () => {
      const res = await api.get("/expenses", {
        params: { search, category, sort, page, limit: 8 },
      });
      return res.data as { expenses: Expense[]; pagination: PaginationMeta };
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Explore the ledger</h1>
      <p className="mt-2 text-charcoal/60">Every logged expense, searchable and filterable.</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by title or description..."
            className="w-full rounded-full border border-charcoal/15 py-2.5 pl-10 pr-4 outline-none focus:border-ink"
          />
        </div>

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="rounded-full border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
        >
          <option value="-date">Newest date</option>
          <option value="date">Oldest date</option>
          <option value="-amount">Amount: high to low</option>
          <option value="amount">Amount: low to high</option>
        </select>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : data && data.expenses.length > 0
          ? data.expenses.map((e) => <ExpenseCard key={e._id} expense={e} />)
          : <p className="col-span-full text-center text-charcoal/50">No expenses match your search.</p>}
      </div>

      {data && data.pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: data.pagination.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-full text-sm ${
                page === i + 1 ? "bg-ink text-paper" : "border border-charcoal/15 text-charcoal/60"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
