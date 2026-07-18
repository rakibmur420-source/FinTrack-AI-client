"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Receipt } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/expenses", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/expenses", label: "Explore" },
    { href: "/expenses/add", label: "Add Expense" },
    { href: "/expenses/manage", label: "Manage" },
    { href: "/about", label: "About" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold">
          <Receipt size={22} className="text-gold" />
          FinTrack <span className="text-gold">AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-gold-light ${
                pathname === link.href ? "text-gold" : "text-paper/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <span className="font-data text-xs text-paper/70">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-gold/60 px-4 py-1.5 text-sm text-gold-light hover:bg-gold/10"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-paper/80 hover:text-gold-light">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gold px-4 py-1.5 text-sm font-medium text-ink hover:bg-gold-light"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-paper/10 px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-paper/80">
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={handleLogout} className="text-left text-sm text-gold-light">
                Log out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-paper/80">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="text-sm text-gold-light">
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
