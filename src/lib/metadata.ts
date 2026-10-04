import type { Metadata } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Atindra Dubey`,
      description,
      url,
      type: "website",
      siteName: "Atindra Dubey",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Atindra Dubey`,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Atindra Dubey",
  },
  description: siteDescription,
  applicationName: "Atindra Dubey",
  authors: [{ name: "Atindra Dubey", url: siteUrl }],
  creator: "Atindra Dubey",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Atindra Dubey",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};
