# Atindra Dubey — Portfolio

Personal portfolio site built with **Next.js** (App Router). It presents verified profile data, projects, experience, certifications, and skills. Content lives in `src/data` so you can extend the site without touching layout code.

**Repository:** [github.com/Atindra28/My_Official_Portfolio_NextJs](https://github.com/Atindra28/My_Official_Portfolio_NextJs)

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm (included with Node.js)

## Run locally

```bash
git clone https://github.com/Atindra28/My_Official_Portfolio_NextJs.git
cd My_Official_Portfolio_NextJs
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open [http://localhost:43123](http://localhost:43123).

The dev server listens on `0.0.0.0:43123`, so you can also open it from another device on your network using your machine’s LAN IP.

## Environment variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For contact email | Resend API key (server only) |
| `CONTACT_EMAIL` | For contact email | Inbox that receives form messages |
| `SITE_URL` | Production | Canonical URL for SEO, sitemap, Open Graph |
| `AI_API_KEY` | Optional | Enables the optional model-backed portfolio assistant |
| `RESEND_FROM_EMAIL` | Optional | Verified sender in Resend |
| `AI_BASE_URL` | Optional | OpenAI-compatible API base |
| `AI_MODEL` | Optional | Model id (default: `gpt-4o-mini`) |

Without `RESEND_API_KEY` / `CONTACT_EMAIL`, the contact form still loads but cannot send mail. Without `AI_API_KEY`, “Ask my portfolio” answers from on-site data only.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server on port **43123** |
| `npm run build` | Production build |
| `npm start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Project layout

```text
src/app/          Routes, API (/api/chat), metadata
src/components/   UI, layout, sections
src/data/         Profile, projects, experience, certifications, skills, socials
src/lib/          Validation, rate limits, portfolio assistant helpers
public/           Static assets (project art, resume PDF, certificates)
```

## Common updates

**Add a project** — Edit `src/data/projects.ts` (`Project` type in `src/types/index.ts`). Set `featured: true` for the home page. Add `githubUrl` / `liveUrl` only when they are real.

**Update links** — Edit `src/data/socials.ts` (LinkedIn, GitHub, portfolio repo).

**Resume download** — Place your PDF at:

`public/resume/Atindra-Dubey-Resume.pdf`

Download buttons appear in the header, hero, footer, About page, and command palette (`Ctrl+K` / `Cmd+K`) only when that file exists.

**Certificates** — PDFs under `public/certificates/` match paths in `src/data/certifications.ts`.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Motion, Zod, Resend.
