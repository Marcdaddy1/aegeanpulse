"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/data/site";

// No backend at launch: the form composes a prefilled email. Swap FORM_ENDPOINT
// for a Formspree/Web3Forms URL + fetch() to enable server submission later.
const FORM_ENDPOINT: string | null = null;

const TOPICS = [
  "Consultation",
  "Partnership",
  "Tool submission",
  "General enquiry",
];

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const valid =
    name.trim() !== "" && /^\S+@\S+\.\S+$/.test(email) && message.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    if (FORM_ENDPOINT) {
      // Placeholder for future server submission.
      return;
    }

    const subject = `[${topic}] enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Topic: ${topic}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="topic"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          How can we help?
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={
                topic === t
                  ? "rounded-full border border-accent bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-strong"
                  : "rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
          />
          {touched && name.trim() === "" && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              Please enter your name.
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
            autoComplete="email"
          />
          {touched && !/^\S+@\S+\.\S+$/.test(email) && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              Please enter a valid email.
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Company <span className="text-muted">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          placeholder="Your business"
          autoComplete="organization"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={inputClass}
          placeholder="Tell us a little about your business and what you'd like to achieve with AI."
        />
        {touched && message.trim() === "" && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            Please add a short message.
          </p>
        )}
      </div>

      <button type="submit" className={buttonClasses({ size: "lg" })}>
        Send message
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="text-sm text-muted">
        This opens your email app with the details prefilled. Prefer to talk?
        Use the booking button to grab a time directly.
      </p>
    </form>
  );
}
