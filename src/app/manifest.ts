import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atindra Dubey",
    short_name: "Atindra Dubey",
    description:
      "AI Engineering, Generative AI, and Full Stack development by Atindra Dubey.",
    start_url: "/",
    display: "standalone",
    background_color: "#141311",
    theme_color: "#141311",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
