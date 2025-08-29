# Mohamed Sharif — Developer Portfolio (Vite + React + Tailwind v4)

Fast, clean, and responsive portfolio showcasing projects like **iMenu**, **TAP Careers**, **SUM**, and **RIS**, built with **Vite**, **React**, and **Tailwind CSS v4**, and deployed via **GitHub Pages**.

> 🔗 **Live:** https://mhmdtshref.github.io/
> 🧰 **Stack:** React, Vite, Tailwind v4, Framer Motion, lucide-react

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Content Model](#content-model)
- [Getting Started](#getting-started)
- [Build & Deploy (GitHub Pages)](#build--deploy-github-pages)
- [Configuration (Tailwind v4)](#configuration-tailwind-v4)
- [SEO](#seo)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Credits](#credits)

---

## Features
- ⚡️ **Blazing dev/build** with Vite
- 🌓 **Dark/Light toggle** (persists via `localStorage`, overrides OS)
- 🧩 **Single `data` object** controls all content (easy updates)
- 🖼️ **Drop-in assets** from `/public` (headshot & resume)
- 📱 **Responsive** layout with a modern, minimal aesthetic
- 🚀 **One-click deploy** to GitHub Pages (Actions workflow included)

---

## Screenshots
> Add your own images under `./screenshots` and update these paths.

| Hero (Light) | Hero (Dark) |
| --- | --- |
| ![Hero Light](screenshots/hero-light.jpg) | ![Hero Dark](screenshots/hero-dark.jpg) |

---

## Tech Stack
- **Frontend:** React, Framer Motion, lucide-react  
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)  
- **Tooling:** Vite  
- **Deploy:** GitHub Pages (Actions)

---

## Project Structure
```
.
├─ public/
│  ├─ personal.png                   # headshot
│  └─ Mohamed_Sharif_Resume.pdf      # resume
├─ src/
│  ├─ index.css                      # Tailwind + base theme layer
│  ├─ main.jsx                       # React entry (imports index.css)
│  └─ Portfolio.jsx                  # main component + data object
├─ tailwind.config.js                # Tailwind config (darkMode: 'class')
├─ postcss.config.js                 # uses '@tailwindcss/postcss'
├─ vite.config.js                    # set base for Pages project sites
└─ .github/workflows/deploy.yml      # GitHub Pages workflow
```

---

## Content Model
All portfolio content lives in the **`data`** object at the top of `src/Portfolio.jsx`. Edit these fields to update the site:

```js
const data = {
  name: "Mohamed Sharif",
  title: "Full-Stack JavaScript Engineer",
  tagline: "I build fast, reliable web apps with Next.js, Node.js, MongoDB & AWS.",
  summary: "6+ years building, testing, and deploying production web apps...",
  location: { city: "Hebron", country: "Palestine" },

  photoUrl: import.meta.env.BASE_URL + "personal.png",
  contact: { email: "you@example.com", phone: "+970 ..." },

  social: {
    github: "https://github.com/<user>",
    linkedin: "https://www.linkedin.com/in/<user>/",
    x: "https://x.com/<user>",
    dribbble: "https://dribbble.com/<user>",
    website: "https://<legacy-or-personal-site>",
  },

  highlights: ["Next.js","React","Node.js","MongoDB","AWS","Vercel","Clerk","GitHub Actions","Datadog","HubSpot APIs"],

  projects: [
    {
      name: "iMenu (QR Menu SaaS)",
      description: "Create & manage online menus with QR codes and theme library...",
      impact: ["Reduced menu changes from days to minutes.","Template marketplace for developers."],
      stack: ["Next.js","Lambda","CloudFront","MongoDB","Handlebars"],
      links: [/* { label: "Live", href: "..." } */],
      image: import.meta.env.BASE_URL + "images/imenu.jpg" // place file in /public/images
    },
    // ...TAP Careers, SUM, RIS
  ],

  experience: [ /* period, company, role, points, stack[] */ ],
  education:  [ /* school, degree, period */ ],

  resumeUrl: import.meta.env.BASE_URL + "Mohamed_Sharif_Resume.pdf",
};
```

> **Tip:** Use `import.meta.env.BASE_URL` for all public asset paths so they work under the GitHub Pages subpath.

---

## Getting Started

### Prerequisites
- **Node.js**: 22.12+ (or 20.19+)
- **npm**: 9+

### 1) Install & Run (development)
```bash
npm ci        # or: npm install
npm run dev   # starts Vite at http://localhost:5173
```

### 2) Project Assets
Place your files in `public/`:
```
public/
  personal.png                 # headshot
  Mohamed_Sharif_Resume.pdf    # resume
```
Reference them in `src/Portfolio.jsx` using the Pages-safe base path:
```js
photoUrl: import.meta.env.BASE_URL + 'personal.png',
resumeUrl: import.meta.env.BASE_URL + 'Mohamed_Sharif_Resume.pdf',
```

### 3) Production Build
```bash
npm run build   # outputs static site to /dist
```

---

## Build & Deploy (GitHub Pages)

There are two Page types. Pick the one that fits your repo:

- **Project site** (most common): `https://<username>.github.io`
- **User/Org site** (special): repo name **must** be `<username>.github.io` → `https://<username>.github.io/`

### 1) Configure Vite base (project sites only)
If your repo is **not** `username.github.io`, set a base path so assets resolve under the subfolder:

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<REPO_NAME>/', // ← replace with your repository name
})
```

> In code, reference files from `/public` using:
> ```js
> photoUrl: import.meta.env.BASE_URL + 'personal.png'
> ```

### 2) Add the GitHub Actions workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - id: deploy
        uses: actions/deploy-pages@v4
```

### 3) Enable Pages
- Go to **Repo → Settings → Pages**.
- Set **Source = GitHub Actions**.

### 4) Visit your site
- **Project site:** `https://<username>.github.io/<REPO_NAME>/`
- **User site:** `https://<username>.github.io/`

> If the site loads but images/CSS 404 on a project site, your `base` in `vite.config.js` is wrong or missing.

### (Optional) Custom domain
- Add your domain in **Settings → Pages**.
- Commit a `public/CNAME` file containing just your domain (e.g., `portfolio.example.com`).
- Wait for DNS to propagate.

---

## Configuration (Tailwind v4)

**postcss.config.js**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**tailwind.config.js**
```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables the manual theme toggle
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

**src/index.css**
```css
@import "tailwindcss";

/* Ensure the entire page follows the theme toggle */
@layer base {
  html, body, #root { height: 100%; }
  body { @apply bg-white text-black; }
  .dark body { @apply bg-[#0b0d10] text-white; }
}
```

> If you ever relocate the Tailwind config, hint it (after the import) with:
> ```css
> @config "../tailwind.config.js";
> ```

---

## SEO

Add/update in `index.html`:

```html
<title>Mohamed Sharif — Full-Stack JavaScript Engineer | Portfolio</title>
<meta name="description" content="Portfolio of Mohamed Sharif, a full-stack JavaScript engineer specializing in Next.js, Node.js, MongoDB, and AWS. Creator of iMenu and contributor to TAP Careers." />
<link rel="canonical" href="https://<username>.github.io/<REPO_NAME>/" />
```

Open Graph / Twitter (optional but recommended):
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Mohamed Sharif — Portfolio" />
<meta property="og:description" content="Full-stack JavaScript engineer. Projects: iMenu, TAP Careers, SUM, RIS." />
<meta property="og:url" content="https://<username>.github.io/<REPO_NAME>/" />
<meta property="og:image" content="https://<username>.github.io/<REPO_NAME>/og.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Mohamed Sharif — Portfolio" />
<meta name="twitter:description" content="Full-stack JavaScript engineer. Projects: iMenu, TAP Careers, SUM, RIS." />
<meta name="twitter:image" content="https://<username>.github.io/<REPO_NAME>/og.jpg" />
```

---

## Troubleshooting

**Pages deploy succeeds but site shows no styling**
- Ensure `dist/` exists in the build job and is uploaded via `actions/upload-pages-artifact`.
- Confirm **Settings → Pages → Source** is **GitHub Actions** (not branch).
- Clear your browser cache or do a hard refresh.

**Assets 404 on GitHub Pages**
- For project sites, `vite.config.js` must include `base: '/<REPO_NAME>/'`.
- Use `import.meta.env.BASE_URL + 'filename'` for assets referenced in code.

**Dark/Light toggle only changes scrollbar**
- Tailwind must be in class mode (`darkMode: 'class'`).
- `src/index.css` should include the base `@layer` rules above.
- Verify the toggle adds/removes the `dark` class on `<html>`.

**Workflow doesn’t trigger**
- File path must be `.github/workflows/deploy.yml`.
- Branch name must match (`main` vs `master`).
- Indentation must be spaces (no tabs).

**Node version errors**
- Use Node **22.12+** (or **20.19+**). If using `nvm`:
  ```bash
  nvm install 22.12.0 && nvm use 22.12.0
  ```

---

## License
MIT — free to use and adapt.

## Credits
- Icons: [lucide-react](https://lucide.dev)  
- Animations: [Framer Motion](https://www.framer.com/motion/)  
- Styling: [Tailwind CSS](https://tailwindcss.com/)  
- Build: [Vite](https://vitejs.dev)
- Code Generating: [ChatGPT (using GPT 5-Thinking)](https://openai.com/)
