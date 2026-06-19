# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # local dev server (astro dev) — http://localhost:4321
npm run build     # production build to dist/ (astro build)
npm run preview   # serve the built output locally
```

There is no test suite, linter, or formatter configured. Type-checking comes from Astro's strict tsconfig and runs as part of `astro build`.

## Architecture

Personal site / blog at **whitfield.dev**. Astro 5 + React 19 islands + Tailwind, deployed to **Vercel** with `output: 'static'`. The only on-demand (SSR) route is the contact form action; everything else is prerendered.

### Content pipeline
- Blog posts are an Astro **content collection** defined in `src/content.config.ts`, loaded via `glob` from `src/content/blog/*.{md,mdx}`. Frontmatter schema: `title`, `description?`, `pubDate` (coerced date), `draft?` (default false), `image?`.
- `src/pages/blog/[...slug].astro` generates a static page per non-draft post via `getStaticPaths`; `render(post)` yields `<Content />`, wrapped in `BlogPost.astro`.
- The homepage (`src/pages/index.astro`) merges internal collection posts with a **hardcoded `externalPosts` array** (links to reazy.pro etc.) and sorts by date. New cross-posts go in that array.
- Posts are MDX and import images from `src/assets/blog/<slug>/` plus custom slide components (`SlideTextImage.astro`, `SlideImages.astro`) and React chart islands in `src/components/visualizations/`.

### Layouts & styling
- `Base.astro` → `BlogPost.astro` is the layout chain. `Base` owns `<head>` and title formatting (`<title> — whitfield.dev`).
- **All styling is global**, in `src/styles/global.css` (imported by `Base`), driven by CSS variables in `:root`. Dark editorial theme, Source Serif 4. Tailwind is installed but the hand-written CSS is the source of truth — prefer editing `global.css` over adding utility classes. `--measure: 600px` is the content column width.

### Contact form (the only SSR path)
- `src/pages/contact.astro` sets `export const prerender = false` and posts to the **Astro action** `server.contact` in `src/actions/index.ts`, which sends mail via **MailerSend**.
- Spam defense is a **honeypot** field (`website`); when filled, the action silently returns success without sending.
- Requires env vars `MAILERSEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` (see `.env.example`) set both locally and in Vercel. `FROM_EMAIL` must be on a MailerSend-verified domain.
- `astro.config.mjs` disables `security.checkOrigin` — intentional. Behind Vercel's proxy the reconstructed Origin mismatches and breaks the stateless form; the comment there explains why it's safe.

### Interactive homepage (the signature feature)
The homepage name and avatar carry deliberate, self-contained interactions implemented as **inline vanilla-JS `<script>` in `index.astro`** (no framework):
- **Name** (`.site-title`): hover = rainbow sweep, click = lock to next palette color. CSS owns the visual states; JS manages per-hover lock/cycle/reset logic.
- **Avatar slingshot/pinball**: drag-to-fling physics — the avatar launches, spins, bounces off viewport walls and off the actual text (via `Range.getClientRects`), trails a canvas comet, scores hits, then springs home. Heavily commented with tunable constants at the top of the IIFE.
- **`prefers-reduced-motion`** is respected (Ben develops with macOS Reduce Motion ON): CSS softens the avatar hover, and the fling degrades to a gentle low-speed launch with no spin/trail. Check this gate before debugging "missing"/"broken" animations.

Design rationale for keeping interactions minimal ("one loud thing, everything else calm" — audience is potential clients) lives in `ai_docs/interactive-design.md` and `ai_docs/avatar-slingshot.md`. Consult these before changing the homepage feel.
