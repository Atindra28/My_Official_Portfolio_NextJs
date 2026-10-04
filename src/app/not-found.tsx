import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-xs tracking-[0.18em] text-brass uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Page not found.</h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
        That URL is not part of this site.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
          Go home
        </Link>
        <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          View projects
        </Link>
      </div>
    </Container>
  );
}
