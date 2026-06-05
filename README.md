# Abrar Jahin — Portfolio

Personal portfolio built with Next.js, statically exported and deployed to [abrar.com.bd](https://abrar.com.bd).

[![Live Site](https://img.shields.io/badge/Live_Site-abrar.com.bd-ca3600?style=flat-square&logo=vercel&logoColor=white)](https://abrar.com.bd)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Markdown](https://img.shields.io/badge/Markdown-Supported-000000?style=flat-square&logo=markdown&logoColor=white)](https://www.markdownguide.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white)](https://pages.github.com)

---

## Overview

A fully static portfolio site generated at build time from local Markdown files. No CMS, no database, no runtime server. Every page is pre-rendered HTML, which means fast loads, clean SEO, and zero hosting cost on a CDN.

The design uses a warm "paper and ink" identity extracted from the brand cover art: cream paper surface, warm near-black ink, and one committed burnt-orange accent (`#ca3600`). The hero features an ink-sketch portrait rendered with `mix-blend-mode: multiply` so the white plate drops out cleanly against the paper background.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Styling | Tailwind CSS v4 with OKLCH design tokens |
| Typography | Bricolage Grotesque + JetBrains Mono |
| Animation | GSAP 3 (marquee, scroll-triggered reveals, SVG draw) |
| Content | Local Markdown with gray-matter frontmatter |
| Markdown rendering | marked + remark + sanitize-html + highlight.js |
| Icons | simple-icons CDN |
| SEO | JSON-LD structured data on every page |
| Deployment | GitHub Actions → GitHub Pages |

---

## Features

- **Fully static** — 22 pages pre-rendered at build time, zero JavaScript required for initial paint
- **Markdown content system** — projects, articles, and achievements are plain `.md` files in `content/`
- **Intro animation** — SVG line-draw loader plays once per browser session; a pre-paint script prevents any flash on repeat loads
- **GitHub contribution graph** — orange-ramp heatmap generated client-side from deterministic random seed data
- **Contact form** — Google Forms iframe target, no backend needed
- **JSON-LD** — `Person`, `Portfolio`, `Article`, `Project`, and `Achievement` schemas on every applicable page
- **SEO-ready** — `generateStaticParams` on all dynamic routes, OpenGraph and Twitter card metadata
- **Skill icons** — verified simple-icons CDN slugs with initials fallback for unmapped technologies

---

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── layout.js               # Root layout: fonts, JSON-LD, page loader
│   ├── page.js                 # Home page (assembles all home sections)
│   ├── globals.css             # Design tokens (OKLCH), textures, content styles
│   ├── _HeroSection.js         # Sketch portrait + brand marks
│   ├── _ProjectsSection.js
│   ├── _Skills.js
│   ├── _AchievementsSection.js
│   ├── _ArticlesSection.js
│   ├── _GithubContributionGraph.js
│   ├── _MarqueeOfSkills.js
│   ├── _ContactSection.js
│   ├── projects/               # /projects + /projects/[slug]
│   ├── articles/               # /articles + /articles/[slug]
│   └── achievements/           # /achievements + /achievements/[slug]
│
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── PageLoader.js           # Session-aware one-shot intro
│   ├── Loader.js               # GSAP SVG draw animation
│   ├── AbrarLineArt.js         # "ABRAR" lettering SVG paths
│   ├── AchievementsTimeline.js # Alternating desktop / stacked mobile
│   └── SVGS.js                 # Social + individual icon components
│
├── content/
│   ├── projects/               # One .md per project
│   ├── articles/               # One .md per article
│   └── achievements/           # One .md per achievement
│
├── lib/
│   ├── config.js               # Site URL, metadata, author
│   ├── projects.js             # File-system content loader
│   ├── articles.js
│   ├── achievements.js
│   ├── github.js               # Contribution data generator + color ramp
│   ├── jsonld-schemas.js       # All JSON-LD schema builders
│   ├── contactDetails.js
│   ├── social-links.js
│   └── utils.js
│
└── public/
    └── assets/images/me/       # abrar_sketch_black.png, hero photos, OG image
```

---

## Content Management

All content lives in `content/` as Markdown with YAML frontmatter. No build step beyond `npm run build` is needed after editing.

### Adding a Project

Create `content/projects/YYYY-MM-DD-project-slug.md`:

```yaml
---
name: "Project Name"
description: "One-sentence description."
image: "/assets/images/uploads/project-screenshot.png"
category: "Web App"
tags: ["Next.js", "PostgreSQL"]
featured: true
live_url: "https://example.com"
code_link: "https://github.com/ajpalok/project"
---

Markdown body with full project detail...
```

### Adding an Article

Create `content/articles/YYYY-MM-DD-article-slug.md`:

```yaml
---
title: "Article Title"
description: "Short description for cards and SEO."
date: "2026-01-15"
author: "Abrar Jahin"
image: "/assets/images/uploads/cover.png"
tags: ["Next.js", "Performance"]
---

Markdown body...
```

### Adding an Achievement

Create `content/achievements/achievement-slug.md`:

```yaml
---
title: "Award or Certification Title"
issuer: "Issuing Organization"
issuer_url: "https://example.com"
date_start: "2025-08"
category: "Certification"   # Certification | Academic | Competition
credential_url: "https://credential-link.com"
tags: ["System Design", "Software Development"]
---

Optional detail body...
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Development

```bash
git clone https://github.com/ajpalok/portfolio-nextjs.git
cd portfolio-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

The static site is exported to `dist/`. Serve it locally with any static server:

```bash
python -m http.server 4173 --directory dist
# or
npx serve dist
```

---

## Deployment

The site deploys automatically via GitHub Actions on every push to `main`. The workflow builds the static export and pushes it to the `gh-pages` branch, which is served at [abrar.com.bd](https://abrar.com.bd) via a custom domain.

The workflow file lives at `.github/workflows/`.

---

## Design System

The palette is defined as OKLCH tokens in `app/globals.css` and consumed through Tailwind's `@theme` block:

| Token | Role | Approx. Hex |
|---|---|---|
| `--color-paper` | Page background | `#f7f2ea` |
| `--color-paper-2` | Raised panels | `#efe7da` |
| `--color-panel` | Inset cards | `#e6dac9` |
| `--color-ink` | Primary text | `#241d18` |
| `--color-ink-2` | Body / muted text | `#5a4d42` |
| `--color-ink-3` | Labels / captions | `#8a7b6c` |
| `--color-line` | Borders | `#ddccb8` |
| `--color-accent` | Brand orange | `#d24e1d` |
| `--color-accent-tint` | Faint orange wash | `#f6e3d4` |

Texture utilities:

- `.bg-blueprint` — faint orange grid, 30px pitch
- `.bg-blueprint-fine` — faint ink grid, 22px pitch
- `.bg-halftone` — radial dot pattern using accent color
- `.ink-on-paper` — sets `mix-blend-mode: multiply` for sketch images

---

<p align="right">
  <a href="https://abrar.com.bd">abrar.com.bd</a> &nbsp;·&nbsp;
  <a href="https://github.com/ajpalok">@ajpalok</a> &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/ajpalok">LinkedIn</a>
</p>
