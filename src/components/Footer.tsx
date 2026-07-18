import Link from "next/link";
import { Receipt, GitFork, Link2, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-paper">
            <Receipt size={20} className="text-gold" />
            FinTrack AI
          </div>
          <p className="mt-3 max-w-xs text-sm text-paper/60">
            An AI ledger that reads every line item and tells you what it means.
          </p>
        </div>

        <div>
          <h4 className="font-data text-xs uppercase tracking-wider text-gold">Product</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/expenses" className="hover:text-gold-light">Explore expenses</Link></li>
            <li><Link href="/expenses/add" className="hover:text-gold-light">Add an expense</Link></li>
            <li><Link href="/about" className="hover:text-gold-light">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-data text-xs uppercase tracking-wider text-gold">Support</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-gold-light">Contact us</Link></li>
            <li><Link href="/help" className="hover:text-gold-light">Help center</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-light">Privacy & terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-data text-xs uppercase tracking-wider text-gold">Get in touch</h4>
          <p className="mt-4 flex items-center gap-2 text-sm">
            <Mail size={16} /> hello@fintrack.ai
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" aria-label="GitHub" className="hover:text-gold-light"><GitFork size={18} /></a>
            <a href="#" aria-label="Social link" className="hover:text-gold-light"><Link2 size={18} /></a>
            <a href="#" aria-label="External site" className="hover:text-gold-light"><ExternalLink size={18} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} FinTrack AI. Built for SCIC-13 Assignment 5.
      </div>
    </footer>
  );
}
