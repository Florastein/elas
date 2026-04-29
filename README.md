# ELAS

ELAS is a small React + Vite TypeScript app that demonstrates a dataset explorer UI with a 3D background and network visualizations. It uses Vite for development, Tailwind for styling, and Three.js for the 3D scene.

**Quick links**
- Project README: [README.md](README.md)
- Entry: [src/main.tsx](src/main.tsx)
- App: [src/App.tsx](src/App.tsx)
- Components: [src/components](src/components)

**Features**
- Responsive dataset grid and cards
- 3D animated background using Three.js
- Simple networks visualization component

## Prerequisites
- Node.js 18+ (or the latest LTS)
- npm (or yarn/pnpm)

## Local development
1. Install dependencies

```bash
npm install
```

2. Start the dev server (runs on port 3000)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build & preview
Build production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment
If the app needs API keys or other secrets, place them in a local `.env` file (not committed). Example keys referenced in the repository may include `GEMINI_API_KEY` for GenAI usage—only required if you enable related features.

## Project structure
Key files and folders:

- [src/main.tsx](src/main.tsx) — app bootstrap
- [src/App.tsx](src/App.tsx) — top-level app
- [src/index.css](src/index.css) — global styles
- [src/components/Background3D.tsx](src/components/Background3D.tsx) — 3D scene
- [src/components/Hero.tsx](src/components/Hero.tsx) — landing section
- [src/components/DatasetGrid.tsx](src/components/DatasetGrid.tsx) — grid layout
- [src/components/DatasetCard.tsx](src/components/DatasetCard.tsx) — dataset card
- [src/components/Networks.tsx](src/components/Networks.tsx) — network visual
- [src/components/Navbar.tsx](src/components/Navbar.tsx) — top navigation
- [src/components/Footer.tsx](src/components/Footer.tsx) — footer

## Scripts
- `npm run dev` — start Vite dev server (port 3000)
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run TypeScript type-check only

## Notes & next steps
- The UI is component-driven and easy to extend. To add data sources, update the dataset components under [src/components](src/components).
- If you intend to enable GenAI features, add required API keys to `.env` and ensure they are kept private.

If you want, I can also add a short CONTRIBUTING section and a small development checklist.
