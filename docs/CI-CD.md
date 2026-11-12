# CI/CD guide (GitHub Actions → Render)

A tiny project (login + members page, **no backend — mock data only**) wired up the way a production frontend is.
Everything below is something you run **once**, in order.

## 0. What runs when

| Event | Lint | Build | Unit | Component | E2E |
|---|:-:|:-:|:-:|:-:|:-:|
| Push to any branch (`feat/login`, …) | ✅ | ✅ (after lint) | – | – | – |
| Pull request → `develop` / `main` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Push to `develop` / `main` (after merge) | ✅ | ✅ | ✅ | ✅ | ✅ |

- **Build uses the right environment:** `main` → GitHub environment `main`, everything else → environment `develop`. Each holds its own secret `VITE_APP_TITLE` (shown in the app badge, so you can see which environment a deploy came from).
- **Same commands locally and on GitHub:** the workflow only calls `yarn` scripts, so if it passes in your terminal it passes in CI.

| Script | What it does |
|---|---|
| `yarn lint` / `yarn lint:fix` | ESLint |
| `yarn typecheck` | `tsc -b` (app + vite config + cypress) |
| `yarn test:unit` | Vitest — utils, schemas, store, mock service (`src/**/*.test.ts`) |
| `yarn test:component` | Vitest + Testing Library — components & pages (`src/**/*.test.tsx`) |
| `yarn test` | unit + component |
| `yarn test:coverage` | both, with coverage report |
| `yarn test:e2e` | Cypress against the dev server (headless) |
| `yarn test:e2e:open` | Cypress interactive runner |
| `yarn test:e2e:ci` | Cypress against the built app (needs `yarn build:files` first) — what CI uses |
| `yarn build:develop` / `yarn build:main` | production build with `.env.develop` / `.env.main` |
| `yarn verify` | lint → typecheck → tests → build |
| `yarn verify:all` | `verify` + e2e |

Git hooks (Husky): **pre-commit** runs `yarn lint`; **pre-push** runs `yarn typecheck && yarn test`.

## 1. Env files

| File | In git? | Used by |
|---|:-:|---|
| `.env.local` | no | `yarn dev` (local) |
| `.env.develop` | no | `yarn build:develop` |
| `.env.main` | no | `yarn build:main` |
| `.env.example`, `.env.develop.example`, `.env.main.example` | yes | templates for the above |

Variables: `VITE_APP_TITLE`, `VITE_APP_ENV` (`development`/`production`), optional `VITE_APP_VERSION`.
Real values in CI come from GitHub secrets, on Render from the service's environment variables.
`vite.config.ts` **fails the build** if `VITE_APP_TITLE` is missing for `develop`/`main`, so a forgotten secret can't ship a half-configured app.

> Vite inlines `VITE_*` values into the public JS bundle. Never put real secrets (API keys, tokens) in a `VITE_*` variable. When you add a real backend later, add `VITE_API_BASE_URL` the same way.

## Demo login
`ada@ledgerly.app` / `Password123!` (mock users live in `src/data/mockUsers.ts`).

## 2. Put the code on GitHub

```bash
yarn install
git init -b main
git add . && git commit -m "chore: initial project"
gh repo create ledgerly-ci --private --source=. --push      # or create it on github.com and add the remote
git checkout -b develop && git push -u origin develop    # create develop from main
```
The first push to `main` must happen **before** you protect it.

## 3. Environments, secrets, branch protection (one command)

```bash
gh auth login                       # once
./scripts/setup-github.sh           # creates environments, asks for both titles, creates rulesets
```

Or by hand:

1. **Settings → Environments → New environment** → `develop`, then `main`.
2. In each: **Add environment secret** → `VITE_APP_TITLE` = that environment's title, e.g. `Ledgerly (Develop)` / `Ledgerly`.
3. **Settings → Rules → Rulesets → New branch ruleset** (once for `main`, once for `develop`):
   - Target branches: `main` (resp. `develop`), Enforcement: **Active**
   - ✅ Restrict deletions · ✅ Block force pushes
   - ✅ **Require a pull request before merging** (so no direct commits)
   - ✅ **Require status checks to pass**: `Lint`, `Build`, `Unit tests`, `Component tests`, `E2E tests`

> Branch protection/rulesets on **private** repos need GitHub Pro/Team; public repos get them free.
> With 0 required approvals you can merge your own PRs. Raise `required_approving_review_count` in `.github/rulesets/*.json` once you have teammates.

## 4. Daily flow

```bash
git checkout develop && git pull
git checkout -b feat/login-validation
# ...code...   (pre-commit hook lints)
git push -u origin feat/login-validation      # CI: Lint → Build
# open PR → develop                            # CI: everything, merge button locked until green
# later: PR develop → main                     # same gate, then production deploy
```

## 5. Render (two static sites, one per branch)

Render watches the branch, builds with your command, publishes `dist/`. With **Auto-Deploy = After CI checks pass**, Render waits for the GitHub Actions run, so a red CI never reaches a live site.

### Option A — Blueprint (fastest)
1. Render dashboard → **New → Blueprint** → connect the GitHub repo.
2. Render reads `render.yaml` and proposes `ledgerly-develop` (branch `develop`) and `ledgerly-main` (branch `main`).
3. It prompts for `VITE_APP_TITLE` for each — e.g. `Ledgerly (Develop)` for `ledgerly-develop`, `Ledgerly` for `ledgerly-main`.
4. **Apply**. Done.

### Option B — Dashboard, step by step (do it twice)
1. **New → Static Site** → connect the repo.
2. **Name** `ledgerly-develop` · **Branch** `develop`.
3. **Build Command**: `yarn install --frozen-lockfile && VITE_APP_VERSION=$RENDER_GIT_COMMIT yarn build:develop`
4. **Publish Directory**: `dist`
5. **Environment variables**: `VITE_APP_TITLE=Ledgerly (Develop)`, `VITE_APP_ENV=development`, `NODE_VERSION=22`, `CYPRESS_INSTALL_BINARY=0`, `HUSKY=0`.
6. **Create Static Site**, then **Settings → Build & Deploy → Auto-Deploy → After CI Checks Pass**.
7. **Redirects/Rewrites → Add Rule**: Source `/*` → Destination `/index.html` → Action **Rewrite** (needed so `/members` works on refresh).
8. Repeat for `ledgerly-main`: branch `main`, `yarn build:main`, `VITE_APP_ENV=production`, `VITE_APP_TITLE=Ledgerly`.

### Check it worked
Open the site: the grey badge under the login form shows `title · environment · version`. The `develop` site must show the develop title, the `main` site the main one.

## 6. Troubleshooting
- **"VITE_APP_TITLE is missing"** → the secret/env var isn't set for that environment.
- **Required check never appears / "Expected — waiting"** → names must match the job names exactly (`Lint`, `Build`, …); push once so GitHub has seen them.
- **PR from a fork fails Build** → forks can't read secrets; expected.
- **Cypress fails only in CI** → download the `cypress-screenshots` artifact from the run.
- **Refreshing `/members` on Render gives 404** → the rewrite rule in step 7 is missing.
