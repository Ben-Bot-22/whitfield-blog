# Avatar slingshot + pinball — whitfield.dev

_The homepage avatar is a hidden toy: grab it, pull it back like a slingshot,
and fling it. It rockets across the screen trailing a cyan comet, spins, and
**pinballs off the page's text** — each block it hits flashes a rainbow colour,
gets shoved, and pops a `+N` score. Then it spins upright and springs home.
It always returns to its slot, so it never breaks the page for a client._

All of it lives in two places: the inline `<script>` at the bottom of
`src/pages/index.astro` and the `.avatar` / `.avatar-streak` / `.text-bumped` /
`.hit-score` rules in `src/styles/global.css`. No libraries — vanilla canvas +
`requestAnimationFrame`. It's the deliberate "one loud, playful surprise" called
out in `interactive-design.md`, scoped to the avatar because it's
non-navigational and self-healing.

## Behaviour

- **Drag** the avatar away from its home centre: it follows with a rubber-band
  that saturates at `MAX_PULL` (140px, via `tanh`) and cocks/tilts toward the pull.
- **Release** → slingshot launch: it fires back through home in the **opposite**
  direction, and **launch speed is purely proportional to how far it was pulled
  from centre** (`disp / MAX_PULL × MAX_SPEED`). Small pull = gentle, full pull = ~180px/frame.
- **Flight**: pure momentum, no gravity. Bounces off all four viewport walls and
  off text (see Pinball). Spins freely, lightly damped.
- **Tap** (pull < 8px): no fling, just a small squish.
- **Settle**: once slow, the spin momentum is dropped and it eases to the nearest
  upright, springing back into its slot. Cleared trail, transform reset.

## Architecture

A single `tick(now)` rAF loop drives a state machine:
`idle → dragging → flying → settling → idle`. One `rafId` guards against stacked
loops. `render()` is the **only** writer of the avatar's inline `transform`
(`translate3d(...) rotate(...) scale(...)`), computed from `pos`/`angle` in
viewport coordinates relative to the avatar's in-flow home rect — so the header
never reflows while it flies.

## Subsystems & the reasoning behind each

- **Continuous collision (sub-stepping).** A fast fling moves up to ~360px in one
  frame, which tunnels straight through walls and text if you only test the end
  position. The flight loop advances in chunks no longer than `~0.6×R` and runs
  wall + text collision at each chunk. This is what makes it reliably hit "Ben
  Whitfield" on a hard first shot.

- **Spin: free in flight, momentum-killed on settle.** Flight spin is barely
  damped so it keeps spinning; wall/text hits kick extra spin. The hard lesson:
  any approach that *preserves* that angular momentum into the homecoming reads as
  an unwanted fast spin (a stiff spring even overshoots into a full 360). Fix:
  on entering `settling`, set `angVel = 0` and do a plain, slow, monotonic ease to
  the nearest upright (`ANG_SLEW`) — it can never rotate >180° or speed up.

- **Trail (cyan V on a `<canvas>`).** A full-viewport canvas at `z-index:-1`
  (guaranteed behind the avatar — a CSS `clip-path` wedge was abandoned after it
  silently rendered nothing in some browsers). Each frame it draws one filled
  triangle: a narrow base (`STREAK_BASE_HALF`, kept < the image radius) at the
  avatar, tapering to a point opposite travel. Both **opacity and length scale
  with speed**, so it fades and shrinks out smoothly instead of popping off, while
  keeping a short stub while moving. Cleared on grab/settle so it never detaches.

- **Pinball: reactive text.** Targets: `.site-title, .site-roles, .site-intro,
  .contact-link, .section-title, .project-item, .post-item`. Collision is against
  the **real text extent**, not the block box — each target's `Range.getClientRects()`
  gives one tight rect per line, so the avatar passes through the empty right side
  of short labels (e.g. "Get in touch") and only bounces on actual letters. On a
  hit: reflect velocity about the surface normal (+ spin kick), shove the text
  ~12px along the ball's travel and spring it back, flash the whole block (and the
  gradient name, via `-webkit-text-fill-color`) the next **rainbow** colour, and
  pop a rising `+N` score in that colour at the contact point. Rainbow + score
  reset each fling; a per-block cooldown stops strobing.

## Hard-won gotchas (read before debugging)

- **`prefers-reduced-motion`.** This whole toy was once gated behind it, which
  meant it was invisible/slow on Ben's Mac (Reduce Motion is ON there — see the
  `env-reduce-motion` memory). It is now **ungated**: the toy is entirely
  user-initiated (you must grab and throw it), so it plays for everyone. If you
  re-add any reduced-motion softening, don't let it silently disable the effect.
- **Verify by rendering, not building.** A clean `npm run build` says nothing
  about whether pixels appear. Drive a real browser (and emulate Reduce Motion).
- **Stale dev servers.** Editing the inline script and not seeing changes is
  almost always an old `npm run dev` serving cached code on another port. Kill
  them (`pkill -f "astro dev"`) and hard-refresh.

## Tunables (top of the `index.astro` script block)

`MAX_PULL`, `MAX_DRAG_TILT`, `FLING_THRESHOLD`, `MAX_SPEED`, `SPIN_FROM_SPEED`,
`MAX_ANGVEL`, `RESTITUTION`, `DAMPING`, `ANG_DAMPING`, `SPIN_IMPACT`, `ANG_SLEW`,
`SETTLE_ENERGY`, `SPRING_K/DAMP`; streak: `STREAK_STOP_SPEED`, `STREAK_FULL_SPEED`,
`STREAK_LEN_PER_SPEED`, `STREAK_MIN_LEN`, `STREAK_MAX_LEN`, `STREAK_BASE_HALF`,
`STREAK_ALPHA`; pinball: `BUMP_PUSH`, `BUMP_COOLDOWN`, `HIT_COLORS`.
