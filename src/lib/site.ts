import { profile } from "@/data/profile";

function normalizeSiteUrl(value: string | undefined): string {
  const fallback = "http://localhost:43123";
  if (!value) return fallback;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallback;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.SITE_URL);

export const siteTitle =
  "Atindra Dubey — AI Engineer | Full Stack Developer";

export const siteDescription =
  "AI Engineering, Generative AI, and Full Stack development. Atindra Dubey builds intelligent applications on a full stack foundation.";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const personName = profile.name;
