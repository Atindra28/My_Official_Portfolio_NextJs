import type { SkillGroup } from "@/types";

export const foundationMessage =
  "My full stack engineering foundation enables me to build the complete application layer around AI.";

export const foundationColumns: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Java", "Spring Boot"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "SQL"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Vercel", "Netlify"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & Generative AI",
    summary:
      "Generative AI skills used in project work and covered by the IBM Generative AI Engineering certificate. The internship was full stack, not an AI production role.",
    skills: [
      { name: "Generative AI" },
      { name: "Prompt Engineering" },
      { name: "LLMs" },
      { name: "RAG" },
      { name: "LangChain" },
      { name: "AI Agents" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    summary: "Java, JavaScript, Python, and SQL.",
    skills: [{ name: "Java" }, { name: "JavaScript" }, { name: "Python" }, { name: "SQL" }],
  },
  {
    id: "frontend",
    title: "Frontend",
    summary: "Interface technologies, including React on the HashedBit internship and Next.js on the Satara Club dashboard.",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Bootstrap" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "Node.js, Express.js, and REST APIs were used on the internship. Java and Spring Boot are part of the backend skill set.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "Java" },
      { name: "Spring Boot" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    summary: "MySQL on the internship. MongoDB on the MERN projects. SQL is part of the same data skill set.",
    skills: [{ name: "MongoDB" }, { name: "MySQL" }, { name: "SQL" }],
  },
  {
    id: "data",
    title: "Data & Analytics",
    summary: "Analysis and reporting tools, alongside the IBM Data Science and Business Intelligence certificates.",
    skills: [
      { name: "Excel" },
      { name: "Power BI" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "DAX" },
      { name: "Power Query" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "Git, GitHub, Vercel, and Netlify.",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "Vercel" }, { name: "Netlify" }],
  },
];
