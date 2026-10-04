import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal } from "@/components/motion/reveal";
import { CategoryNav } from "@/components/projects/category-nav";
import { ProjectCard } from "@/components/projects/project-card";
import { filterProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects recorded by Atindra Dubey: AI work and full stack applications. Case-study detail is added only when it is real.",
  path: "/projects",
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { active, items } = filterProjects(category);

  return (
    <>
      <PageIntro eyebrow="Projects" title="AI products, full stack apps, and dashboards.">
        Generative AI work, MERN applications, and admin systems.
      </PageIntro>
      <Container className="py-12 sm:py-16">
        <CategoryNav active={active} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {items.map((project) => (
            <Reveal key={project.slug} className="h-full">
              <HoverLift>
                <ProjectCard project={project} />
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
