import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  id,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="font-mono text-xs tracking-[0.22em] text-brass uppercase">
          {index ? <span className="mr-3 text-muted-foreground">{index}</span> : null}
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12] tracking-tight text-balance"
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
          {children}
        </div>
      ) : null}
    </div>
  );
}
