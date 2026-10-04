import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, limit);
}

export function filterProjects(category: string | undefined): {
  active: ProjectCategory | "All";
  items: Project[];
} {
  if (!category || category === "All") {
    return { active: "All", items: projects };
  }
  const match = projects.some((project) => project.category === category);
  if (!match) return { active: "All", items: projects };
  return {
    active: category as ProjectCategory,
    items: projects.filter((project) => project.category === category),
  };
}

export function hasCaseStudyDetail(project: Project): boolean {
  return Boolean(
    project.problem ||
      project.solution ||
      (project.features && project.features.length > 0) ||
      project.architecture ||
      project.challenges ||
      project.outcome,
  );
}
