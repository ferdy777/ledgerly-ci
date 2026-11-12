#!/usr/bin/env bash
# One-time GitHub setup: environments, per-environment secrets, branch protection.
# Needs: gh CLI logged in (gh auth login) with admin rights on the repo.
# Usage: ./scripts/setup-github.sh [owner/repo]
set -euo pipefail

REPO="${1:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
echo "Configuring $REPO"

echo "→ Creating GitHub environments: develop, main"
for env in develop main; do
  gh api -X PUT "repos/$REPO/environments/$env" --silent
done

echo "→ Setting VITE_APP_TITLE per environment"
read -r -p "App title for DEVELOP (e.g. Ledgerly (Develop)): " DEV_TITLE
read -r -p "App title for MAIN    (e.g. Ledgerly): " MAIN_TITLE
gh secret set VITE_APP_TITLE --env develop --repo "$REPO" --body "${DEV_TITLE:-Ledgerly (Develop)}"
gh secret set VITE_APP_TITLE --env main    --repo "$REPO" --body "${MAIN_TITLE:-Ledgerly}"

echo "→ Creating branch rulesets (PR required, no direct pushes, CI must pass)"
for branch in main develop; do
  gh api -X POST "repos/$REPO/rulesets" --input ".github/rulesets/protect-$branch.json" --silent \
    && echo "   protected: $branch"
done

echo "Done. Verify in GitHub → Settings → Environments / Rules."
