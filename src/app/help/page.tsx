export default function HelpPage() {
  const faqs = [
    { q: "How do I add an expense?", a: "Log in, then go to Add Expense from the navbar and fill in the form." },
    { q: "How does auto-classification work?", a: "Click 'Auto-classify with AI' on the add form, or use 'Bulk auto-classify' on the Manage page." },
    { q: "What does the Data Analyzer need?", a: "It uses your logged expenses by default, or you can upload a CSV with title, amount, date, category columns." },
  ];
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Help center</h1>
      <div className="mt-8 space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-charcoal/10 p-5">
            <h3 className="font-medium text-charcoal">{f.q}</h3>
            <p className="mt-1 text-sm text-charcoal/60">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
