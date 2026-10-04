import fs from "node:fs";
import path from "node:path";
import { RESUME_DOWNLOAD_FILENAME, RESUME_PUBLIC_PATH } from "@/lib/resume-path";

export function resumeAvailable(): boolean {
  try {
    const relative = RESUME_PUBLIC_PATH.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", ...relative.split("/"));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export { RESUME_DOWNLOAD_FILENAME, RESUME_PUBLIC_PATH };
