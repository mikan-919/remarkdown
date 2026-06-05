# remarkdown

A side-by-side Markdown translation editor. Write or paste Markdown on the left; the right pane shows the translated output in real time, powered by Gemini.

## Features

- Monaco-based editor with syntax highlighting
- Auto-detects the source language (displays as a BCP-47 label above the left pane)
- Translates to any of 8 supported target languages: Japanese, English, Simplified Chinese, Traditional Chinese, Korean, French, German, Spanish
- Preserves all Markdown syntax and skips code blocks
- Copy-to-clipboard button on the output pane
- 2-second debounce + rate limiter to avoid hammering the API

## Quick start

```bash
# 1. Install dependencies
bun install

# 2. Set your Gemini API key
echo "GEMINI_API_KEY=your-key-here" > .env.local

# 3. Start the dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key (used server-side only) |

## Tech stack

- **Next.js 16** (App Router, Server Actions)
- **React 19** with Jotai for state
- **Monaco Editor** (`@monaco-editor/react`)
- **Google Gemini** (`gemini-3.1-flash-lite`) for translation
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Biome** for linting and formatting

## Scripts

```bash
bun dev       # start dev server
bun build     # production build
bun start     # start production server
bun lint      # lint with Biome
bun format    # format with Biome
```

## Project structure

```
src/
  app/
    actions/translate.ts   # Server Action — calls Gemini API
    page.tsx               # Root layout with left/right panes
  components/
    Pane.tsx               # Editor/preview pane wrapper
    LeftEditor.tsx         # Monaco editor (input)
    RightEditor.tsx        # Markdown preview (output)
    LanguageBar.tsx        # Language selector and detected-language display
    CopyButton.tsx         # Copy output to clipboard
  hooks/
    useTranslate.ts        # Debounced translation trigger
  lib/
    atoms/                 # Jotai atoms (editor content, language, progress)
    rateLimiter.ts         # Client-side rate limiter
```
