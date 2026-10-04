import { Container } from "@/components/layout/container";
import { SocialList } from "@/components/social/social-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ContactBand() {
  return (
    <section className="border-b border-border py-16 sm:py-24" aria-labelledby="contact-heading">
      <Container className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.22em] text-brass uppercase">Contact</p>
          <h2
            id="contact-heading"
            className="mt-3 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight text-balance"
          >
            Have a project, opportunity, or idea?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Write about a role, a product problem, or a question.
          </p>
        </div>
        <div className="flex flex-col items-start gap-5">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Let&apos;s Connect
          </Link>
          <SocialList />
        </div>
      </Container>
    </section>
  );
}
