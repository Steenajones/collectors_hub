# Collector's Hub

Collector's Hub is a responsive React + TypeScript web application that implements a simple collectibles marketplace, a community feed, and a personal collection manager — matching the React Web Developer Internship assignment requirements.

## Live Demo
- GitHub Pages: https://steenajones.github.io/collectors_hub/ (Cache-bust with `?cb=7` if needed)

## Demo Video
- (If available, add a public video link here and update `FINAL_SUBMISSION.md`.)

## What this repo includes
- Complete React + TypeScript app (Vite)
- Production build output prepared for GitHub Pages
- `lh-report.json` — Lighthouse accessibility report (local run)
- `assets/screenshots/` — screenshots demonstrating UI and responsive layout
- CI workflow: `.github/workflows/lighthouse.yml` — attempts to run Lighthouse in Actions (debugging in-progress)

## Features Implemented (mapped to assignment)

Marketplace
- Browse listings with image, title, category, condition, price, seller, and location
- Search by title
- Filter by category and condition
- Sort by price and newest
- Listing detail view
- Add to Collection and Add to Wishlist (prevents duplicates)

Community Feed
- Browse community posts with user info, image, caption, likes, comments
- Search posts and filter by category
- Like and Save posts
- Open post details

My Collection
- Default collections: Owned, Wishlist, Selling
- Each item shows image, title, category, date added, estimated value (mock)
- View/search/filter/sort items, remove items, move items between collections

UX / Robustness
- Empty states and helpful messages when no data or search returns no results
- Prevents adding duplicate items with user feedback
- Loading indicators for async actions
- Graceful handling of missing images / partial data
- Local persistence (Local Storage) to keep collections between sessions

Bonus / Optional
- Debounced search
- Lazy-loading images
- Grid/list toggle

## Tech Stack & Libraries
- React + TypeScript (Vite)
- React Router for routing
- Axios (or Fetch API) for data fetching (mocked locally)
- CSS modules / plain CSS for styling
- GitHub Actions workflow for Lighthouse runs

## Setup — Run Locally
1. Clone the repository

```bash
git clone https://github.com/Steenajones/collectors_hub.git
cd collectors_hub
```

2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

Open the URL shown by Vite (typically `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

The `dist/` folder will contain the production bundle. The repo includes a Pages deployment setup using `gh-pages` worktree.

## Run Lighthouse locally
If you want to generate a fresh Lighthouse JSON locally (Windows may require elevated permissions):

```bash
npx http-server ./dist -p 8080
npx -y lighthouse "http://127.0.0.1:8080" --only-categories=accessibility --output=json --output-path=lh-report-local.json --chrome-flags="--no-sandbox --headless"
```

Note: Local Lighthouse on Windows can fail with EPERM when Chrome launcher removes temp dirs. If that happens, run Lighthouse in CI or on a Linux/macOS machine.

## Project Structure (high-level)
- `src/` — application source
- `src/components/` — reusable UI components
- `src/pages/` — route pages (Marketplace, Community, Collection)
- `src/data.ts` — mock data used for marketplace and community
- `assets/screenshots/` — submission screenshots
- `.github/workflows/lighthouse.yml` — Lighthouse CI workflow
- `lh-report.json` — included Lighthouse JSON (local run)

## Assumptions
- No backend or authentication required — mock data is used.
- Images are external; offline usage may show placeholders.
- The app stores collection data to Local Storage for simple persistence.

## Known Issues / CI Status
- The GitHub Actions Lighthouse workflow is instrumented to run on tags and upload artifacts. Several attempts were made; the workflow is currently being debugged to reliably produce `lh-report-ci.json`. Meanwhile `lh-report.json` (included) is the verified accessibility report.

## Submission checklist (what I included)
- Source code (this repo)
- `FINAL_SUBMISSION.md` — submission summary and artifacts
- `RELEASE.md` — release notes for v1.0.4 / v1.0.6
- `lh-report.json` — Lighthouse JSON (local)
- `assets/screenshots/` — UI screenshots
- Git tags: v1.0.4, v1.0.5, v1.0.6 (used to trigger CI)

## How to test key flows quickly
- Marketplace: open `/` → use search, apply category/condition filters, sort, open details, add to `Wishlist` or `Owned`.
- Community: open `/community` → like/save posts, open post detail.
- My Collection: open `/collection` → view `Owned`, `Wishlist`, `Selling`, move items and remove items.

## What I would improve with more time
- Complete CI debugging so Lighthouse JSON is produced reliably in Actions
- Add unit/integration tests (Vitest + React Testing Library)
- Add more robust image caching and placeholder fallback
- Improve UX polish and animations

## Contact
If you need changes, additional features, or a recorded demo video, tell me which item to prioritize next and I will implement it.

---
End of README — submission-ready.
