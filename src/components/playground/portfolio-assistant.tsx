"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

const suggestions = [
  "Which AI projects are listed?",
  "What technologies are recorded?",
  "What is the full stack background?",
  "Which certifications are completed?",
  "What roles is this portfolio aimed at?",
];

type AssistantResponse = {
  answer: string;
  mode: "portfolio" | "model";
};

export function PortfolioAssistant({ modelConfigured }: { modelConfigured: boolean }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<AssistantResponse["mode"] | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function ask(nextQuestion: string) {
    const trimmed = nextQuestion.trim();
    if (trimmed.length < 2) {
      setError("Ask a slightly longer question.");
      setAnswer("");
      return;
    }
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = (await response.json()) as AssistantResponse & { error?: string };
      if (!response.ok || !data.answer) {
        setAnswer("");
        setMode(null);
        setError(data.error || "The assistant could not answer just now. The rest of the site is unaffected.");
        return;
      }
      setAnswer(data.answer);
      setMode(data.mode);
    } catch {
      setAnswer("");
      setMode(null);
      setError("The assistant could not answer just now. The rest of the site is unaffected.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="border border-border bg-card p-5 sm:p-7">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(question);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="portfolio-question">Question</Label>
          <Input
            id="portfolio-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about projects, skills, or certifications"
            className="h-11"
            maxLength={500}
          />
        </div>
        <button type="submit" className={cn(buttonVariants({ size: "lg" }))} disabled={pending}>
          {pending ? "Looking through the record…" : "Ask"}
        </button>
      </form>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Suggested questions">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              className="border border-border px-3 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:border-brass/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              onClick={() => {
                setQuestion(suggestion);
                void ask(suggestion);
              }}
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm text-muted-foreground">
        {modelConfigured
          ? "When a model is configured, replies are restricted to the portfolio record."
          : "No AI key is configured. Replies are assembled on the server from the portfolio record."}
      </p>

      <div className="mt-4 min-h-16" aria-live="polite">
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {answer ? (
          <div className="space-y-3 border-t border-border pt-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
              {mode === "model" ? "Model, limited to the portfolio record" : "Portfolio record"}
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-pretty">{answer}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
