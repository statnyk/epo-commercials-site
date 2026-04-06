# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing site for **EPO Commercials** — an Irish bus & heavy-duty vehicle repair company based in Co. Kildare. The site is in **English only**. Production URL: `https://www.epocommercials.ie`

## Commands

All commands run from `auto-garage-site/`:

```bash
cd auto-garage-site
npm install          # install dependencies
npm run dev          # local dev server (http://localhost:5173)
npm run build        # typecheck + production build (tsc -b && vite build)
npm run lint         # ESLint
npm run preview      # preview production build locally
npm run clean        # clear Vite cache and dist
```

There is no test framework configured.

## Architecture

**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS v4. No router library — routing is manual via `window.location.hash` / `popstate` in `App.tsx`.

**Key directories (all under `auto-garage-site/src/`):**

- `pages/` — top-level route components: `Site.tsx` (home), `PartsPage.tsx`, `ContactPage.tsx`, `PrivacyPolicy.tsx`, `NotFound.tsx`
- `components/sections/` — page sections (Hero, About, Services, Parts, Contact, etc.)
- `components/ui/` — reusable UI primitives (buttons, cookie consent, nav links)
- `components/layout/` — Header, Footer
- `cms/epoData.ts` — all site content (company info, services, working hours) as typed constants + Supabase CRUD for parts catalog
- `lib/supabase.ts` — Supabase client (uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars)
- `admin/AdminPanel.tsx` — admin panel for managing parts and contact messages, accessed via `#admin` hash route
- `theme.ts` — centralized design tokens (`T` object) and shared style helpers (`container`, `section`). Components use inline styles referencing `T.*` rather than Tailwind utility classes for most styling.
- `assets/icons/` — SVG icon components with a mapping in `svcMaps.ts`
- `hooks/` — `useDocumentMeta` (per-page SEO), `useIsDesktop` (responsive breakpoint)

**Data layer:**
- Static content lives in `cms/epoData.ts` as exported constants
- Parts catalog and contact messages are stored in **Supabase** (PostgreSQL + Storage for part images)
- No API routes — Supabase is called directly from the browser via anon key

**Deployment:** GitHub Pages via `.github/workflows/jekyll-gh-pages.yml`. Pushes to `main` trigger build and deploy. Supabase credentials are passed as GitHub Actions secrets.

## Environment Variables

Required for build and runtime (set in `.env` locally, GitHub secrets for CI):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Routing

Manual SPA routing in `App.tsx`. Routes: `/` (home), `/parts`, `/contact`, `/privacy`, `#admin`. The `public/404.html` handles GitHub Pages SPA redirects via query param `?p=`.

## Styling Approach

Mixed approach: `theme.ts` exports a `T` token object used in inline `style={}` props throughout most components, combined with Tailwind CSS utilities in some places. When modifying styles, check which approach the target component uses and stay consistent.
