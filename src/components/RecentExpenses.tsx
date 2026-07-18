"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Expense } from "@/types";
import ExpenseCard from "./ExpenseCard";
import SkeletonCard from "./SkeletonCard";

export default function RecentExpenses() {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses?limit=4&sort=-createdAt");
      return res.data.expenses as Expense[];
    },
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        : data && data.length > 0
        ? data.map((e) => <ExpenseCard key={e._id} expense={e} />)
        : (
          <p className="col-span-full text-center text-sm text-charcoal/50">
            No entries yet — be the first to log one.
          </p>
        )}
    </div>
  );
}
