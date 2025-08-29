# Mohamed Sharif — Developer Portfolio (Vite + React + Tailwind v4)

Fast, clean, and responsive portfolio showcasing projects like **iMenu**, **TAP Careers**, **SUM**, and **RIS**, built with **Vite**, **React**, and **Tailwind CSS v4**, and deployed via **GitHub Pages**.

> 🔗 **Live:** https://<YOUR_USERNAME>.github.io/<REPO_NAME>  
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
│ ├─ personal.png # headshot
│ └─ Mohamed_Sharif_Resume.pdf # resume
├─ src/
│ ├─ index.css # Tailwind + base theme layer
│ ├─ main.jsx # React entry (imports index.css)
│ └─ Portfolio.jsx # main component + data object
├─ tailwind.config.js # Tailwind config (darkMode: 'class')
├─ postcss.config.js # uses '@tailwindcss/postcss'
├─ vite.config.js # set base for Pages project sites
└─ .github/workflows/deploy.yml # GitHub Pages workflow
```

---

## Thanks for Visiting my Portfolio Project!
