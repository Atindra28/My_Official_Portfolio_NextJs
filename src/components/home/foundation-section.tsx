import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { foundationColumns, foundationMessage } from "@/data/skills";

export function FoundationSection() {
  return (
    <section className="border-b border-border py-16 sm:py-24" aria-labelledby="foundation-heading">
      <Container>
        <SectionHeading
          id="foundation-heading"
          index="04"
          eyebrow="Full stack foundation"
          title={foundationMessage}
        >
          The application layer is the point: an interface, an API, and a data store that a model can sit inside.
        </SectionHeading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {foundationColumns.map((column, index) => (
            <Reveal key={column.title} delay={index * 0.05}>
              <div>
                <h3 className="font-mono text-xs tracking-[0.18em] text-brass uppercase">{column.title}</h3>
                <ul className="mt-4 space-y-2">
                  {column.items.map((item) => (
                    <li key={item} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
