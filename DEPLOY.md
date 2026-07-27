Deploying Collector's Hub (quick guide)

Option A — Vercel (recommended)
1. Sign in to https://vercel.com using your GitHub account.
2. Click "New Project" → Import Git Repository → choose `Steenajones/collectors_hub`.
3. Use the default build settings (Framework Preset: Vite).
4. Click Deploy. Vercel will provide a live URL.
5. Copy the URL and add it to `SUBMISSION.md` / `FINAL_SUBMISSION.md`.

Option B — Netlify
1. Sign in to https://app.netlify.com and "New site from Git".
2. Pick GitHub and select `collectors_hub`.
3. Build command: `npm run build` and Publish directory: `dist`.
4. Deploy and copy the live URL.

Option C — GitHub Pages (simpler but not recommended for SPA without routing fixes)
- Use `gh-pages` package and publish the `dist` folder to `gh-pages` branch. Adjust router base if necessary.

If you'd like, I can create a simple `vercel.json` or add GitHub Actions for build previews. Paste which provider you want and I'll create the config and instructions.
