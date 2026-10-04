import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

export function CertificationList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {certifications.map((item) => (
        <Reveal key={item.id} className="h-full">
          <HoverLift>
            <article className="flex h-full flex-col border border-border bg-card p-5 transition-colors hover:border-brass/60 sm:p-6">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-8 min-w-8 place-items-center border border-brass/50 px-1.5 font-mono text-[9px] tracking-widest text-brass"
                  aria-hidden="true"
                >
                  IBM
                </span>
                <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">
                  {item.issuer}
                  {item.platform ? ` · ${item.platform}` : ""}
                </p>
              </div>
              <h3 className="mt-4 font-display text-[clamp(1.35rem,2vw,1.7rem)] leading-tight tracking-tight text-balance">
                {item.title}
              </h3>
              {item.courseCount || item.completedLabel ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {[
                    item.courseCount ? `${item.courseCount} courses` : null,
                    item.completedLabel ? `Completed ${item.completedLabel}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
                {item.summary}
              </p>
              {item.areas.length > 0 ? (
                <p className="mt-4 text-sm leading-relaxed">
                  <span className="text-muted-foreground">Skills: </span>
                  {item.areas.join(" · ")}
                </p>
              ) : null}
              {item.document ? (
                <a
                  href={item.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-5 w-fit")}
                >
                  View Certificate
                  <span className="sr-only">, {item.title} (PDF, opens in a new tab)</span>
                </a>
              ) : null}
            </article>
          </HoverLift>
        </Reveal>
      ))}
    </div>
  );
}
