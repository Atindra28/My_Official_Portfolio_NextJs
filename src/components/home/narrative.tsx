import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

export function Narrative() {
  return (
    <section className="border-b border-border py-16 sm:py-24" aria-labelledby="intro-heading">
      <Container>
        <SectionHeading id="intro-heading" index="01" eyebrow="Introduction" title="A deliberate path into AI engineering.">
          Full stack first, then generative AI, then products that need both. The sections below keep certification, employment, and project titles separate.
        </SectionHeading>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
          {profile.story.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06} className="bg-background">
              <article className="h-full p-6 sm:p-7">
                <p className="font-mono text-xs text-brass">0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
