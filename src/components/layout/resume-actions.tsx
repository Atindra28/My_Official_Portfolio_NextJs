import { buttonVariants } from "@/components/ui/button";
import { RESUME_DOWNLOAD_FILENAME, RESUME_PUBLIC_PATH } from "@/lib/resume-path";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

export function ResumeAction({
  available,
  className,
  variant = "text",
}: {
  available: boolean;
  className?: string;
  variant?: "text" | "button" | "header-download";
}) {
  if (!available) return null;

  if (variant === "header-download") {
    return (
      <a
        href={RESUME_PUBLIC_PATH}
        download={RESUME_DOWNLOAD_FILENAME}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-11 shrink-0",
          className,
        )}
        aria-label="Download resume (PDF)"
      >
        <Download className="size-4" aria-hidden="true" />
      </a>
    );
  }

  if (variant === "button") {
    return (
      <a
        href={RESUME_PUBLIC_PATH}
        download={RESUME_DOWNLOAD_FILENAME}
        className={cn(buttonVariants({ variant: "outline", size: "lg" }), className)}
      >
        Resume
      </a>
    );
  }

  return (
    <a
      href={RESUME_PUBLIC_PATH}
      download={RESUME_DOWNLOAD_FILENAME}
      className={cn("link-underline text-sm", className)}
    >
      Resume
    </a>
  );
}
