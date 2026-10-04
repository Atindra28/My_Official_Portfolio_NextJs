import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

export function SocialList({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {socials.map((social) => (
        <li key={social.id}>
          {social.href ? (
            <a
              href={social.href}
              className="link-underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">
              {social.placeholder ?? social.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
