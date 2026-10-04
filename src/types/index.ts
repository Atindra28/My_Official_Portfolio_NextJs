export type ProjectCategory =
  | "AI"
  | "AI / Full Stack"
  | "Generative AI"
  | "Full Stack"
  | "Web Development"
  | "Other";

export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  availability: string;
  education: {
    degree: string;
    field?: string;
    institution: string;
    location: string;
    period: string;
  }[];
  audience: string[];
  email: string | null;
  story: { title: string; body: string }[];
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
  challenges?: string;
  outcome?: string;
};

export type Experience = {
  id: string;
  organization: string;
  role: string;
  start: string;
  end: string;
  project: string;
  summary: string;
  technologies: string[];
  responsibilities: string[];
  note?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  courseCount?: number;
  completedOn?: string;
  completedLabel?: string;
  areas: string[];
  prominent?: boolean;
  platform?: string;
  summary: string;
  document?: string;
  credentialUrl?: string;
};

export type Skill = {
  name: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  skills: Skill[];
};

export type SocialLink = {
  id: string;
  label: string;
  href?: string;
  placeholder?: string;
};
