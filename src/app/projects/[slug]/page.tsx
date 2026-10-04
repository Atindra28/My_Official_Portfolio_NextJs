import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { getProject, getRelatedProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project" };
  }
  return pageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const sections = [
    project.problem ? { title: "Problem", body: project.problem } : null,
    project.solution ? { title: "Solution", body: project.solution } : null,
    project.architecture ? { title: "Architecture", body: project.architecture } : null,
    project.challenges ? { title: "Challenges", body: project.challenges } : null,
    project.outcome ? { title: "Outcome", body: project.outcome } : null,
  ].filter((section): section is { title: string; body: string } => Boolean(section));

  return (
    <article>
      <Container className="pt-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground link-underline">
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All projects
        </Link>
      </Container>
      <header className="border-b border-border">
        <Container className="py-10 sm:py-14">
          <p className="font-mono text-xs tracking-[0.18em] text-brass uppercase">{project.category}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08] tracking-tight text-balance">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
            {project.description ?? project.shortDescription}
          </p>
        </Container>
      </header>
      {project.image ? (
        <Container className="py-8">
          <div className="overflow-hidden border border-border bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={750}
              priority
              unoptimized
              className="h-auto w-full"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>
        </Container>
      ) : null}
      <Container
        className={
          project.technologies.length > 0 || project.githubUrl || project.liveUrl
            ? "grid gap-12 py-8 pb-20 lg:grid-cols-[16rem_minmax(0,1fr)]"
            : "py-8 pb-20"
        }
      >
        {project.technologies.length > 0 || project.githubUrl || project.liveUrl ? (
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {project.technologies.length > 0 ? (
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge variant="outline">{technology}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.githubUrl || project.liveUrl ? (
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Links</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {project.githubUrl ? (
                    <li>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 link-underline">
                        GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ) : null}
                  {project.liveUrl ? (
                    <li>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 link-underline">
                        Live demo <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </aside>
        ) : null}
        <div className="space-y-10">
          {project.features && project.features.length > 0 ? (
            <section>
              <h2 className="font-display text-3xl tracking-tight">Features</h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-3xl tracking-tight">{section.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
          {related.length > 0 ? (
            <section>
              <h2 className="font-display text-3xl tracking-tight">Related</h2>
              <ul className="mt-4 space-y-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/projects/${item.slug}`} className="link-underline text-sm">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </article>
  );
}
