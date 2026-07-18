"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Requires NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local
// and the Google Identity Services script loaded (see below).
declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleLoginButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      if (!window.google || !divRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential: string }) => {
          try {
            await googleLogin(response.credential);
            toast.success("Logged in with Google");
            router.push("/expenses");
          } catch {
            toast.error("Google login failed.");
          }
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [googleLogin, router]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return (
      <p className="text-xs text-charcoal/40">
        Set NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in.
      </p>
    );
  }

  return <div ref={divRef} />;
}
