import { Timeline } from "@/components/experience/timeline";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { experience } from "@/data/experience";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "MERN Stack Development internship at HashedBit Innovations, January 2026 to June 2026, on the JavaScript Content Management System.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageIntro eyebrow="Experience" title="MERN stack development at HashedBit Innovations.">
        January 2026 to June 2026, on the JavaScript Content Management System. React admin work, a Node.js and Express.js API, MySQL, and REST APIs.
      </PageIntro>
      <Container className="py-14 sm:py-20">
        <Timeline items={experience} />
      </Container>
    </>
  );
}
