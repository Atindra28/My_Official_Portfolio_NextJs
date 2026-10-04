import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/types";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
      {items.map((item, index) => (
        <li key={item.id} className="relative">
          <span
            className="absolute top-1.5 -left-[1.85rem] size-2.5 rounded-full border border-brass bg-background sm:-left-[2.35rem]"
            aria-hidden="true"
          />
          <Reveal delay={index * 0.05}>
            <p className="font-mono text-xs tracking-[0.16em] text-brass uppercase">
              {item.start} — {item.end}
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-tight">{item.organization}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
            <p className="mt-4 text-base leading-relaxed text-pretty">{item.summary}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Project: <span className="text-foreground">{item.project}</span>
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
              {item.technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="outline">{technology}</Badge>
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
            {item.note ? <p className="mt-4 text-sm text-muted-foreground">{item.note}</p> : null}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
