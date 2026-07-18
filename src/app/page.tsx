import Link from "next/link";
import { Sparkles, Tags, LineChart, ShieldCheck, ArrowRight } from "lucide-react";
import RecentExpenses from "@/components/RecentExpenses";

const tapeItems = [
  { title: "Coffee & Co.", amount: "$4.50", tag: "food & dining" },
  { title: "Uber ride — airport", amount: "$18.20", tag: "transportation" },
  { title: "Adobe Creative Cloud", amount: "$52.99", tag: "bills & subscriptions" },
  { title: "Whole Foods Market", amount: "$63.10", tag: "food & dining" },
  { title: "Gym membership", amount: "$30.00", tag: "health & fitness" },
  { title: "Amazon — desk lamp", amount: "$24.99", tag: "shopping" },
];

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative flex min-h-[65vh] flex-col justify-center overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
          <div>
            <span className="font-data text-xs uppercase tracking-widest text-gold">Agentic AI · Expense Ledger</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Every line item, <span className="text-gold">read and tagged</span> by AI.
            </h1>
            <p className="mt-5 max-w-md text-paper/70">
              Log an expense and FinTrack AI classifies it, tags it, and folds it into a live
              analysis of where your money actually goes — no spreadsheets required.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register" className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold-light">
                Start tracking <ArrowRight size={16} />
              </Link>
              <Link href="/expenses" className="rounded-full border border-paper/30 px-6 py-3 text-sm hover:bg-paper/5">
                Explore the ledger
              </Link>
            </div>
          </div>

          {/* Signature element: scrolling ledger tape with AI tags */}
          <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-ink-light/40 p-4">
            <div className="flex gap-4 ledger-tape" style={{ width: "200%" }}>
              {[...tapeItems, ...tapeItems].map((item, i) => (
                <div key={i} className="flex w-64 shrink-0 flex-col gap-2 rounded-xl bg-paper/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-paper/90">{item.title}</span>
                    <span className="font-data text-sm text-gold-light">{item.amount}</span>
                  </div>
                  <span className="w-fit rounded-full bg-mint/15 px-2 py-0.5 font-data text-[10px] text-mint">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-3xl font-semibold text-charcoal">Two agents, one ledger</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-charcoal/10 p-8">
            <Tags className="text-mint" size={28} />
            <h3 className="mt-4 font-display text-xl font-semibold">Auto-Classification & Tagging</h3>
            <p className="mt-2 text-charcoal/60">
              Every new entry is read by the model, sorted into a category, and given editable
              tags — individually or in bulk across your whole ledger.
            </p>
          </div>
          <div className="rounded-2xl border border-charcoal/10 p-8">
            <LineChart className="text-gold" size={28} />
            <h3 className="mt-4 font-display text-xl font-semibold">AI Data Analyzer</h3>
            <p className="mt-2 text-charcoal/60">
              Upload a CSV or point it at your own history — get a trend summary, top-category
              breakdown, risk flags, and KPIs you can download.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="bg-paper-dim py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl font-semibold text-charcoal">How the ledger works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { step: "Log it", body: "Add a title, description, amount, and date — takes seconds." },
              { step: "AI reads it", body: "The model assigns a category and tags automatically." },
              { step: "See the pattern", body: "The analyzer turns entries into trends and KPIs." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{s.step}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENT ENTRIES (live data) */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-semibold text-charcoal">Recently logged</h2>
          <Link href="/expenses" className="text-sm text-ink underline underline-offset-4">See all</Link>
        </div>
        <div className="mt-10">
          <RecentExpenses />
        </div>
      </section>

      {/* 5. STATS / HIGHLIGHTS */}
      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-3">
          {[
            { n: "2", l: "AI agents working on your data" },
            { n: "<1s", l: "Typical classification time" },
            { n: "100%", l: "Editable AI suggestions" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl font-semibold text-gold">{s.n}</div>
              <p className="mt-2 text-sm text-paper/60">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-3xl font-semibold text-charcoal">What early users say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { q: "I stopped manually categorizing expenses the day I found this.", n: "— Freelance designer" },
            { q: "The analyzer caught a subscription I'd forgotten about.", n: "— Small business owner" },
            { q: "Bulk tagging saved me an afternoon of spreadsheet work.", n: "— Grad student" },
          ].map((t) => (
            <div key={t.n} className="rounded-2xl border border-charcoal/10 p-6">
              <Sparkles className="text-gold" size={20} />
              <p className="mt-3 text-charcoal/70">&ldquo;{t.q}&rdquo;</p>
              <p className="mt-3 font-data text-xs text-charcoal/40">{t.n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-paper-dim py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl font-semibold text-charcoal">Frequently asked</h2>
          <div className="mt-8 space-y-4">
            {[
              { q: "Is my financial data private?", a: "Your entries are tied to your account and only public listing data is visible to others." },
              { q: "Which AI model powers this?", a: "FinTrack AI uses Groq-hosted open models for fast classification and analysis." },
              { q: "Can I edit AI-generated tags?", a: "Yes — every tag and category suggestion is fully editable after generation." },
            ].map((f) => (
              <details key={f.q} className="rounded-xl bg-white p-5">
                <summary className="cursor-pointer font-medium text-charcoal">{f.q}</summary>
                <p className="mt-2 text-sm text-charcoal/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 text-center">
        <ShieldCheck className="mx-auto text-mint" size={32} />
        <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal">Start your ledger today</h2>
        <p className="mx-auto mt-3 max-w-md text-charcoal/60">
          Free to try with a demo account — no card required.
        </p>
        <Link href="/register" className="mt-6 inline-block rounded-full bg-ink px-8 py-3 text-sm font-medium text-paper hover:bg-ink-light">
          Create your account
        </Link>
      </section>
    </>
  );
}
