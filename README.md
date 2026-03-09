# Oneiros-26

Oneiros-26 is the official website for **Oneiros 2026**, the annual cultural fest of **Manipal University Jaipur**. It is built as a cinematic, single-page React experience with a full-screen Three.js world, lazy-loaded content overlays, and a mobile-aware rendering pipeline.

![Oneiros 2026 preview](./public/preview.png)

## Highlights

- Full-screen 3D landing experience powered by `three`
- Intro preloader with video playback before the interactive scene begins
- Route-driven overlays for `About`, `Team`, `Major Events`, `Minor Events`, `Artists`, `Gallery`, `Schedule`, `Sponsors`, and `Contact`
- Keyboard and touch-friendly world navigation with marker-based page transitions
- Adaptive rendering quality for lower-end mobile devices and higher-end desktops
- Lazy loading for heavier sections and runtime chunk splitting via Vite
- Contact form integration using `@emailjs/browser`

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Three.js
- Motion
- Tailwind CSS 4
- ESLint

## Project Structure

```text
.
|-- public/                   # Static assets, 3D models, icons, preview image
|-- scripts/                  # Utility scripts
|-- src/
|   |-- assets/               # Bundled media such as the intro video
|   |-- components/
|   |   |-- map/              # Scene systems: quality, markers, loading, FX, config
|   |   |-- Map.tsx           # Main Three.js runtime and navigation bridge
|   |   |-- Navbar.tsx        # Top navigation
|   |   |-- Preloader.tsx     # Intro/loading sequence
|   |   |-- About.tsx         # Festival overview
|   |   |-- Team.tsx          # Team showcase
|   |   |-- MajorEvents.tsx   # Major events experience
|   |   |-- MinorEvents.tsx   # Minor events + gallery dome
|   |   |-- Artist.tsx        # Artist section
|   |   |-- Schedule.tsx      # Schedule placeholder
|   |   |-- Sponsors.tsx      # Sponsors and previous sponsors
|   |   `-- Contact.tsx       # Contact info and EmailJS form
|   |-- App.tsx               # Router, overlays, preloader, navbar shell
|   `-- main.tsx              # React entry point
|-- vercel.json               # SPA rewrites for Vercel
`-- vite.config.ts            # Build config, chunking, compression
```

## Experience Model

The homepage mounts the 3D scene immediately, then reveals the interactive world after the intro finishes. Section pages are loaded as overlays on top of the scene, so the world remains mounted in the background while users move through content.

The current navigation flow includes:

- `/` for the interactive landing scene
- `/about`
- `/team`
- `/major-events`
- `/minor-events`
- `/artist`
- `/gallery`
- `/schedule`
- `/sponsors`
- `/contact`

## 3D Runtime Notes

The scene runtime in [`src/components/Map.tsx`](./src/components/Map.tsx) currently includes:

- automatic device and quality detection
- cinematic lighting and fog
- particle systems and ambient effects
- GLB loading for the environment and character
- marker prompts that connect the 3D world to page overlays
- mobile joystick support and keyboard movement states
- post-processing hooks with bloom enabled by quality profile

Supporting scene modules live in [`src/components/map/`](./src/components/map).

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

The Vite dev server is exposed with `--host`, so it can be reached from other devices on the same network.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment

This project is configured as a client-side SPA.

- [`vercel.json`](./vercel.json) rewrites all routes to `index.html`
- [`public/_redirects`](./public/_redirects) provides the same fallback for static hosting setups such as Netlify-style deployments
- the production build is emitted to `dist/`

## Content and Assets

- `public/map.glb` contains the main world model
- `public/character.glb` contains the player character model
- `public/minor_events/` contains the minor-events image archive
- `public/team/` contains team portraits
- `src/assets/intro_enhanced.webm` is the intro/preloader video

## Contact Form

The contact page uses EmailJS through [`src/components/Contact.tsx`](./src/components/Contact.tsx). The service ID, template ID, and public key are currently defined in that component.

If those credentials change, update the constants there or move them to environment variables before deployment.

## Current State

- `About`, `Team`, `Major Events`, `Minor Events`, `Artists`, `Sponsors`, and `Contact` are implemented
- `Gallery` and `Schedule` are present as styled coming-soon sections
- the app is front-end only; there is no custom backend in this repository
- no automated test suite is currently configured

## License

This repository is private and intended for the Oneiros-26 project team.
