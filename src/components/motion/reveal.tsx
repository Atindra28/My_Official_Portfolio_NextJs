import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  return (
    <div
      className={cn(immediate ? "rise" : "rise-inview", className)}
      style={immediate ? { animationDelay: `${delay}s` } : undefined}
      data-reveal=""
    >
      {children}
    </div>
  );
}
