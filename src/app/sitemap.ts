import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/projects", "/experience", "/certifications", "/about", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path || "/", siteUrl).toString(),
      lastModified: now,
    })),
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
      lastModified: now,
    })),
  ];
}
