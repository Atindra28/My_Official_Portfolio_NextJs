import { Container } from "@/components/layout/container";
import { ResumeAction } from "@/components/layout/resume-actions";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { navItems } from "@/lib/site";
import Link from "next/link";

export function SiteFooter({ resumeAvailable }: { resumeAvailable: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className={resumeAvailable ? "grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4" : "grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3"}>
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl tracking-tight">{profile.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">AI Engineer</p>
          <p className="mt-1 text-sm text-muted-foreground">Strong Full Stack Foundation</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Connect</p>
          <ul className="mt-4 space-y-2">
            {socials.map((social) => (
              <li key={social.id}>
                {social.href ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm"
                  >
                    {social.label}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{social.placeholder}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {resumeAvailable ? (
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-brass uppercase">Resume</p>
            <div className="mt-4">
              <ResumeAction available />
            </div>
          </div>
        ) : null}
      </Container>
      <Container>
        <Separator />
        <p className="py-6 text-sm text-muted-foreground">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
