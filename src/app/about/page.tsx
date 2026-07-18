export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">About FinTrack AI</h1>
      <p className="mt-4 text-charcoal/70">
        FinTrack AI was built as an agentic AI project for SCIC-13 Assignment 5. It pairs a
        traditional expense ledger with two AI agents: one that reads each entry and classifies
        it automatically, and one that analyzes your full spending history to surface trends,
        risks, and recommendations.
      </p>
      <p className="mt-4 text-charcoal/70">
        The goal isn&apos;t to replace your judgment — every AI suggestion stays fully editable —
        but to remove the tedious part of bookkeeping so the data can actually tell you something.
      </p>
    </div>
  );
}
