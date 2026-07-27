# Collector's Hub

Collector's Hub is a responsive React + TypeScript web app for discovering collectible marketplace listings, browsing community posts, and managing a personal collection.

## Quick Start
Clone the repo and run locally:

```bash
git clone https://github.com/Steenajones/collectors_hub.git
cd collectors_hub
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## What I built
- Marketplace: search, category & condition filters, sorting, and listing detail actions.
- Community Feed: browse posts, like/save, and search the feed.
- My Collection: `Owned`, `Wishlist`, and `Selling` with add, move, remove, search, and filters.

UX and robustness highlights:
- Duplicate-item prevention when adding to a collection
- Helpful empty states and loading indicators
- Local persistence using Local Storage
- Responsive layout for mobile, tablet, and desktop

## Scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npx vitest run` — run tests

## Assumptions and Notes
- Uses mock data in `src/data.ts` (no backend required).
- Images are remote Unsplash URLs; internet access required to load them.
- No authentication — all data is client-side for the assignment scope.

## Key files
- `src/App.tsx` — main app and routing
- `src/data.ts` — mock marketplace items and community posts
- `src/utils/collection.ts` — collection helpers (add/move/remove)
- `src/types.ts` — shared TypeScript types

---
See `SUBMISSION.md` for a ready-to-send submission message and a short demo script.
