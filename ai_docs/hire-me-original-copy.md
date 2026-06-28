# /hire-me — original copy (pre AI-native reposition)

Reference snapshot of the hire-me page text **before** the 2026-06 AI-native
repositioning. Preserved verbatim so any wording can be restored. Ben is the
authority on all wording.

---

## Meta

- **title:** Hire Me
- **description:** Ben Whitfield — senior full-stack developer. I design, build, and ship products end-to-end: web, mobile, and the backend behind them. Available for contract work — remote or onsite, open to relocation.

## Header

- **Role:** Senior full-stack developer
- **Status line:** US citizen · Remote or onsite · Will relocate · [Download CV (PDF)](/cv/ben-whitfield-cv.pdf)

### Stack grid

- **Frontend** — React · TypeScript · JavaScript
- **Backend** — Node.js · Python · REST APIs · Firestore (NoSQL) · Google Cloud Storage
- **Cloud** — Google Cloud Platform · Firebase · Docker
- **Mobile** — Capacitor (iOS + Android) · custom native audio engine (Swift, Kotlin)
- **ML / AI** — PyTorch · custom model training · production inference
- **LLM / GenAI** — Large Language Models · Generative AI · LLM Integration (Anthropic API) · Prompt Engineering
- **Testing** — Playwright · Vitest

### Actions

- Get in touch (→ /contact)

## Intro

> I'm a full-stack developer who designs, builds, and ships products end-to-end — web, mobile, and the backend behind them — solo, in production, for real users.

## Experience

> I built [Reazy](https://www.reazy.pro/), a cross-platform text-to-speech SaaS, from nothing to 500+ users, with paying subscribers across the [Chrome Web Store](https://chromewebstore.google.com/detail/reazy-text-to-speech/gaibmcgoecopcdbokclpabkklecjdfmg), [Google Play](https://play.google.com/store/apps/details?id=pro.reazy.app), and the [Apple App Store](https://apps.apple.com/us/app/reazy-text-to-speech/id6758965713). I was the only engineer — architecture, frontend, backend, ML training, payments, and deployment. The product turns documents, web pages, and raw text into natural speech.

> Being the only engineer meant owning problems end-to-end:

- **Frontend performance** — built a virtualized reader that renders 1,000+ page documents smoothly, staying fast at any document size.
- **Billing** — unified Stripe (web), StoreKit 2 (iOS), and Google Play Billing (Android) into one provider-agnostic entitlement model: a single source of truth for who's paid, across all three stores.
- **Machine learning, end to end** — built the text-to-speech voice pipeline from data to production: data processing, models adapted from open-source architectures ([FastPitch](https://arxiv.org/abs/2006.06873), [HiFi-GAN](https://arxiv.org/abs/2010.05646)), and a cost- and latency-optimized inference backend.
- **Native mobile** — built a custom native audio engine in Swift and Kotlin, replacing off-the-shelf plugins: gapless playback, lock-screen controls, and background audio on both platforms.

> The app — web, Chrome extension, and mobile — shipped from one React + TypeScript monorepo with a shared core library and automated tests. Model inference ran as a separate Python service on Google Cloud Run.

> I wrote up the full technical story [here](/blog/building-reazy).

> Before software, I spent a decade as an operations-research analyst and economist for the U.S. Air Force, including at the Pentagon. I started teaching myself to build software in 2015 ([Stanford's open courseware](https://see.stanford.edu/Course), [The Odin Project](https://www.theodinproject.com/)) and went full-time in 2021: game development, a deep dive into system design and the web, then 3.5 years building and running Reazy end-to-end.
