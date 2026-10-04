"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { socialById } from "@/data/socials";
import { RESUME_DOWNLOAD_FILENAME, RESUME_PUBLIC_PATH } from "@/lib/resume-path";
import { useRouter } from "next/navigation";

const commands = [
  { href: "/", label: "Go Home" },
  { href: "/projects", label: "View Projects" },
  { href: "/experience", label: "View Experience" },
  { href: "/certifications", label: "View Certifications" },
  { href: "/about", label: "View About" },
  { href: "/contact", label: "Contact Me" },
] as const;

export function CommandMenu({
  open,
  onOpenChange,
  resumeAvailable,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeAvailable: boolean;
}) {
  const router = useRouter();
  const linkedin = socialById("linkedin");
  const github = socialById("github");
  const portfolio = socialById("portfolio");

  function go(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  function openExternal(href: string) {
    onOpenChange(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Jump to a page or open a recorded link."
      className="top-[18%] max-w-[calc(100%-1.5rem)] translate-y-0 sm:max-w-lg"
    >
      <Command>
        <CommandInput aria-label="Search commands" placeholder="Type a command…" />
        <CommandList>
          <CommandEmpty>No matching commands.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {commands.map((item) => (
              <CommandItem key={item.href} value={item.label} onSelect={() => go(item.href)}>
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            <CommandItem
              value="Open LinkedIn"
              disabled={!linkedin?.href}
              onSelect={() => {
                if (linkedin?.href) openExternal(linkedin.href);
              }}
            >
              Open LinkedIn
            </CommandItem>
            <CommandItem
              value="Open GitHub"
              disabled={!github?.href}
              onSelect={() => {
                if (github?.href) openExternal(github.href);
              }}
            >
              Open GitHub
            </CommandItem>
            <CommandItem
              value="Open portfolio repository"
              disabled={!portfolio?.href}
              onSelect={() => {
                if (portfolio?.href) openExternal(portfolio.href);
              }}
            >
              Open portfolio repository
            </CommandItem>
            {resumeAvailable ? (
              <CommandItem
                value="Download Resume"
                onSelect={() => {
                  onOpenChange(false);
                  const anchor = document.createElement("a");
                  anchor.href = RESUME_PUBLIC_PATH;
                  anchor.download = RESUME_DOWNLOAD_FILENAME;
                  document.body.appendChild(anchor);
                  anchor.click();
                  anchor.remove();
                }}
              >
                Download Resume
              </CommandItem>
            ) : null}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
