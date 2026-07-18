export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Privacy & terms</h1>
      <p className="mt-4 text-charcoal/70">
        Expense entries you log are tied to your account. Publicly listed expenses (title,
        amount, category) are visible on the Explore page; full descriptions and AI tags are
        shown on the details page for any entry, consistent with this being a public ledger demo.
      </p>
      <p className="mt-4 text-charcoal/70">
        This project is a student assignment and not a production financial product — don&apos;t
        log real sensitive financial account details here.
      </p>
    </div>
  );
}
