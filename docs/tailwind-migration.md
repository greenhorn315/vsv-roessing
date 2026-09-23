# Tailwind/daisyUI migration – guide for converting components

Phase 1 (done) set up Tailwind CSS 4 + daisyUI 5 with the club theme `vsv`
in `src/styles/global.css`. The site renders pixel-identical to the pre-Tailwind
version. Phase 3 converts each component's scoped `<style>` to Tailwind
utilities and daisyUI components. This document is everything you need for that.

Goal per component: **delete the `<style>` block** (or shrink it to what
utilities genuinely cannot express), keep the look unchanged.

## How the cascade works now (read this first)

Order, weakest to strongest:

1. `@layer theme` – Tailwind theme variables
2. `@layer base` – Tailwind preflight, daisyUI base, our base rules (body,
   headings, focus ring, legacy compat rules, legacy `--c-*` tokens)
3. `@layer components` – legacy helper classes (`.container`, `.section`,
   `.eyebrow`, `.lead`, `.section-head`, `.visually-hidden`, `.skip-link`,
   `.reveal`)
4. `@layer utilities` – daisyUI components (in nested sub-layers, so they are
   weaker than plain utilities), our `@utility btn*` overrides, then all
   Tailwind utilities
5. **Unlayered CSS – every Astro scoped `<style>`**. It beats everything above,
   regardless of specificity.

Consequences:

- A utility class will **not** win against a property that the component's
  scoped CSS still sets for the same element. Convert an element completely
  (all its rules, including `:hover`, media queries, `:global(...)` rules
  targeting it) before you expect utilities to take effect.
- Utilities *do* override the legacy helper classes and daisyUI components,
  e.g. `class="btn btn-accent px-4"` or `class="section pt-0"` work.
- If you must keep a bit of scoped CSS that uses `@apply` or theme functions,
  start the `<style>` block with `@reference "../styles/global.css";`
  (adjust the relative path). Prefer plain `var(--color-…)` instead.

## Theme: colors

daisyUI theme colors (all usable as `bg-*`, `text-*`, `border-*`, `ring-*`,
`fill-*`, `stroke-*`, with opacity modifiers like `bg-primary/10`):

| Utility name | Value | Legacy token | Use |
|---|---|---|---|
| `primary` | `#14453D` | `--c-primary` | fir green, headings, dark bands |
| `primary-content` | `#FFFFFF` | – | text on primary |
| `secondary` | `#2F7A64` | `--c-primary-light` | lighter green, checkmarks |
| `neutral` | `#0D302A` | `--c-primary-dark` | darkest green |
| `accent` | `#C9401F` | `--c-accent-ink` | coral for text and buttons (AA with white) |
| `accent-content` | `#FFFFFF` | – | text on accent |
| `warning` | `#FFC857` | `--c-sun` | sun yellow (also available as `sun`) |
| `warning-content` | `#14453D` | – | |
| `base-100` | `#FFFFFF` | `--c-surface` | cards, surfaces |
| `base-200` | `#F5F8F6` | `--c-bg` | page background |
| `base-300` | `#EDF3EF` | `--c-surface-sunken` | sunken surfaces |
| `base-content` | `#1C2A24` | `--c-text` | body text |
| `info`/`success` | `#2F7A64` | – | same as secondary |
| `error` | `#C9401F` | – | same as accent |

Extra colors (`@theme`):

| Utility name | Value | Legacy token |
|---|---|---|
| `coral` | `#FF6B4A` – **decorative only**, 2.9:1 with white | `--c-accent` |
| `accent-hover` | `#A83217` | `--c-accent-ink-hover` |
| `sun` | `#FFC857` | `--c-sun` |
| `sun-dark` | `#A87B00` | `--c-sun-dark` |
| `sun-soft` | `#FFF6E5` | `--c-sun-soft` |
| `tint-green` | `#E7F0EA` | `--c-tint-green` |
| `tint-coral` | `#FFE9DE` | `--c-tint-coral` |
| `muted` | `#4B5D56` | `--c-text-muted` → `text-muted` |
| `on-dark` | `rgba(255,255,255,.88)` | `--c-text-on-dark` → `text-on-dark` |
| `border` | `#DCE6E1` | `--c-border` → `border-border` |
| `border-strong` | `#C3D3CB` | `--c-border-strong` → `border-border-strong` |

Note the trap: legacy `--c-accent` is the *bright decorative* coral
(`coral`), legacy `--c-accent-ink` is the theme's `accent`.
Per-sport colors (`--sport-color`, set inline) stay as they are:
`bg-(--sport-color)`, `text-(--sport-color)`.

## Typography

| Utility | Value | Legacy |
|---|---|---|
| `font-display` | Fraunces Variable + serif fallbacks | `--font-display` |
| `font-sans` (default on body) | Source Sans 3 Variable + system fallbacks | `--font-body` |
| `text-step--1` | `clamp(0.83rem, …, 0.89rem)` | `--step--1` |
| `text-step-0` | `clamp(1rem, …, 1.09rem)` (body size) | `--step-0` |
| `text-step-1` | `clamp(1.15rem, …, 1.35rem)` | `--step-1` |
| `text-step-2` | `clamp(1.35rem, …, 1.75rem)` | `--step-2` |
| `text-step-3` | `clamp(1.62rem, …, 2.35rem)` | `--step-3` |
| `text-step-4` | `clamp(2rem, …, 3.25rem)` | `--step-4` |

`text-step-*` sets only the font size, no line height (use `leading-*`).
Base styles already applied, don't repeat them: body is `font-sans
text-step-0 leading-[1.6] text-base-content bg-base-200`; `h1`–`h4` are
`font-display font-semibold text-primary leading-[1.15] text-balance
mb-[0.5em]` with sizes step-4…step-1 and `font-variation-settings: 'SOFT' 0,
'WONK' 0`; `p` has `mb-[1em] text-pretty`. Tailwind's default `text-sm`,
`text-xl` etc. still exist but are not part of the design – use the steps.

## Spacing, sizes, radii, shadows

Tailwind's 4px spacing scale (`--spacing: 0.25rem`) maps 1:1 onto the old
`--sp-*` tokens:

| Legacy | Value | Utility number (`p-`, `m-`, `gap-`, …) |
|---|---|---|
| `--sp-1` | 0.25rem | `1` |
| `--sp-2` | 0.5rem | `2` |
| `--sp-3` | 0.75rem | `3` |
| `--sp-4` | 1rem | `4` |
| `--sp-5` | 1.5rem | `6` |
| `--sp-6` | 2rem | `8` |
| `--sp-7` | 2.75rem | `11` |
| `--sp-8` | 4rem | `16` |
| `--sp-9` | 6rem | `24` |

Custom sizes:

- `py-section` / `pt-section` / `mb-section` … = `--section-y`
  (`clamp(3.5rem, 2rem + 6vw, 5.5rem)`)
- `h-header`, `top-header`, `scroll-mt-header` … = `--header-height` (72px)
- `max-w-site` = `--max-width` (1180px)

Radii (Tailwind's default radius scale was **replaced**, so `rounded-md`,
`rounded-xl` etc. do not exist):

| Utility | Value | Legacy |
|---|---|---|
| `rounded-sm` | 10px | `--radius-sm` |
| `rounded-box` | 16px (daisyUI) | `--radius` |
| `rounded-lg` | 28px | `--radius-lg` |
| `rounded-field` / `rounded-full` | pill | `--radius-pill` |
| `rounded-selector` | 10px (daisyUI badges, checkboxes) | – |

Shadows in the green tint: `shadow-sm`, `shadow-md`, `shadow-lg` (same values
as the legacy `--shadow-*`, same variable names).

Breakpoints: components use max-width queries at 560/620/700/720/760/780/800/
900/940px. Tailwind's defaults are sm 640, md 768, lg 1024, xl 1280. For
parity use arbitrary variants with the exact value, e.g. `@media (max-width:
900px)` → `max-[900px]:grid-cols-1`, `@media (min-width: 760px)` →
`min-[760px]:…`. Only switch to `md:`/`lg:` if the visual change is acceptable.

## Buttons (already migrated)

All buttons use daisyUI's `btn`, customized in `global.css` (`@utility btn`,
`btn-accent`, `btn-outline`, `btn-on-dark`, `btn-link`) to the club look:
pill, min-height 48px, padding 0.75rem 1.5rem, body font size, weight 600,
2px border, lifts 2px on hover, focus ring 3px accent.

| Old markup | New markup | Look |
|---|---|---|
| `btn btn--primary` | `btn btn-accent` | coral-ink bg, white, shadow-sm; hover `accent-hover` + shadow-md |
| `btn btn--secondary` | `btn btn-outline` | transparent, `border-strong` border, primary text; hover filled primary, white text |
| `btn btn--onDark` | `btn btn-on-dark` | white bg, primary text; hover sun |
| `btn btn--ghost` | `btn btn-link` | accent text, no padding-inline, no min-height; hover underline + `accent-hover` |
| `btn btn--outlineLight` | *unchanged*, still styled in `CallToAction.astro` | see below |

Still to do in phase 3:

- `CallToAction.astro`: `btn--outlineLight` (white outline on green) is styled
  by `.cta :global(.btn--outlineLight)`. Suggested replacement:
  `btn bg-transparent text-white border-white/45 hover:bg-white/12
  hover:border-white` (don't add `btn-outline`, its colors are for light
  backgrounds). Then delete the scoped rules.
- `Audiences.astro`: `.audience .btn-outline { margin-top: auto; background:
  var(--c-surface); border-color: transparent }` → `mt-auto bg-base-100
  border-transparent` on the link.
- `index.astro`: inline `style="margin-top:var(--sp-4)"` on the `btn-link` →
  `mt-4`.

Don't use `btn-primary` for the main call to action – `primary` is the green;
the coral CTA is `btn-accent`. Don't add sizes (`btn-sm`, `btn-lg`) without
checking, our `btn` override sets `height: auto; min-height: 48px`.

## Class name collisions resolved in phase 1

Tailwind/daisyUI define global classes with these names; the markup used them
for something else. Renamed (markup and scoped CSS, nothing else changed):

| Old class | New class | File |
|---|---|---|
| `hero` (daisyUI hero) | `site-hero` | `components/Hero.astro` (the `hero-*` children are fine) |
| `breadcrumbs` (daisyUI) | `site-breadcrumbs` | `components/Breadcrumbs.astro` |
| `filter`, `filter__label`, `filter__options`, `filter__status` (daisyUI filter) | `sport-filter`, `sport-filter__…` | `components/SportGrid.astro` |
| `status`, `status__*` (daisyUI status) | `sport-status`, `sport-status__*` | `pages/sportangebote/[slug].astro` |
| `steps`, `step`, `step__num` (daisyUI steps) | `membership-steps`, `membership-step`, `membership-step__num` | `components/Membership.astro` |
| `footer-title` (daisyUI footer) | `footer-heading` | `components/Footer.astro` |
| `btn`, `btn--*` | see button table | several |
| `container` (Tailwind utility) | kept; Tailwind's `container` is disabled via `@source not inline('container')` | `global.css` |

When you convert these components you may of course switch them to the
real daisyUI component (e.g. `breadcrumbs`, `steps`) if it matches the look –
or just drop the class once the styles are utilities.

**Before introducing any new semantic class name**, check it is not a
Tailwind utility or daisyUI class. daisyUI 5 names to avoid include: `alert`,
`avatar`, `badge`, `btn`, `card`, `carousel`, `chat`, `collapse`, `countdown`,
`diff`, `divider`, `dock`, `drawer`, `dropdown`, `fab`, `fieldset`, `filter`,
`footer`, `hero`, `indicator`, `input`, `join`, `kbd`, `label`, `link`,
`list`, `loading`, `mask`, `menu`, `modal`, `navbar`, `progress`, `radio`,
`range`, `rating`, `select`, `skeleton`, `stack`, `stat(s)`, `status`,
`steps`/`step`, `swap`, `tab(s)`, `table`, `textarea`, `timeline`, `toast`,
`toggle`, `tooltip`, `validator` (and their `-*` sub-classes such as
`card-title`, `footer-title`, `menu-title`). Tailwind utilities to avoid as
names: `hidden`, `block`, `flex`, `grid`, `table`, `sticky`, `fixed`,
`static`, `relative`, `container`, `collapse`, `visible`, `invisible`,
`truncate`, `italic`, `underline`, `uppercase`, `border`, `rounded`,
`shadow`, `ring`, `contents`, `isolate`. Quick check: build, then search
the generated `dist/_astro/BaseLayout.*.css` for `.<name>{`.

## Helper classes that still exist (legacy, `@layer components`)

| Class | Utility equivalent |
|---|---|
| `container` | keep using it (it's our site container: `w-full max-w-site mx-auto px-[clamp(1rem,4vw,1.5rem)]`) |
| `section` | `py-section` |
| `section--tight` | `pt-0 pb-section` |
| `section-head` | `max-w-[60ch] mb-11`; its `p`: `text-muted text-step-1 max-w-[58ch] mb-0` |
| `eyebrow` | `inline-block text-step--1 font-bold tracking-[0.08em] uppercase text-accent mb-3` |
| `lead` | `text-step-1 text-muted max-w-[46ch]` |
| `visually-hidden` | `sr-only` |
| `skip-link` | keep (global, in BaseLayout) |
| `reveal` / `is-visible` | keep (driven by the script in BaseLayout) |

## Preflight compatibility rules (in `@layer base`)

Tailwind's preflight resets browser defaults the old CSS relied on. These
base rules restore them, so the site stayed identical. They apply to
*every* element of that type, including newly converted ones – set the
utility explicitly when you don't want them:

- `ul, ol`: `list-style` and `padding-inline-start: 40px` restored, margin
  `0 0 1em` → add `list-none p-0 m-0` (or what you need) to styled lists.
- `a`: underlined → add `no-underline` where links shouldn't be underlined.
- `blockquote, figure`: margin `1em 40px`; `dd`: `margin-inline-start: 40px`;
  `dl`: `margin-block: 1em` → set `m-0` etc. explicitly.
- `button, input, select, textarea, option`: browser default margin,
  padding, border, radius and background restored (`revert`). daisyUI's
  `btn`, `input`, `select`, `textarea` override this; bare elements styled
  with utilities need explicit `border-0 bg-transparent p-0` etc.

`img, svg, video` are `display: block` (as before) and now
`vertical-align: middle` (Tailwind default; no visible change).

## What can be deleted once all components are converted

Check with `grep -rn "var(--c-\|var(--sp-\|var(--step-\|var(--radius\b\|var(--radius-pill\|var(--max-width\|var(--header-height\|var(--section-y\|var(--font-body\|var(--focus-ring" src`
(and `stroke="var(--c-accent)"` in `Hero.astro` → `stroke="var(--color-coral)"`).
When nothing matches, delete in `global.css`:

1. The whole “Alte Tokens” `:root` block (`--c-*`, `--focus-ring` can stay
   inlined in the focus rule, `--font-body`, `--step-*`, `--sp-*`,
   `--section-y`, `--radius`, `--radius-pill`, `--max-width`,
   `--header-height`). Keep `--root-bg`. `--radius-sm`, `--radius-lg`,
   `--shadow-*`, `--font-display` are real theme variables – keep.
2. From `@layer components`: `.section`, `.section--tight`, `.section-head`,
   `.eyebrow`, `.lead` (once no markup uses them), `.visually-hidden`
   (after replacing with `sr-only` in `HeroKarussell.astro` and elsewhere).
   `.container`, `.skip-link`, `.reveal` may stay (or become `@utility`).
3. The preflight compatibility rules (lists, links, blockquote/figure/dl/dd,
   form controls) – only after every list, link and form control has its own
   utilities; then re-check the screenshots.
4. `btn--outlineLight` rules once CallToAction is converted.

## Verifying

- `npm run build` must pass (includes `astro check`).
- Visual parity: `npm run build && npm run screenshots -- <dir>` and compare
  with the baseline screenshots (same file names). Pitfalls seen in phase 1:
  - Astro 7's `astro preview` keeps running in the background after the
    script ends and is shared by port/lock. If port 4399 is taken by another
    checkout's preview, you screenshot *that* build. Run
    `npx astro preview stop` before and after, and check `curl
    localhost:4399/` serves your build.
  - Images below the fold are lazy-loaded; the `kontakt` venue photos
    sometimes show the placeholder in one run and the photo in the next.
  - The Fraunces `<link rel="preload">` (added in phase 1) changes when the
    heading font arrives; on some mobile pages this shifts text by 1–5px in the
    screenshots compared to the old baseline. Without the preload the
    Tailwind setup is pixel-identical on all pages.
- Also check hover and keyboard focus (Tab) of anything interactive – the
  screenshots don't cover those states.
