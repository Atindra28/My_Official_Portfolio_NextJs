import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { CopyLink } from "@/components/social/copy-link";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Atindra Dubey about a project, role, or question.",
  path: "/contact",
});

export default function ContactPage() {
  const linkedin = socials.find((item) => item.id === "linkedin");

  return (
    <>
      <PageIntro eyebrow="Contact" title="Have a project, opportunity, or idea?">
        Send a note about a role, a product problem, or a question. Email and LinkedIn are both open.
      </PageIntro>
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_18rem]">
        <ContactForm />
        <aside className="h-fit space-y-5 border border-border p-6">
          <h2 className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Direct</h2>
          <ul className="space-y-3 text-sm">
            {profile.email ? (
              <li className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${profile.email}`} className="link-underline">
                  {profile.email}
                </a>
                <CopyLink value={profile.email} label="Copy email" />
              </li>
            ) : null}
            {socials.map((social) => (
              <li key={social.id} className="flex flex-wrap items-center gap-3">
                {social.href ? (
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {social.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{social.placeholder}</span>
                )}
                {social.href ? <CopyLink value={social.href} label="Copy link" /> : null}
              </li>
            ))}
          </ul>
          {linkedin?.href ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Replies go to the email address you enter in the form.
            </p>
          ) : null}
        </aside>
      </Container>
    </>
  );
}
