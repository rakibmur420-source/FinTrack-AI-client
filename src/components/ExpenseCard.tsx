import Link from "next/link";
import { Expense } from "@/types";
import { Calendar, Tag } from "lucide-react";

export default function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="h-40 w-full overflow-hidden bg-paper-dim">
        {expense.imageURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={expense.imageURL} alt={expense.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-3xl text-ink/20">
            {expense.category.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-data text-xs uppercase tracking-wide text-mint">{expense.category}</span>
        <h3 className="font-display text-lg font-semibold text-charcoal">{expense.title}</h3>
        <p className="line-clamp-2 flex-1 text-sm text-charcoal/60">{expense.shortDescription}</p>

        <div className="flex items-center justify-between pt-2 text-sm text-charcoal/50">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {new Date(expense.date).toLocaleDateString()}
          </span>
          <span className="font-data font-semibold text-ink">${expense.amount.toFixed(2)}</span>
        </div>

        {expense.aiTags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {expense.aiTags.slice(0, 3).map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded-full bg-mint/10 px-2 py-0.5 text-xs text-mint">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/expenses/${expense._id}`}
          className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-center text-sm font-medium text-paper hover:bg-ink-light"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
