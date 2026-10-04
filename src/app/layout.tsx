import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";
import { socialById } from "@/data/socials";
import { rootMetadata } from "@/lib/metadata";
import { resumeAvailable } from "@/lib/resume";
import { siteDescription, siteUrl } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const resume = resumeAvailable();
  const linkedin = socialById("linkedin");
  const github = socialById("github");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.role,
        description: profile.summary,
        url: siteUrl,
        sameAs: [linkedin?.href, github?.href].filter((href): href is string => Boolean(href)),
        alumniOf: profile.education.map((item) => ({
          "@type": "CollegeOrUniversity",
          name: item.institution,
          address: {
            "@type": "PostalAddress",
            addressLocality: item.location,
          },
        })),
      },
      {
        "@type": "WebSite",
        name: profile.name,
        url: siteUrl,
        description: siteDescription,
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} dark h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:outline-2 focus:outline-brass"
        >
          Skip to content
        </a>
        <TooltipProvider delay={300}>
          <SiteHeader resumeAvailable={resume} />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter resumeAvailable={resume} />
        </TooltipProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
