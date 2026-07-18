"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";
import { Sparkles } from "lucide-react";

const CATEGORIES = [
  "Food & Dining", "Transportation", "Housing & Utilities", "Shopping",
  "Health & Fitness", "Entertainment", "Education", "Travel", "Bills & Subscriptions", "Other",
];

function AddExpenseForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", shortDescription: "", fullDescription: "",
    amount: "", date: "", category: "Other", imageURL: "",
  });
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [classifying, setClassifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleClassify = async () => {
    if (!form.title) {
      toast.error("Add a title first so AI has something to read.");
      return;
    }
    setClassifying(true);
    try {
      const { data } = await api.post("/ai/classify", {
        title: form.title,
        shortDescription: form.shortDescription,
      });
      update("category", data.category);
      setAiTags(data.tags || []);
      toast.success("AI suggested a category and tags below.");
    } catch {
      toast.error("AI classification failed — you can still pick a category manually.");
    } finally {
      setClassifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { title, shortDescription, fullDescription, amount, date, category } = form;
    if (!title || !shortDescription || !fullDescription || !amount || !date || !category) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/expenses", { ...form, amount: Number(form.amount), aiTags });
      toast.success("Expense added!");
      router.push("/expenses/manage");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add expense.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Log a new expense</h1>
      <p className="mt-2 text-charcoal/60">Fill in the details — AI can suggest the category and tags for you.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-charcoal">Title *</label>
          <input value={form.title} onChange={(e) => update("title", e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="e.g. Uber ride to airport" />
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal">Short description *</label>
          <input value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="One line summary" />
        </div>

        <button
          type="button"
          onClick={handleClassify}
          disabled={classifying}
          className="flex w-fit items-center gap-2 rounded-full border border-mint px-4 py-2 text-sm text-mint hover:bg-mint/5 disabled:opacity-50"
        >
          <Sparkles size={16} /> {classifying ? "Reading with AI..." : "Auto-classify with AI"}
        </button>

        {aiTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {aiTags.map((tag) => (
              <span key={tag} className="rounded-full bg-mint/10 px-3 py-1 text-xs text-mint">{tag}</span>
            ))}
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-charcoal">Full description *</label>
          <textarea value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="Full details about this expense" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-charcoal">Amount ($) *</label>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => update("amount", e.target.value)}
              className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal">Date *</label>
            <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)}
              className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal">Category *</label>
          <select value={form.category} onChange={(e) => update("category", e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal">Image URL (optional)</label>
          <input value={form.imageURL} onChange={(e) => update("imageURL", e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="https://..." />
        </div>

        {error && <p className="text-sm text-rose">{error}</p>}

        <button type="submit" disabled={submitting}
          className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground hover:bg-ink-light disabled:opacity-50">
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default function AddExpensePage() {
  return (
    <ProtectedRoute>
      <AddExpenseForm />
    </ProtectedRoute>
  );
}
