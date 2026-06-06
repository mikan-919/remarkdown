---
name: remarkdown
version: 1.0.0
description: Design axioms for the Remarkdown markdown translation editor
---

# DESIGN.md — Remarkdown

## Identity

Remarkdown is a dual-pane Markdown translation editor. The aesthetic is **editorial monochrome with a single cold-blue accent**. Everything that isn't structural is invisible. Everything that is structural is sharp.

---

## Axioms

### A1 — Monochrome first, accent by exception

The palette is a greyscale ramp. Colour appears only as `prism` (the accent), and only to mark **interactive intent** or **active state**. If something isn't clickable, selected, or in progress, it has no colour.

### A2 — The accent is one hue, two weights

`prism` (`#5570c5`) is the lighter interactive form. `depth` (`#2e4296`) is the heavier structural form (borders, cursor, strings). They are never mixed arbitrarily — prism is for hover/action, depth is for emphasis.

### A3 — Dark mode is exact inversion, not repainting

Light and dark share the same token names. Dark mode swaps values symmetrically:
- `black ↔ white`, `ink ↔ cloud`, `ash ↔ smoke` (the monochrome axis inverts)
- `prism ↔ depth` (the accent pair swaps roles)
- Soft neutrals (`dusk`, `fog`, `veil`, `ghost`, `tint`) each have a computed inverse, not a separate design decision

New components must not introduce new colours. They must pull from the existing ramp.

### A4 — Borders are 2px on primary edges, 1px on secondary

Pane outer borders: `border-2` (`2px`). Internal dividers: `border` (`1px`). Both use `border-prism`. This creates a clear hierarchy of containment without shadow.

### A5 — Typography is weight, not size

The display typeface is **Elms Sans**. Headings, labels, and buttons all share `font-black` (`900`) with `tracking-tighter`. Size varies only to express layout role (e.g. `text-6xl` for the language bar header). The monospace stack — **UDEV Gothic NF** for CJK-aware editing, **JetBrains Mono** as fallback — is used exclusively inside the editor.

### A6 — Interaction is fill-inversion

Buttons rest as `bg-cloud text-prism border-2 border-prism`. On hover/active they invert: `bg-prism text-white`. No intermediate states. No shadows on hover. `active:scale-95` provides physical feedback.

### A7 — Motion is minimal and purposeful

Three named animations exist:
- `fade-up` (0.4s, ease-out): content appearing from below — used for progressive disclosure
- `shimmer` (2s, linear): loading state gradient sweep
- `dot-bounce` (1.4s, staggered): in-progress indicator

Duration is always ≤ 400ms for UI transitions (`transition-all duration-200`). Nothing animates for decoration.

### A8 — Gutters are structural decoration

The left and right gutters carry the `gutter-pattern` — a 1px diagonal stripe at `opacity-40` using `depth`. Vertical text labels (`src` / `out`) use `tracking-[0.25em]` uppercase in `haze`. Attribution text uses `text-[9px] tracking-widest uppercase` in `prism`. Gutters must never compete with the editor content.

### A9 — Scrollbars are invisible until needed

Custom scrollbars: `width: 4px`, thumb in `fog`, no track background. Hover shifts thumb to `dusk`. Scrollbars are a utility, not a design element.

### A10 — No border-radius on structural surfaces

Panes, dropdowns, and buttons use `rx=0` / no `rounded-*`. The only rounded elements are the 2px scrollbar thumb and the 3px dot-bounce indicators. Sharpness communicates precision.

---

## Colour tokens

```
Monochrome (light → dark)
  black   #000000   Absolute black
  ink     #111111   Body text
  ash     #252525   Active line numbers, strong emphasis
  smoke   #e2e2e2   Borders, guides
  cloud   #f7f7f7   Page background, editor background
  white   #ffffff   Absolute white

Accent
  prism   #5570c5   Interactive / hover state
  haze    #bec9ea   Selection background
  depth   #2e4296   Structural emphasis, cursor, string tokens

Soft neutrals
  dusk    #909090   Comments (italic), scrollbar thumb hover
  fog     #bbbbbb   Line numbers, scrollbar thumb, inactive caret
  veil    #f6f6f6   Line highlight background
  ghost   #fefefe   Near-white surface
  tint    #eef0fa   Inactive selection, bracket match background
```

---

## Typography

| Role | Font | Weight | Size | Tracking |
|---|---|---|---|---|
| Display / UI labels | Elms Sans | 900 (black) | `text-6xl` | `tracking-tighter` |
| Dropdown items | Elms Sans | 900 (black) | `text-sm` | `tracking-wide` |
| Gutter labels | Elms Sans | 900 (black) | `text-sm` | `tracking-[0.25em]` |
| Gutter attribution | Elms Sans | 400 | `text-[9px]` | `tracking-widest` |
| Editor (CJK) | UDEV Gothic NF | 400 / 700 | Monaco default | — |
| Editor (Latin fallback) | JetBrains Mono | 400 | Monaco default | — |

---

## Layout

The app is a single full-viewport grid (`h-dvh overflow-hidden`):

```
col 1       col 2–3     col 4–5     col 6
[gutter L]  [pane L  ]  [pane R  ]  [gutter R]
```

- Gutters: decorative, contain vertical text and (right gutter) the copy button
- Panes: `flex flex-col`, header (`shrink-0`) + editor (`flex-1 min-h-0`)
- No padding on `body`; all spacing is internal to components

---

## Component states reference

### Button (CopyButton / primary action)

| State | Classes |
|---|---|
| Default | `border-2 border-prism bg-cloud text-prism` |
| Hover | `hover:bg-prism hover:text-white` |
| Active | `active:scale-95` |
| Confirmed (copied) | `border-prism bg-prism text-white` |
| Disabled | `opacity-25 cursor-not-allowed` |

### Dropdown (RightLanguageBar)

| State | Classes |
|---|---|
| Closed | `opacity-0 scale-y-90 -translate-y-1 pointer-events-none` |
| Open | `opacity-100 scale-y-100 translate-y-0 pointer-events-auto` |
| Item default | `text-ink hover:bg-veil hover:text-prism` |
| Item selected | `text-prism bg-tint` |

### Language bar label (LeftLanguageBar)

| State | Display |
|---|---|
| `wait` | `—` in `fog` |
| `progress` | Three `prism` dots, `dot-bounce` animation |
| resolved | Language name in `ink` |
