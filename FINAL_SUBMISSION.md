Final Submission

Live site: https://steenajones.github.io/collectors_hub/

Summary:
- Fixed UI contrast issues and darkened headings and active nav pill for readability.
- Added `aria-label` attributes to all `select` elements to satisfy Lighthouse `select-name` audit.
- Uploaded desktop and mobile screenshots for Marketplace, Community, and Collection pages under `assets/screenshots/`.
- Built and published to the `gh-pages` worktree; use cache-busting query param `?cb=7` to view latest.

Artifacts:
- Lighthouse accessibility report: `lh-report.json` (initial run after fixes).
- Screenshots: assets/screenshots/Screenshot 2026-07-27 183317.png
- Screenshots: assets/screenshots/Screenshot 2026-07-27 183330.png
- Screenshots: assets/screenshots/Screenshot 2026-07-27 183339.png

Notes:
- A second Lighthouse audit attempt failed due to local temp directory permission errors (EPERM). Recommend running Lighthouse in CI (GitHub Actions) or on a dev machine with proper temp permissions for a final JSON report.

Submitted by: Steen A. Jones

---

Original submission message:

Hello,

Please find my Collector's Hub assignment below.

- GitHub repository: https://github.com/Steenajones/collectors_hub
- Demo video: https://drive.google.com/file/d/1nL61IIlZw_cbjiCH-5deHCM04molH0EI/view?usp=sharing
- Live demo: https://steenajones.github.io/collectors_hub

Short description:
Collector's Hub is a responsive React + TypeScript web app for collectors to discover marketplace listings, browse community posts, and manage a personal collection. Features include search, filtering, sorting, duplicate prevention when adding to collections, local persistence, and responsive layouts.

How to run locally:
```bash
git clone https://github.com/Steenajones/collectors_hub.git
cd collectors_hub
npm install
npm run dev
```

Notes:
- Uses mock data in `src/data.ts`.
- No auth — client-side persistence only.

Thank you for reviewing my submission.

Best,
Steen
