# Branch Topology

This repository uses one full branch and two generated split branches:

- `main`: canonical full repository (`api/` + `client/`)
- `master`: mirror of `main`
- `api-only`: generated from `main` using only `api/` content (flattened)
- `client-only`: generated from `main` using only `client/` content (flattened)

## Rules

- Do all feature work on `main`.
- Keep `master` mirrored to `main`.
- Do not directly edit `api-only` or `client-only`.
- Regenerate split branches from `main` after updates.

## Sync Commands (PowerShell)

```powershell
git checkout main
git pull origin main

git push origin main:master

$apiSplit = git subtree split --prefix=api main
git branch -f api-only $apiSplit
git push origin api-only

$clientSplit = git subtree split --prefix=client main
git branch -f client-only $clientSplit
git push origin client-only
```
