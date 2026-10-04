import { ContactBand } from "@/components/home/contact-band";
import { AiSection } from "@/components/home/ai-section";
import { FoundationSection } from "@/components/home/foundation-section";
import { Hero } from "@/components/home/hero";
import { Narrative } from "@/components/home/narrative";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { CertificationList } from "@/components/certifications/certification-list";
import { Timeline } from "@/components/experience/timeline";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal } from "@/components/motion/reveal";
import { PortfolioAssistant } from "@/components/playground/portfolio-assistant";
import { ProjectCard } from "@/components/projects/project-card";
import { SkillGroups } from "@/components/skills/skill-groups";
import { experience } from "@/data/experience";
import { getFeaturedProjects } from "@/lib/content";
import { resumeAvailable } from "@/lib/resume";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const resume = resumeAvailable();
  const modelConfigured = Boolean(process.env.AI_API_KEY);

  return (
    <>
      <Hero resumeAvailable={resume} />
      <Narrative />

      <section className="border-b border-border py-16 sm:py-24" aria-labelledby="projects-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading id="projects-heading" index="02" eyebrow="Selected projects" title="AI products, full stack apps, and dashboards.">
              Selected work across generative AI, MERN applications, and admin systems. The full list is on the projects page.
            </SectionHeading>
            <Link href="/projects" className="link-underline shrink-0 text-sm">
              All projects
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.slug} className="h-full">
                <HoverLift>
                  <ProjectCard project={project} priority={index < 2} />
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AiSection />
      <FoundationSection />

      <section className="border-b border-border py-16 sm:py-24" aria-labelledby="experience-heading">
        <Container>
          <SectionHeading
            id="experience-heading"
            index="05"
            eyebrow="Experience"
            title="MERN development at HashedBit Innovations."
          >
            January 2026 to June 2026, on the JavaScript Content Management System.
          </SectionHeading>
          <div className="mt-12">
            <Timeline items={experience} />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-24" aria-labelledby="certifications-heading">
        <Container>
          <SectionHeading
            id="certifications-heading"
            index="06"
            eyebrow="Certifications"
            title="AI, full stack, and data."
          >
            Six IBM professional certificates, delivered on Coursera, in RAG and agentic AI, AI engineering, generative AI, full stack development, data science, and business intelligence.
          </SectionHeading>
          <div className="mt-12">
            <CertificationList />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-24" aria-labelledby="skills-heading">
        <Container>
          <SectionHeading id="skills-heading" index="07" eyebrow="Technical skills" title="Engineering, AI, and analytics.">
            Languages, the application stack, generative AI, and data tools.
          </SectionHeading>
          <div className="mt-12">
            <SkillGroups />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-24" aria-labelledby="ask-heading">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading id="ask-heading" index="08" eyebrow="Ask my portfolio" title="AI portfolio assistant.">
            Answers come only from the data on this site. If a fact is missing, the reply says so. The site does not depend on a model.
          </SectionHeading>
          <PortfolioAssistant modelConfigured={modelConfigured} />
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
