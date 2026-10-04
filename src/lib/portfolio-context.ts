import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { foundationColumns, foundationMessage, skillGroups } from "@/data/skills";
import { resumeAvailable } from "@/lib/resume";
import { RESUME_PUBLIC_PATH } from "@/lib/resume-path";

export function portfolioRecord() {
  return {
    profile: {
      name: profile.name,
      role: profile.role,
      headline: profile.headline,
      summary: profile.summary,
      availability: profile.availability,
      education: profile.education,
      audience: profile.audience,
      email: profile.email,
      story: profile.story,
    },
    socials: socials.map((item) => ({
      label: item.label,
      href: item.href ?? null,
      placeholder: item.placeholder ?? null,
    })),
    resume: {
      path: RESUME_PUBLIC_PATH,
      available: resumeAvailable(),
      note: "If unavailable, the file has not been added. Do not invent a resume URL.",
    },
    experience,
    certifications: certifications.map((item) => ({
      title: item.title,
      issuer: item.issuer,
      courseCount: item.courseCount ?? null,
      completedLabel: item.completedLabel ?? null,
      areas: item.areas,
      summary: item.summary,
      credentialUrl: item.credentialUrl ?? null,
    })),
    foundation: {
      message: foundationMessage,
      columns: foundationColumns,
    },
    skills: skillGroups,
    projects: projects.map((project) => ({
      title: project.title,
      slug: project.slug,
      category: project.category,
      shortDescription: project.shortDescription,
      description: project.description ?? null,
      technologies: project.technologies,
      githubUrl: project.githubUrl ?? null,
      liveUrl: project.liveUrl ?? null,
      problem: project.problem ?? null,
      solution: project.solution ?? null,
      features: project.features ?? null,
      architecture: project.architecture ?? null,
      challenges: project.challenges ?? null,
      outcome: project.outcome ?? null,
    })),
    boundaries: [
      "Do not invent companies, clients, metrics, awards, testimonials, job titles, URLs, emails, or technologies.",
      "The only employment entry is the HashedBit Innovations internship.",
      "Certification topics are study, not production tenure.",
      "Use only the email, GitHub, LinkedIn, and portfolio repository recorded here. Do not invent other contact details.",
    ],
  };
}

export function portfolioContextText(): string {
  return JSON.stringify(portfolioRecord(), null, 2);
}
