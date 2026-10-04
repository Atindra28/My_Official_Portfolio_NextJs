"use client";

import { useCopy } from "@/hooks/use-copy";

export function CopyLink({ value, label }: { value: string; label: string }) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => void copy(value)}
      className="link-underline text-sm"
      aria-live="polite"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
