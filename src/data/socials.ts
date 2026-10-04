import type { SocialLink } from "@/types";

export const socials: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/atindra-dubey/",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Atindra28",
  },
  {
    id: "portfolio",
    label: "Portfolio repo",
    href: "https://github.com/Atindra28/My_Official_Portfolio_NextJs",
  },
];

export function socialById(id: string): SocialLink | undefined {
  return socials.find((item) => item.id === id);
}
