"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/expenses");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    try {
      await demoLogin();
      toast.success("Logged in with demo account");
      router.push("/expenses");
    } catch {
      setError("Demo login failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Log in</h1>
      <p className="mt-2 text-sm text-charcoal/60">Welcome back to your ledger.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-rose">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-ink-light disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <button
        onClick={handleDemo}
        disabled={loading}
        className="mt-3 rounded-full border border-gold text-gold-light px-6 py-3 text-sm font-medium hover:bg-gold/5 disabled:opacity-50"
      >
        Try demo account
      </button>

      <div className="mt-4 flex justify-center">
        <GoogleLoginButton />
      </div>

      <p className="mt-6 text-center text-sm text-charcoal/60">
        No account yet?{" "}
        <Link href="/register" className="font-medium text-ink underline underline-offset-4">
          Register
        </Link>
      </p>
    </div>
  );
}
