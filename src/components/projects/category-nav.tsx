import { projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";
import Link from "next/link";

export function CategoryNav({ active }: { active: ProjectCategory | "All" }) {
  const options: Array<ProjectCategory | "All"> = [
    "All",
    ...projectCategories.filter((category) =>
      projects.some((project) => project.category === category),
    ),
  ];

  return (
    <nav aria-label="Project categories" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {options.map((option) => {
        const selected = active === option;
        const href =
          option === "All" ? "/projects" : `/projects?category=${encodeURIComponent(option)}`;
        return (
          <Link
            key={option}
            href={href}
            aria-current={selected ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
              selected
                ? "border-brass bg-brass text-brass-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </Link>
        );
      })}
    </nav>
  );
}
