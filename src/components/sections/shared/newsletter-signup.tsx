"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import Link from "next/link";

// Newsletter opt-in. UK GDPR by design: consent checkbox is unchecked by
// default, copy states what they're signing up for, and the privacy policy
// is linked. The API refuses submissions without consent:true.

export function NewsletterSignup({ source = "site" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const valid = /^\S+@\S+\.\S+$/.test(email) && consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || state === "pending") return;
    setState("pending");
    setError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Couldn't reach the server — please try again.");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent-soft/40 p-5">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-sm text-foreground">
          You&apos;re on the list — practical AI insights, straight to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="font-display text-lg font-semibold text-foreground">
        Practical AI insights, monthly
      </p>
      <p className="mt-1 text-sm text-muted">
        New guides and real-world AI workflows for small businesses. No spam,
        unsubscribe anytime.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          className="flex-1 rounded-full border border-border bg-background px-5 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
        <button
          type="submit"
          disabled={!valid || state === "pending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-50"
        >
          {state === "pending" ? "Subscribing…" : "Subscribe"}
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          I agree to receive marketing emails from AegeanPulse. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}
