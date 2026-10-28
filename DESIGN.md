# Design System: Geist

Local contract for this site. Agents implement with these tokens only. Prefer CSS variables `--ds-*` in code. Hex is the sRGB fallback. Do not invent nearby greys, type sizes, gaps, or radii. Do not use another company's wordmark, triangle, or product logo.

## 1. Visual Theme & Atmosphere

Monochrome engineering UI. One continuous canvas. Hierarchy from type, space, and 1px borders, not cards stacked on cards. Color is status and action only: blue for info and focus, red for error, amber for warning, green for success. Chrome stays grey.

- **Density:** 6 (product balanced). Dashboard body is 14px. Marketing copy may go 16px. Rows 48px or taller.
- **Variance:** 4 (predictable grid). Shared 12-column field. Visible guides only when the lines are part of the design.
- **Motion:** 2 (still by default). 150ms on hover and press. No scroll-reveal theatre, no bounce, no perpetual loops except Status Dot while `BUILDING` or `QUEUED`.

Light and dark are the same system with inverted ladders. Do not add glow, neon, gradient text, glass, or coloured light blobs.

## 2. Color Palette & Roles

Ten scales: `backgrounds`, `gray`, `gray-alpha`, `blue`, `red`, `amber`, `green`, `teal`, `purple`, `pink`. P3 (`oklch`) on supported displays; hex below is the fallback.

Each non-background scale has steps `100`–`1000`. The step is the job, not a lightness name:

| Step | Job |
| --- | --- |
| `100` | Default component background |
| `200` | Hover background |
| `300` | Active background |
| `400` | Default border |
| `500` | Hover border |
| `600` | Active border |
| `700` | High-contrast fill |
| `800` | Hover high-contrast fill |
| `900` | Secondary text and icons |
| `1000` | Primary text and icons |

Backgrounds:

- `--ds-background-100` — Default page and element ground. Put colour on this.
- `--ds-background-200` — Secondary ground, used sparingly.

Solid `gray-*` for text, icons, fills, borders, and dividers. `gray-alpha-*` only when the ground should show through (shadows, overlays, rings on mixed surfaces). Draw each border once. Keep shadows translucent so they do not leave a grey halo.

If a control sits on `background-100`, hover is `gray-100` and active is `gray-200`. Small chips may start at `gray-200` or `gray-300`.

### Light

- **Canvas** (`--ds-background-100`) `#FFFFFF` — Page ground
- **Wash** (`--ds-background-200`) `#FAFAFA` — Subtle second ground
- **Fill** (`--ds-gray-100`) `#F2F2F2` — Default control fill
- **Fill hover** (`--ds-gray-200`) `#EBEBEB`
- **Fill active** (`--ds-gray-300`) `#E6E6E6`
- **Line** (`--ds-gray-400`) `#EAEAEA` — Default 1px border
- **Line hover** (`--ds-gray-500`) `#C9C9C9`
- **Line active** (`--ds-gray-600`) `#A8A8A8`
- **Solid** (`--ds-gray-700`) `#8F8F8F` — High-contrast fill
- **Solid hover** (`--ds-gray-800`) `#7D7D7D`
- **Muted ink** (`--ds-gray-900`) `#4D4D4D` — Secondary text and icons
- **Ink** (`--ds-gray-1000`) `#171717` — Primary text and icons

Gray-alpha (light): `100 #0000000d`, `200 #00000015`, `300 #0000001a`, `400 #00000014`, `500 #00000036`, `600 #0000003d`, `700 #00000070`, `800 #00000082`, `900 #000000b3`, `1000 #000000e8`.

Accent 700 fills (light). Use the matching `100`–`300` tints for badge grounds and `900`/`1000` for text on those tints:

| Scale | `700` | Job |
| --- | --- | --- |
| Blue | `#006BFF` | Links, focus ring, info |
| Red | `#FC0035` | Error, destructive |
| Amber | `#FFAE00` | Warning |
| Green | `#28A948` | Success, ready |
| Teal | `#00AC96` | Alternate success / data |
| Purple | `#A000F8` | Paid / special product marks only |
| Pink | `#F22782` | Marketing mark only |

### Dark

- **Canvas** (`--ds-background-100`) `#0A0A0A` — Default raised ground
- **Void** (`--ds-background-200`) `#000000` — Deepest page ground. Allowed here. Do not use `#000000` as text.
- **Fill** (`--ds-gray-100`) `#1A1A1A`
- **Fill hover** (`--ds-gray-200`) `#1F1F1F`
- **Fill active** (`--ds-gray-300`) `#292929`
- **Line** (`--ds-gray-400`) `#2E2E2E`
- **Line hover** (`--ds-gray-500`) `#454545`
- **Placeholder** (`--ds-gray-600`) `#878787`
- **Solid** (`--ds-gray-700`) `#8F8F8F`
- **Solid hover** (`--ds-gray-800`) `#7D7D7D`
- **Muted ink** (`--ds-gray-900`) `#A1A1A1`
- **Lamp ink** (`--ds-gray-1000`) `#EDEDED`

Gray-alpha (dark): `100 #ffffff0f`, `200 #ffffff17`, `300 #ffffff21`, `400 #ffffff24`, `500 #ffffff3d`, `600 #ffffff82`, `700 #ffffff8a`, `800 #ffffff78`, `900 #ffffff9c`, `1000 #ffffffeb`. Prefer these rings on mixed dark surfaces instead of solid `gray-400`.

Accent 700 fills (dark):

| Scale | `700` | Job |
| --- | --- | --- |
| Blue | `#0072F5` | Links, focus ring, info |
| Red | `#E5484D` | Error, destructive |
| Amber | `#FFB224` | Warning |
| Green | `#45A557` | Success, ready |

Tailwind mapping when using shadcn tokens: `background` = `--ds-background-100`, `foreground` = `--ds-gray-1000`, `muted` = `--ds-gray-100`, `muted-foreground` = `--ds-gray-900`, `border` / `input` = `--ds-gray-400`, `ring` = `--ds-blue-700`, `primary` = `--ds-gray-1000` (inverted button, not blue), `destructive` = `--ds-red-700`. Blue is the focus and link colour, not the primary button fill.

## 3. Typography Rules

Geist Sans for UI, headings, body, labels, tables, KPIs. Geist Mono for code, commands, paths, raw tokens, timestamps, git refs, and short IDs only. Set only the identifier in mono, not the whole sentence.

```
--font-sans: "Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "Geist Mono", "SF Mono", Monaco, Consolas, monospace;
```

Weights: 400 body, 500 buttons and medium labels, 600 headings. Do not go above 600 for titles. Strong/Subtle modifiers are a nested `<strong>` inside a type class, not a new size.

CSS classes already pack size, line-height, tracking, and weight. Use them. Do not invent in-between sizes.

### Headings (`text-heading-*`, weight 600)

| Class | Size | Line | Tracking | Use |
| --- | --- | --- | --- | --- |
| `text-heading-72` | 72px | 72px | -4.32px | Marketing hero only |
| `text-heading-64` | 64px | 64px | -3.84px | Marketing display |
| `text-heading-56` | 56px | 56px | -3.36px | Marketing display |
| `text-heading-48` | 48px | 56px | -2.88px | Marketing sub |
| `text-heading-40` | 40px | 48px | -2.4px | Large page title |
| `text-heading-32` | 32px | 40px | -1.28px | Dashboard page title |
| `text-heading-24` | 24px | 32px | -0.96px | Section |
| `text-heading-20` | 20px | 26px | -0.4px | Nested / modal title |
| `text-heading-16` | 16px | 24px | -0.32px | Card title |
| `text-heading-14` | 14px | 20px | -0.28px | Small head |

### Copy (`text-copy-*`, weight 400, higher leading)

| Class | Size | Line | Use |
| --- | --- | --- | --- |
| `text-copy-24` | 24 / 36 | Marketing hero paragraph |
| `text-copy-20` | 20 / 36 | Marketing body |
| `text-copy-18` | 18 / 28 | Quotes |
| `text-copy-16` | 16 / 24 | Modals, spacious views |
| `text-copy-14` | 14 / 20 | Default product body |
| `text-copy-13` | 13 / 18 | Compact secondary |
| `text-copy-13-mono` | 13 / 18 | Inline code |

Max ~65ch on reading columns.

### Labels (`text-label-*`, weight 400, single line)

| Class | Size | Line | Use |
| --- | --- | --- | --- |
| `text-label-20` | 20 / 32 | Large marketing label |
| `text-label-18` | 18 / 20 | Pair with icons |
| `text-label-16` | 16 / 20 | Form titles (Strong) |
| `text-label-14` | 14 / 20 | Menus, most UI |
| `text-label-14-mono` | 14 / 20 | Pair with >14 text |
| `text-label-13` | 13 / 16 | Secondary line. Tabular numbers |
| `text-label-13-mono` | 13 / 20 | Pair with label 14 |
| `text-label-12` | 12 / 16 | Tertiary, calendar caps |
| `text-label-12-mono` | 12 / 16 | Kbd, chips |

### Buttons (`text-button-*`, weight 500)

| Class | Size | Line | Use |
| --- | --- | --- | --- |
| `text-button-16` | 16 / 20 | Large |
| `text-button-14` | 14 / 20 | Default |
| `text-button-12` | 12 / 16 | Inside an input only |

## 4. Spacing, radius, shadow

### Spacing

Base unit **4px**. Build from this ladder only:

| Token | Size | Use |
| --- | --- | --- |
| `1` | 4px | Icon optical nudge, kbd pad |
| `2` | 8px | Tight chip gap |
| `3` | 12px | Compact stack |
| `4` | 16px | Control pad, card inner |
| `6` | 24px | Default gap, page gutter |
| `8` | 32px | Large inner block |
| `10` | 40px | Control large height, section pad |
| `12` | 48px | Row height, major inner |
| `16` | 64px | Chapter break |
| `24` | 96px | Rare display lift |
| `32` | 128px | Footer lift |

Do not invent `5`, `7`, `9`. Default gap is 24px.

### Materials (radius + elevation)

On the page:

| Material | Radius | Use |
| --- | --- | --- |
| `material-base` | 6px | Everyday controls |
| `material-small` | 6px | Slightly raised |
| `material-medium` | 12px | Cards, further raised |
| `material-large` | 12px | Large raised tiles |

Floating:

| Material | Radius | Use |
| --- | --- | --- |
| `material-tooltip` | 6px | Lightest shadow. Only floating element with a triangular stem |
| `material-menu` | 12px | Menus, command palette |
| `material-modal` | 12px | Dialogs |
| `material-fullscreen` | 16px | Biggest lift |

Control radius is 6px (`rounded-md`). Cards and menus 12px. Search pills and badges may be `9999px`. Do not use 20px+ squircle cards.

Shadows are translucent. Dark pattern: 1px alpha-white ring plus soft black blur.

- Border ring: `0 0 0 1px var(--ds-gray-alpha-400)`
- Small: ring + `0 1px 2px #00000029`
- Medium: `0 2px 2px #00000052, 0 8px 8px -8px #00000029`
- Modal: further lift, same family

No drop-shadow as decoration. No opaque grey shadow.

## 5. Component Stylings

### Buttons

Sizes: tiny, small, medium (default), large. Heights ~32 / 40 / 48px. `text-button-14` at medium. Radius 6px.

Variants: `default` (primary), `secondary`, `tertiary`, `error`, `warning`. Not valid: `primary`, `success`, `ghost`, `violet` as type names.

- Default: inverted. Light = ink fill `#171717` and white text. Dark = lamp ink `#EDEDED` fill and black text. Hover slightly dims.
- Secondary: transparent / canvas fill, 1px ring (`gray-400` or gray-alpha), ink text.
- Tertiary: no ring until hover fill `gray-100`.
- Error: `red-700` fill. Warning: `amber-700` fill.
- Loading: keep the button, set `loading`. Do not swap in a free spinner.
- Icon-only: `svgOnly` + `aria-label` that names the action (`Copy page URL`), not the icon.
- Shape: `square` / `circle` for icon-only. `rounded` + `shadow` is marketing only.
- One default button per cluster. Labels are Title Case and name the outcome: `Save Changes`, not `Submit`.

### Inputs

Sizes small / medium / large. Label above (Title Case noun: `Project Name`). Placeholder is an example value, never an instruction. Error string below, sentence case, period, no “please”. Validate on blur. Prefix/suffix allowed. `SearchInput` for scoped search; `cmdk` shows ⌘K then Esc when dirty. Focus: 2px `blue-700` ring outside the 1px border. No floating labels. Do not wrap a labelled input in a Tooltip.

### Cards

Use only when elevation groups something spacing cannot. `background-100`, 12px radius, 1px line (`gray-400` or gray-alpha-200). Padding 16–24px. Title `text-heading-16`, meta `text-label-13` muted. No icon-on-top feature cards. No colour stripe.

### Badges

Static metadata. One per row. Title Case, one word when possible. Variants: `gray`, `blue`, `red`, `amber`, `green`, `purple`, `pink`, `teal`, plus `contrast="low"` for dense surfaces. Map: green healthy, red error, amber warning, blue info/production, gray neutral. Sizes sm / md / lg. Not clickable. Pills are links styled as chips, not badges.

### Status Dot

Job status only: `QUEUED`, `BUILDING`, `ERROR`, `READY`, `CANCELED`, `DELETED`. Animates while queued or building. Pair with a text label. Colour is not the only signal.

### Modal

`material-modal`, 12px. Header title `text-heading-20`, body `text-copy-14`. Actions: secondary Cancel left/first, default submit last. Sticky header/actions when content scrolls.

### Tooltip

`material-tooltip`, 6px, triangular stem. ~150ms delay. One sentence or fragment, sentence case. Explains why, not what. Escape closes.

### Skeleton

Matches the final box. Pill / rounded / squared to match the control. Shimmer `gray-100` to `gray-200`. Off under `prefers-reduced-motion`. Not an empty state. Spinner is for a single in-flight action. LoadingDots for indeterminate inline wait.

### Empty

One sentence on how to arrive at content. Secondary button if there is an action. No illustration kits, no emoji.

### Navbar / sidebar

Product: ~256px sidebar, hairline edge, items 36px tall, 8px radius, 14px muted. Active: `gray-100` fill + primary text. Marketing: 14px tabs, 2px bottom indicator in `gray-1000`. Minimum tap 44px on the menu control.

### Kbd

Mono 12px, `gray-100` fill, 1px ring, 4px radius, pad 2×6px.

## 6. Layout Principles

- Visible rule-and-cell grids only when the lines are part of the design. Plain Tailwind `grid` for ordinary card lists.
- Breakpoints for Grid: `sm` 1 col, `md` 2, `lg` 3 unless the content earns otherwise. Set `columns` and `rows` at all three.
- `solid` cells hide guides behind opaque tiles. Guides are decorative (`aria-hidden`).
- Do not nest Grid more than one level.
- Shared outer field: 12 columns desktop, 6 tablet, 4 mobile. Reading prose 6–7 columns. Tables and diagrams may use 12.
- Full-height stages: `min-h-[100dvh]` or `min-h-[100svh]`, never `h-screen`.
- Content max ~1400px. Gutters 24px.
- Align to a shared edge or baseline. Do not overlap text on images.
- No `calc()` percentage layout hacks.
- Collapse multi-column layouts below 768px. No horizontal scroll.

## 7. Motion & Interaction

Default is still. Motion explains a state change or confirms a press.

| Event | Spec |
| --- | --- |
| Colour / ring / fill hover | 150ms ease, `color`, `background-color`, `box-shadow` / `opacity` |
| Button press | 100–150ms, slight dim. No `scale(0)` |
| Tooltip | ~150ms delay in |
| Status Dot queued/building | Pulse until terminal |
| Skeleton | Shimmer, respect reduced motion |
| Modal / menu | Short fade + transform, origin the trigger |

Animate `transform` and `opacity` first. No `ease-in` on UI. No bounce, parallax, marquee, or typing cursors. Hover motion only inside `@media (hover: hover) and (pointer: fine)`. Keyboard and high-frequency actions: no animation.

## 8. Copy

Sentence case on headings and nav. Title Case on buttons, input labels, and badges. First person or product-direct. No “seamless”, “elevate”, “craft”, “journey”, “unleash”. No em dashes. Straight quotes. Destructive follows Verb + Noun and matches the toast (`Delete Project` then `Project deleted`).

## 9. Anti-Patterns (Banned)

- Invented hex, type sizes, gaps, or radii
- Inter, SUSE, Inria, Space Grotesk, generic Georgia/Times
- Heading weight above 600
- Blue (or any accent) as the default primary button
- Colour used as decoration. If it is not status, focus, or a link, it is grey
- Solid opaque shadows, outer glows, gradient headline fills, glass, blobs
- Centered eyebrow + dual CTA hero, bouncing scroll chevrons, “Scroll to explore”
- Three equal icon cards as a feature row
- Nested cards, borders used to fake hierarchy
- Emoji in UI. Use the site icon set
- Custom cursors
- Fake stats, fake logos, fake quotes
- `transition: all`, `scale(0)` entrances, animating `top` / `left` / `width` / `height`
- Another company's wordmark, triangle, or product logo
