import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev HMR and the React debug channel are served from /_next.
  // Next only allows localhost unless this host is listed, so opening
  // the site at 127.0.0.1 would skip hydration.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/projects/ai-fitness-web-application",
        destination: "/projects/fitpulse",
        permanent: true,
      },
      {
        source: "/projects/fitness-and-well-being",
        destination: "/projects/fitpulse",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
