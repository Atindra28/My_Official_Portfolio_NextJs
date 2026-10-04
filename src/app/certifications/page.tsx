import { CertificationList } from "@/components/certifications/certification-list";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Certifications",
  description:
    "IBM professional certificates in RAG and agentic AI, AI engineering, generative AI, full stack development, data science, and business intelligence.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageIntro eyebrow="Certifications" title="AI, full stack, and data.">
        Six IBM professional certificates delivered on Coursera. Each card opens the certificate PDF.
      </PageIntro>
      <Container className="py-14 sm:py-20">
        <CertificationList />
      </Container>
    </>
  );
}
