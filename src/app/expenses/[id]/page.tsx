"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Expense, User } from "@/types";
import { Calendar, Tag, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ExpenseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: expense, isLoading, error } = useQuery({
    queryKey: ["expense", id],
    queryFn: async () => {
      const res = await api.get(`/expenses/${id}`);
      return res.data as Expense;
    },
  });

  if (isLoading) {
    return <div className="mx-auto max-w-4xl px-5 py-20 text-center text-charcoal/50">Loading...</div>;
  }

  if (error || !expense) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-20 text-center">
        <p className="text-charcoal/60">This expense entry could not be found.</p>
        <Link href="/expenses" className="mt-4 inline-block text-ink underline underline-offset-4">
          Back to explore
        </Link>
      </div>
    );
  }

  const owner = expense.owner as User;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Link href="/expenses" className="flex items-center gap-1 text-sm text-charcoal/60 hover:text-ink">
        <ArrowLeft size={16} /> Back to explore
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border border-charcoal/10">
        <div className="h-64 w-full bg-paper-dim">
          {expense.imageURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={expense.imageURL} alt={expense.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-6xl text-ink/15">
              {expense.category.charAt(0)}
            </div>
          )}
        </div>

        <div className="p-8">
          <span className="font-data text-xs uppercase tracking-wide text-mint">{expense.category}</span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal">{expense.title}</h1>
          <p className="mt-2 text-charcoal/60">{expense.shortDescription}</p>

          <div className="mt-6 flex flex-wrap gap-6 border-y border-charcoal/10 py-4 text-sm text-charcoal/60">
            <span className="flex items-center gap-2"><DollarSign size={16} /> ${expense.amount.toFixed(2)}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(expense.date).toLocaleDateString()}</span>
            {typeof expense.owner !== "string" && owner?.name && (
              <span>Logged by {owner.name}</span>
            )}
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">Overview</h2>
            <p className="mt-2 whitespace-pre-line text-charcoal/70">{expense.fullDescription}</p>
          </div>

          {expense.aiTags?.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-charcoal">AI Tags</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {expense.aiTags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded-full bg-mint/10 px-3 py-1 text-xs text-mint">
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
