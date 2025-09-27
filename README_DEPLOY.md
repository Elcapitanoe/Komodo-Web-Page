# GitHub Pages Frontend Deployment

Follow this checklist to deploy the static frontend for `{REPO_NAME}` without touching any backend services.

## 1. Prepare the repository
1. Replace placeholders in the following files:
   - `package.json` (`{REPO_NAME}`, `{BUILD_DIR}`, `{TARGET_BRANCH}`)
   - `vite.config.ts` (`base` and build output directory)
   - `.github/workflows/deploy.yml` (branch names and build folder)
   - `public/404.html` (project base path)
   - `README_DEPLOY.md` (this file, optional context)
2. Commit changes to `{DEFAULT_BRANCH}`.

## 2. Local development
```bash
npm install
npm run dev
```
- The development server runs on `http://localhost:3000/`.
- Routing uses `HashRouter`, so URLs look like `#/path` during local testing.

### Build preview
```bash
npm run build
npm run preview
```
- `npm run build` outputs the production site to `{BUILD_DIR}`.
- `npm run preview` serves the production build locally.

## 3. Deploy with GitHub Actions
1. Push commits to `{DEFAULT_BRANCH}`.
2. GitHub Actions (`.github/workflows/deploy.yml`) automatically:
   - Installs dependencies with `npm ci`.
   - Runs `npm run build`.
   - Publishes `{BUILD_DIR}` to `{TARGET_BRANCH}` via GitHub Pages.
3. The workflow also supports manual runs via **Run workflow** in the Actions tab.

## 4. Optional custom domain
- To use `{OPTIONAL_CUSTOM_DOMAIN}`, create `public/CNAME` with the exact domain name and commit it.
- After deployment, GitHub Pages copies the CNAME file into `{BUILD_DIR}` automatically.
- Update DNS records to point to GitHub Pages IPs.

## 5. Troubleshooting
- **404s on refresh:** Confirm `HashRouter` is used in `src/main.tsx` and that `public/404.html` exists.
- **Assets missing:** Ensure `vite.config.ts` `base` matches `/{REPO_NAME}/` (or `/` for user/organization sites or custom domains).
- **Workflow fails:** Check the Actions log for the failing step. Re-run the job after resolving issues.
- **Cache issues:** Clear browser cache or append a query string to force reload.

Once everything works, enable GitHub Pages in the repository settings (if not already enabled) and point it to `{TARGET_BRANCH}` / `{BUILD_DIR}`.
