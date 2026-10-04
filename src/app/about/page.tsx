import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { ResumeAction } from "@/components/layout/resume-actions";
import { SocialList } from "@/components/social/social-list";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import { resumeAvailable } from "@/lib/resume";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Atindra Dubey is an AI engineer with a full stack foundation, an MCA from MIT World Peace University, Pune.",
  path: "/about",
});

export default function AboutPage() {
  const resume = resumeAvailable();

  return (
    <>
      <PageIntro eyebrow="About" title={profile.headline}>
        {profile.summary}
      </PageIntro>
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_18rem]">
        <div className="space-y-10">
          {profile.story.map((step, index) => (
            <section key={step.title}>
              <h2 className="font-display text-3xl tracking-tight">
                <span className="mr-3 font-mono text-sm text-brass">0{index + 1}</span>
                {step.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
                {step.body}
              </p>
            </section>
          ))}
          <section>
            <h2 className="font-display text-3xl tracking-tight">Who this is for</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {profile.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{profile.availability}</p>
          </section>
        </div>
        <aside className="h-fit border border-border p-6 lg:sticky lg:top-24">
          <h2 className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Education</h2>
          <div className="mt-4 space-y-4">
            {profile.education.map((item) => (
              <div key={item.degree}>
                <p className="text-sm leading-relaxed">{item.degree}</p>
                {item.field ? <p className="mt-1 text-sm text-muted-foreground">{item.field}</p> : null}
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.institution}, {item.location}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{item.period}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <SocialList className="flex-col items-start" />
            {resume ? (
              <div className="mt-4">
                <ResumeAction available />
              </div>
            ) : null}
          </div>
        </aside>
      </Container>
    </>
  );
}
