"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created!");
      router.push("/expenses");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Create your account</h1>
      <p className="mt-2 text-sm text-charcoal/60">Start letting AI read your ledger.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-charcoal">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="Rakib Hasan"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-ink"
            placeholder="At least 6 characters"
          />
        </div>

        {error && <p className="text-sm text-rose">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-ink-light disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-ink underline underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}
