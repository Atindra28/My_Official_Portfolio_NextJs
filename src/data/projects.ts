import type { Project, ProjectCategory } from "@/types";

export const projects: Project[] = [
  {
    slug: "ai-personal-assistant",
    title: "AI Personal Assistant",
    shortDescription:
      "A full-stack AI application concept with AI-powered assistance and productivity functionality.",
    category: "AI",
    technologies: [],
    featured: true,
    image: "/projects/ai-personal-assistant.svg",
  },
  {
    slug: "ai-code-review-debugging-platform",
    title: "AI Code Review / Debugging Platform",
    shortDescription: "An AI-focused application for code review and debugging assistance.",
    category: "AI",
    technologies: [],
    featured: true,
    image: "/projects/ai-code-review-debugging-platform.svg",
  },
  {
    slug: "fitpulse",
    title: "FitPulse",
    shortDescription:
      "A MERN fitness and well-being platform for exercise discovery, nutrition, health calculations, meal logging, hydration tracking, and AI-powered fitness assistance.",
    description:
      "FitPulse is a MERN-based fitness and well-being application that combines exercise discovery, nutrition information, health calculations, meal logging, hydration tracking, and AI-powered fitness assistance in one platform.",
    category: "AI / Full Stack",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    featured: true,
    features: [
      "Exercise search",
      "Nutrition information",
      "BMR/TDEE calculations",
      "Meal logging",
      "Hydration tracking",
      "AI-powered fitness assistance",
    ],
    image: "/projects/fitness-and-well-being.svg",
  },
  {
    slug: "tradematrix-zerodha-trading-clone",
    title: "TradeMatrix",
    shortDescription:
      "A MERN-based stock trading platform inspired by Zerodha. No affiliation with Zerodha.",
    description:
      "TradeMatrix is a stock trading platform built with React, Node.js, Express.js, and MongoDB. The interface is Zerodha-inspired. It is not affiliated with Zerodha.",
    category: "Web Development",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    featured: true,
    image: "/projects/tradematrix-zerodha-trading-clone.svg",
  },
  {
    slug: "satara-club-admin-dashboard",
    title: "Satara Club Admin Dashboard",
    shortDescription:
      "A Next.js, TypeScript, and Tailwind admin dashboard covering club members, finance, operations, and services.",
    description:
      "An admin dashboard for Satara Club, implemented with Next.js, TypeScript, and Tailwind CSS. The implementation includes Members, Finance, Operations, Club, Guest Management, Court Booking, Restaurant, Biometric Logs, SCPL Management, and Notifications.",
    category: "Web Development",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    features: [
      "Members",
      "Finance",
      "Operations",
      "Club",
      "Guest Management",
      "Court Booking",
      "Restaurant",
      "Biometric Logs",
      "SCPL Management",
      "Notifications",
    ],
    image: "/projects/satara-club-admin-dashboard.svg",
  },
  {
    slug: "student-result-management-system",
    title: "Student Result Management System",
    shortDescription: "A system for student results.",
    category: "Web Development",
    technologies: [],
    featured: false,
    image: "/projects/student-result-management-system.svg",
  },
  {
    slug: "linkedin-clone",
    title: "LinkedIn Clone",
    shortDescription: "A LinkedIn clone. No affiliation with LinkedIn.",
    category: "Web Development",
    technologies: [],
    featured: false,
    image: "/projects/linkedin-clone.svg",
  },
  {
    slug: "student-performance-management",
    title: "Student Performance Management",
    shortDescription: "A system for student performance.",
    category: "Web Development",
    technologies: [],
    featured: false,
    image: "/projects/student-performance-management.svg",
  },
  {
    slug: "skillswap-hub",
    title: "SkillSwap Hub",
    shortDescription: "SkillSwap Hub. A fuller product description has not been added.",
    category: "Other",
    technologies: [],
    featured: false,
    image: "/projects/skillswap-hub.svg",
  },
];

export const projectCategories: ProjectCategory[] = [
  "AI",
  "AI / Full Stack",
  "Generative AI",
  "Full Stack",
  "Web Development",
  "Other",
];
