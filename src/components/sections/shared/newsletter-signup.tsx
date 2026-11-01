"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import Link from "next/link";

// Newsletter opt-in. UK GDPR by design: consent checkbox is unchecked by
// default, copy states what they're signing up for, and the privacy policy
// is linked. The API refuses submissions without consent:true.
//
// The button stays enabled: a greyed-out Subscribe with no reason read as
// broken. Submitting says exactly what's missing, next to the field it's
// about, and announces it to screen readers.

type Problem = "email" | "consent" | null;

export function NewsletterSignup({
  source = "site",
  title = "Practical AI insights, by email",
  description = "New guides and real-world AI workflows for small businesses. No spam, unsubscribe anytime.",
}: {
  source?: string;
  /** Override the pitch where the page gives it a more specific reason to subscribe. */
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [problem, setProblem] = useState<Problem>(null);
  const [error, setError] = useState<string | null>(null);

  const id = `newsletter-${source}`;
  const emailOk = /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "pending") return;
    if (!emailOk) return setProblem("email");
    if (!consent) return setProblem("consent");
    setProblem(null);
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
        setError(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl border border-border bg-accent-soft/40 p-5"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-sm text-foreground">
          You&apos;re on the list. New guides will come straight to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="font-display text-lg font-semibold text-foreground">
        {title}
      </p>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (problem === "email") setProblem(null);
          }}
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={problem === "email" || undefined}
          aria-describedby={problem === "email" ? `${id}-problem` : undefined}
          className="flex-1 rounded-full border border-border bg-background px-5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-danger"
        />
        <button
          type="submit"
          disabled={state === "pending"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60"
        >
          {state === "pending" ? "Subscribing…" : "Subscribe"}
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2.5 py-1 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (problem === "consent") setProblem(null);
          }}
          aria-invalid={problem === "consent" || undefined}
          aria-describedby={problem === "consent" ? `${id}-problem` : undefined}
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
      {/* One live region for every message, so validation and server errors
          are both announced. */}
      <p id={`${id}-problem`} role="alert" className="mt-2 text-sm text-danger empty:hidden">
        {problem === "email"
          ? "Enter your email address, e.g. you@company.com."
          : problem === "consent"
            ? "Tick the box above so we can email you."
            : error}
      </p>
    </form>
  );
}
