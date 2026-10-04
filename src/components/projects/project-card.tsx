import { Badge } from "@/components/ui/badge";
import { hasCaseStudyDetail } from "@/lib/content";
import type { Project } from "@/types";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-colors hover:border-brass/50">
      <Link
        href={href}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        tabIndex={-1}
        aria-hidden="true"
      >
        {project.image ? (
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt=""
              width={1200}
              height={750}
              priority={priority}
              unoptimized
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">
          {project.category}
        </p>
        <h3 className="font-display text-[1.65rem] leading-tight tracking-tight">
          <Link href={href} className="link-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="mt-auto flex flex-col gap-4 pt-3">
          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="outline">{technology}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link href={href} className="arrow-link link-underline inline-flex items-center gap-1">
              {hasCaseStudyDetail(project) ? "View case study" : "View project"}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 link-underline"
              >
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 link-underline"
              >
                Live demo
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
