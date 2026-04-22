# Organization Shared Registry

This directory contains logic, utilities, and components that are autonomously propagated to all repositories in the organization by `REPO_BOOTSTRAP`.

## 📦 Contents

- `safety-guard.mjs`: A standardized compliance checker that AI agents MUST run before submitting pull requests.

## 🛠 Usage for Agents

AI Agents are required to use the tools in this directory to ensure technical integrity.
Example:
```bash
node PROJECT/Shared/safety-guard.mjs
```

## 🔄 Lifecycle

1.  Changes to this directory in `REPO_BOOTSTRAP` are detected hourly.
2.  The bootstrap engine provisions or updates these files in `PROJECT/Shared/` across the organization fleet.
3.  Do not modify these files in individual repositories; any changes will be overwritten by the central source of truth.
