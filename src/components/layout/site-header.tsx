"use client";

import { CommandMenu } from "@/components/layout/command-menu";
import { ResumeAction } from "@/components/layout/resume-actions";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { socials } from "@/data/socials";
import { isActivePath, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader({ resumeAvailable }: { resumeAvailable: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass">
          <span className="grid size-8 shrink-0 place-items-center border border-brass/50 font-mono text-[10px] tracking-widest text-brass">
            AD
          </span>
          <span className="hidden truncate text-sm font-medium tracking-tight sm:inline">
            Atindra Dubey
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-6 hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active
                    ? "text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-brass"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-11")}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="size-4" aria-hidden="true" />
          </button>
          <ThemeToggle />
          {resumeAvailable ? <ResumeAction available variant="header-download" /> : null}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="group inline-flex size-11 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3.5 w-4" aria-hidden="true">
                <span className="absolute top-0 left-0 h-px w-4 bg-current transition group-data-[popup-open]:top-[6px] group-data-[popup-open]:rotate-45" />
                <span className="absolute top-[6px] left-0 h-px w-4 bg-current transition group-data-[popup-open]:opacity-0" />
                <span className="absolute top-3 left-0 h-px w-4 bg-current transition group-data-[popup-open]:top-[6px] group-data-[popup-open]:-rotate-45" />
              </span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto data-[side=right]:w-full">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
                <SheetDescription>Pages and links.</SheetDescription>
              </SheetHeader>
              <motion.nav
                aria-label="Mobile"
                className="flex flex-col gap-1 px-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.045 } },
                }}
              >
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      data-reveal=""
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-2 py-3 text-lg",
                          active ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        <span className={cn(active && "border-b border-brass")}>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
              <div className="mt-auto flex flex-col gap-4 border-t border-border p-4">
                {resumeAvailable ? <ResumeAction available variant="button" /> : null}
                <ul className="flex flex-col gap-2">
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
                        <span className="text-sm text-muted-foreground">
                          {social.placeholder}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        resumeAvailable={resumeAvailable}
      />
    </header>
  );
}
