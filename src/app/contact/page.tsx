"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2">
      <div>
        <h1 className="font-display text-3xl font-semibold text-charcoal">Get in touch</h1>
        <p className="mt-3 text-charcoal/60">Questions about the project or a bug to report? Reach out.</p>

        <div className="mt-8 space-y-4 text-sm text-charcoal/70">
          <p className="flex items-center gap-3"><Mail size={18} className="text-gold" /> hello@fintrack.ai</p>
          <p className="flex items-center gap-3"><Phone size={18} className="text-gold" /> +880 1XXX-XXXXXX</p>
          <p className="flex items-center gap-3"><MapPin size={18} className="text-gold" /> Dhaka, Bangladesh</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name" className="rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Your email" className="rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink" />
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5} placeholder="Your message" className="rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink" />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground hover:bg-ink-light">
          Send message
        </button>
      </form>
    </div>
  );
}
