# whitfield.dev

Source for [whitfield.dev](https://www.whitfield.dev) — my developer site and blog.

## Built with Claude Code

Working context and design rationale are preserved in [`/ai_docs`](./ai_docs) and [`CLAUDE.md`](./CLAUDE.md), kept current as the project evolves.

## Stack

Astro 5 · React 19 islands · TypeScript · deployed on Vercel.

## What's interesting in here

- **Avatar slingshot** (`src/scripts/avatar.ts`) — the homepage avatar is a drag-to-fling physics toy: launches, spins, bounces off the viewport walls and the actual text, trails a canvas comet, springs home.
- **Blog as a content collection** — posts are MDX in `src/content/blog`, rendered through one layout.
- **Contact form** — an Astro server action that sends mail via MailerSend, with a honeypot for spam.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build
```
