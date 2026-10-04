import { Container } from "@/components/layout/container";
import { ResumeAction } from "@/components/layout/resume-actions";
import { Reveal } from "@/components/motion/reveal";
import { SocialList } from "@/components/social/social-list";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const portrait = {
  src: "/images/atindra-dubey.png",
  width: 819,
  height: 808,
  alt: "Atindra Dubey - AI and Full Stack Developer",
} as const;

export function Hero({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:py-28 xl:gap-14">
        <div className="min-w-0">
          <Reveal immediate>
            <p className="font-mono text-xs tracking-[0.22em] text-brass uppercase">{profile.name}</p>
          </Reveal>
          <Reveal immediate delay={0.06}>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.15rem,6.2vw,4.5rem)] leading-[1.05] tracking-tight text-balance">
              {profile.headline}
            </h1>
          </Reveal>
          <Reveal immediate delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>
          <Reveal immediate delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
                View Projects
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
              >
                Let&apos;s Connect
              </Link>
            </div>
          </Reveal>
          <Reveal immediate delay={0.24}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <SocialList />
              {resumeAvailable ? (
                <ResumeAction available variant="button" className="w-full sm:w-auto" />
              ) : null}
            </div>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-col gap-8 lg:gap-6">
          <Reveal immediate delay={0.14}>
            <figure className="hero-portrait-frame">
              <div className="hero-portrait-glow" aria-hidden="true" />
              <div className="hero-portrait-ring" aria-hidden="true" />
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 1280px) 336px, (min-width: 1024px) 320px, (min-width: 640px) 288px, min(85vw, 320px)"
                className="hero-portrait-image"
              />
            </figure>
          </Reveal>
          <Reveal immediate delay={0.16}>
            <aside className="border border-border bg-card/80 p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Currently
              </p>
              <p className="mt-3 text-sm leading-relaxed">{profile.availability}</p>
              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  Education
                </p>
                {profile.education.map((item) => (
                  <div key={item.degree}>
                    <p className="text-sm leading-relaxed">{item.degree}</p>
                    {item.field ? (
                      <p className="mt-1 text-sm text-muted-foreground">{item.field}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.institution}, {item.location}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.period}</p>
                  </div>
                ))}
              </div>
              <ol className="mt-6 space-y-3 border-t border-border pt-6">
                {profile.story.map((step, index) => (
                  <li key={step.title} className="flex gap-3 text-sm">
                    <span className="font-mono text-xs text-brass">0{index + 1}</span>
                    <span>{step.title}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
