Release v1.0.4 - Collector's Hub

This release packages the final submission for Collector's Hub.

Tag: v1.0.4

Included artifacts (in repo):
- FINAL_SUBMISSION.md
- lh-report.json (Lighthouse accessibility report)
- assets/screenshots/Screenshot 2026-07-27 183317.png
- assets/screenshots/Screenshot 2026-07-27 183330.png
- assets/screenshots/Screenshot 2026-07-27 183339.png

Notes:
- The repo includes a GitHub Actions workflow `.github/workflows/lighthouse.yml` that attempts to run Lighthouse and upload a JSON report; several runs were attempted and the environment produced errors. The local `lh-report.json` is included as the verified accessibility report.
- Live demo: https://steenajones.github.io/collectors_hub/ (use `?cb=7` to bypass cache)

Next recommended steps (optional):
1. Create a GitHub Release from tag `v1.0.4` and attach `lh-report.json` plus screenshots as release assets (requires GitHub token or use the web UI).
2. If you want an authoritative Lighthouse JSON from CI, allow me to continue debugging the Actions workflow or provide a runner with fewer permission restrictions.

Submitted by: Steen A. Jones
