# Ledgerly — CI/CD practice project

A very small UI-only app (React 19, TypeScript, Vite, Tailwind v4, React Router v7, Zustand, Formik + Yup, React Query, Cypress) running on mock data — no backend. Same folder conventions as the main app, used to practise CI/CD with **GitHub Actions** and **Render**.

```bash
yarn install
cp .env.example .env.local     # already provided
yarn dev                       # http://localhost:5173
yarn verify                    # lint + typecheck + unit + component + build
yarn test:e2e                  # Cypress (starts the dev server)
```

Full walkthrough (GitHub, secrets, branch protection, Render): [docs/CI-CD.md](docs/CI-CD.md).
