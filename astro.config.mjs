import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [mdx(), tailwind(), react()],
  adapter: vercel(),
  output: 'static',
  // The contact action is the only on-demand route. Astro's CSRF origin check
  // is on by default for on-demand routes, but behind Vercel's proxy the
  // reconstructed request URL (protocol/host) can mismatch the browser Origin,
  // causing "Cross-site POST form submissions are forbidden". For a public,
  // stateless contact form there's no session/cookie to forge, so this guard
  // protects nothing here — disable it. Spam is handled by the honeypot.
  security: {
    checkOrigin: false,
  },
});
