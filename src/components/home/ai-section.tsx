import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import Link from "next/link";

export function AiSection() {
  const certificate = certifications.find((item) => item.prominent);
  const aiProjects = projects.filter((project) => project.category === "AI");
  const role = experience[0];

  return (
    <section className="border-b border-border py-16 sm:py-24" aria-labelledby="ai-heading">
      <Container>
        <SectionHeading
          id="ai-heading"
          index="03"
          eyebrow="AI engineering"
          title="Capability, separated by evidence."
        >
          Knowledge, projects, certifications, and employment are not the same claim. Read them as three different records.
        </SectionHeading>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <article className="h-full border border-brass/40 bg-card p-6">
              <h3 className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Certified study</h3>
              {certificate ? (
                <>
                  <p className="mt-4 font-display text-2xl leading-tight tracking-tight">
                    {certificate.title}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {certificate.courseCount} courses · {certificate.completedLabel}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{certificate.summary}</p>
                  <Link href="/certifications" className="link-underline mt-5 inline-block text-sm">
                    View certifications
                  </Link>
                </>
              ) : null}
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="h-full border border-border bg-card p-6">
              <h3 className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Named projects</h3>
              <ul className="mt-4 space-y-3">
                {aiProjects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className="link-underline text-sm">
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                An assistant concept and a code review and debugging platform. FitPulse is listed with the full stack work.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="h-full border border-border bg-card p-6">
              <h3 className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Employment boundary</h3>
              {role ? (
                <>
                  <p className="mt-4 text-sm leading-relaxed">
                    The only role on record is an internship at {role.organization} ({role.start} – {role.end}) on {role.project}.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    That work is full stack: {role.technologies.join(", ")}. It is not an AI production role, and this site does not treat certificate topics as tenure.
                  </p>
                  <Link href="/experience" className="link-underline mt-5 inline-block text-sm">
                    View experience
                  </Link>
                </>
              ) : null}
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
