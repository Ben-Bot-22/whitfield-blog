# Interactive design notes — whitfield.dev

_Captured from a design working session. Explains the homepage's interactive
behavior and, more importantly, the reasoning behind keeping activity minimal._

## What the site does

The homepage is a dark, editorial, serif blog + project index. The single
interactive flourish lives on the name **"Ben Whitfield"** (`.site-title`):

- **Hover** → the name fills with a fully-saturated neon rainbow gradient that
  sweeps continuously (CSS `@keyframes rainbow-sweep`, ~1.1s linear infinite).
- **Click while hovering** → the name locks to the next solid color in the
  palette, overriding the sweep. Each click advances through the spectrum
  (pink → orange → yellow → green → cyan → blue → violet → white → loop).
- **Exit hover:**
  - If you clicked during that hover, the chosen color **sticks**.
  - If you only hovered (no click), it resets to **white**.
- **Re-enter hover** → always starts a fresh sweep, regardless of any stuck color.

Implementation: CSS owns the visual states (gradient sweep via
`background-clip: text` + animated `background-position`; a `.color-locked`
class that pins `-webkit-text-fill-color` to a `--lock-color` variable). A small
script on the homepage manages the per-hover-session logic — clearing the lock
on `mouseenter`, cycling the color on `click`, and deciding on `mouseleave`
whether the color sticks.

The gradient carries **two full rainbow cycles** across its `200%` width so the
sweep loops seamlessly (sliding by exactly one period lands on an identical
frame — no visible snap).

## Why activity is kept minimal

The audience is **potential clients** — startup founders and CTOs evaluating Ben
for freelance work (e.g. via lemon.io). Every interaction decision was made
against that lens. The guiding principles:

1. **One loud thing, everything else calm.** The rainbow on the name is the
   single signature moment. Its impact comes from being *rare*. Spreading the
   same effect onto links, headings, or sections would turn a signature into
   noise and flatten the page's hierarchy. Links keep their quiet, consistent
   system (cyan hover wash, dotted underline on inline links).

2. **Effects must earn their place — signal or reward, never decorate.** A
   surface that is all motion has no hierarchy. Animation should either signal
   interactivity (this is clickable) or reward discovery (the click-to-lock
   easter egg). Decorative motion was cut.

3. **Effect intensity mirrors content importance.** Hero (the name) gets the
   loud effect; interactive content (project/post links) gets subtle, uniform
   micro-interactions; body text and metadata get nothing. Stillness around the
   active elements is what makes them pop.

4. **Navigation stays boring and reliable.** Ideas like glitch/RGB-split on the
   name and "letters fall off the page and follow the mouse on click" were
   considered and rejected as *default* behavior. For a portfolio whose job is
   to convert clients, primary interactions (reading, clicking through to
   projects/posts) must never be obstructed by a toy. Delight belongs in places
   that don't block the path to hiring.

5. **Accessibility is a craft signal, not an afterthought** — but it must not
   silently break the intended experience. An earlier `prefers-reduced-motion`
   rule set `animation: none`, which fully disabled the sweep on machines with
   reduce-motion enabled and read as a bug. Lesson recorded: if we re-add a
   reduced-motion fallback, it should *soften* (e.g. slow the sweep), not kill
   the signature outright.

## Rejected / parked ideas

These came up and were deliberately not shipped, kept here for future reference:

- **Glitch / RGB-split on the name** — fun and on-theme for an electronic-music
  angle, but stacking a second hover animation on the same element fought the
  rainbow sweep and broke it. One effect per element.
- **Letters detaching and following the cursor on click** — only acceptable as a
  scoped easter egg on a non-navigational element (e.g. the avatar), never on
  links.
- **Konami-code / view-source easter egg** — a good "dev wink" for this
  audience; parked, not built.
- **Staggered load reveal, avatar hover lift, link underline-draw,
  "available for work" status pill** — all tasteful, client-appropriate
  candidates if we want to add more later; intentionally deferred to keep the
  first pass restrained.

## Takeaway

The site commits to **refined minimalism with one playful signature**. The
restraint is the point: it reads as senior craft and taste to a client, while
the rainbow name rewards the curious without ever getting in anyone's way.
