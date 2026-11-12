# CLAUDE.md

## Commands
```bash
yarn dev               # dev server
yarn lint              # ESLint
yarn typecheck         # tsc -b
yarn test              # unit + component (Vitest)
yarn test:e2e          # Cypress, headless
yarn verify            # lint + typecheck + tests + build  <- run before finishing any task
```
Never skip or comment out a test to make CI pass.

## Conventions (same as the main Ledgerly app)
- Components: `componentName/index.tsx`, `const` arrow functions, one component per file, use `Typography` for text.
- Hooks are flat files (`hooks/useThing.ts`); pages own `components/ hooks/ utils/ constants/`.
- Forms: `IFormName` interface + Yup schema in `utils/` typed with `Shape<IFormName>`; submit buttons use `isLoading`.
- Tests: `*.test.ts` = unit, `*.test.tsx` = component (colocated); Cypress specs in `cypress/e2e/`, runs against mock data (`src/data`), no backend.
