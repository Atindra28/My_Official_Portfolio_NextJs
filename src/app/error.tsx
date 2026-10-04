"use client";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24">
      <p className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Error</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">This view failed to load.</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        The page hit an unexpected error. You can try again, or return home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => reset()} className={cn(buttonVariants({ size: "lg" }))}>
          Try again
        </button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          Go home
        </Link>
      </div>
    </Container>
  );
}
