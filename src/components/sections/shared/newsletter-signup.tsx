"use client";

import { useRef, useState, type ReactNode } from "react";
import { Send, Check, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Newsletter opt-in. UK GDPR by design: consent checkbox is unchecked by
// default, copy states what they're signing up for, and the privacy policy
// is linked. The API refuses submissions without consent:true.
//
// The button stays enabled: a greyed-out Subscribe with no reason read as
// broken. Submitting says exactly what's missing, directly under the field
// it's about (so a phone keyboard opening on that field doesn't hide it),
// and announces it to screen readers.
//
// With `download`, the sign-up also delivers a file (an article's lead
// magnet). If the server fails, the reader still gets the file: our outage
// shouldn't cost them what they were promised.
//
// With `preview`, a picture of that file sits in the block's layout:
// - phones: heading, then the picture beside the description, then the form,
//   so the block opens on its meaning rather than on an image;
// - wider screens: the picture runs down the left of the whole block.
// The heading and picture stay after sign-up, so the section keeps its name.

type Problem = "email" | "consent" | null;

// Grid placement shared by the form and the success state.
const GRID = "grid grid-cols-[5.5rem_1fr] gap-x-4 sm:grid-cols-[10rem_1fr] sm:gap-x-8";
const AT = {
  title: "col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1",
  picture: "col-start-1 row-start-2 sm:row-span-3 sm:row-start-1",
  desc: "col-start-2 row-start-2 self-center sm:row-start-2 sm:self-auto",
  body: "col-span-2 row-start-3 sm:col-span-1 sm:col-start-2",
};

export function NewsletterSignup({
  source = "site",
  title = "Practical AI insights, by email",
  titleAs: Title = "p",
  description = "New guides and real-world AI workflows for small businesses. No spam, unsubscribe anytime.",
  download,
  preview,
  afterDownload,
}: {
  source?: string;
  /** Override the pitch where the page gives it a more specific reason to subscribe. */
  title?: string;
  /** A heading where the block is a section of the page, so heading navigation reaches it. */
  titleAs?: "p" | "h2" | "h3";
  description?: string;
  /** A file delivered on sign-up. */
  download?: { href: string; label: string };
  /** A picture of the file, shown before sign-up. */
  preview?: { src: string; alt: string; width: number; height: number };
  /** Shown under the download link: what's in the file, and a next step. */
  afterDownload?: ReactNode;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [problem, setProblem] = useState<Problem>(null);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const id = `newsletter-${source}`;
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const grid = Boolean(preview);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "pending") return;
    // Focus goes to the control that needs fixing, so keyboard and
    // screen-reader users land on it rather than staying on the button.
    if (!emailOk) {
      setProblem("email");
      emailRef.current?.focus();
      return;
    }
    if (!consent) {
      setProblem("consent");
      consentRef.current?.focus();
      return;
    }
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

  // As a section heading it takes the page's section size, so it doesn't
  // read as smaller than the "Keep reading" heading after it.
  const heading = (
    <Title
      id={`${id}-title`}
      className={cn(
        "text-balance font-display font-semibold text-foreground",
        Title === "p" ? "text-lg" : "text-2xl tracking-tight",
        grid && AT.title,
      )}
    >
      {title}
    </Title>
  );

  // The file itself: a printed sheet, white, slightly askew.
  const picture = preview && (
    <Image
      src={preview.src}
      alt={preview.alt}
      width={preview.width}
      height={preview.height}
      sizes="(max-width: 640px) 88px, 160px"
      className={cn(
        "mt-4 w-full -rotate-[1.5deg] rounded-[3px] border border-border bg-white shadow-[0_8px_20px_-10px_rgba(28,35,33,0.35)] sm:mt-1 sm:rounded-[4px]",
        AT.picture,
      )}
    />
  );

  const downloadLink = download && (
    <a
      href={download.href}
      download
      className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-strong"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {download.label}
    </a>
  );

  if (state === "done") {
    const confirm = (
      <p className={cn("flex items-center gap-2.5 text-sm text-foreground", grid ? cn("mt-4", AT.desc) : "")}>
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        {download
          ? "You're on the list. Here's your copy:"
          : "You're on the list. New guides will come straight to your inbox."}
      </p>
    );
    return (
      <div role="status" className={cn(grid && GRID)}>
        {heading}
        {picture}
        {confirm}
        {(downloadLink || afterDownload) && (
          <div className={cn(grid && AT.body)}>
            {downloadLink}
            {afterDownload}
          </div>
        )}
      </div>
    );
  }

  const fieldError = (which: Problem, text: string) => (
    <p id={`${id}-${which}-error`} role="alert" className="mt-1.5 text-sm text-danger empty:hidden">
      {problem === which ? text : ""}
    </p>
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${id}-title`}
      className={cn(grid && GRID)}
    >
      {heading}
      {picture}
      <p
        className={cn(
          "max-w-[60ch] text-sm text-muted",
          Title === "p" ? "mt-1" : "mt-2",
          grid && cn("mt-4 sm:mt-2", AT.desc),
        )}
      >
        {description}
      </p>
      {/* Email, then consent, then Subscribe: the order a person fills it in,
          so the natural flow never hits the consent error. */}
      <div className={cn(grid && AT.body)}>
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          ref={emailRef}
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
          aria-describedby={problem === "email" ? `${id}-email-error` : undefined}
          className="mt-4 block min-h-11 w-full max-w-md rounded-full border border-input bg-background px-5 py-2.5 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:border-danger aria-[invalid=true]:focus:ring-danger/30 sm:text-sm"
        />
        {fieldError("email", "Enter your email address, e.g. you@company.com.")}
        <label className="mt-2 flex max-w-md items-start gap-2.5 py-1 text-xs leading-relaxed text-muted">
          {/* Drawn rather than native: WebKit kept the native box white in dark mode. */}
          <span className="relative mt-px inline-flex h-[1.125rem] w-[1.125rem] shrink-0">
            <input
              ref={consentRef}
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (problem === "consent") setProblem(null);
              }}
              aria-invalid={problem === "consent" || undefined}
              aria-describedby={problem === "consent" ? `${id}-consent-error` : undefined}
              className="peer h-full w-full cursor-pointer appearance-none rounded border border-input bg-background transition-colors checked:border-accent checked:bg-accent aria-[invalid=true]:border-danger aria-[invalid=true]:outline aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-offset-2 aria-[invalid=true]:outline-danger"
            />
            <Check
              className="pointer-events-none absolute inset-0 m-auto hidden h-3 w-3 text-accent-foreground peer-checked:block"
              strokeWidth={3}
              aria-hidden="true"
            />
          </span>
          <span>
            I agree to receive marketing emails from AegeanPulse. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {fieldError("consent", "Tick the box above to agree, so we can email you.")}
        <button
          type="submit"
          disabled={state === "pending"}
          className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60"
        >
          {state === "pending" ? "Subscribing…" : download ? "Subscribe and download" : "Subscribe"}
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        {/* Server errors belong to the form as a whole, so they sit under the button. */}
        <p role="alert" className="mt-2 text-sm text-danger empty:hidden">
          {state === "error" ? error : ""}
        </p>
        {state === "error" && download && (
          <div className="mt-1">
            <p className="text-sm text-muted">Your copy is ready anyway:</p>
            {downloadLink}
            {afterDownload}
          </div>
        )}
      </div>
    </form>
  );
}
