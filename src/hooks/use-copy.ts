"use client";

import { useState } from "react";

export function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), resetMs);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }

  return { copied, copy };
}
