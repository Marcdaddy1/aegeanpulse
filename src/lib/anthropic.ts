import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Shared Claude client — instantiated once, imported by the chatbot route and
// the content-generation pipeline. `server-only` makes accidentally importing
// this from a Client Component a build-time error, not a leaked secret.

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }
  client ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

export const CLAUDE_MODEL = "claude-sonnet-4-5";
