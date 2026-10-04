import { Container } from "@/components/layout/container";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border">
      <Container className="py-14 sm:py-20">
        <p className="font-mono text-xs tracking-[0.22em] text-brass uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-balance">
          {title}
        </h1>
        {children ? (
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
