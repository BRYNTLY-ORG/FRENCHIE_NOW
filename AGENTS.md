# AI Code Review Agents

This repository uses multiple AI agents for automated code review, conflict resolution, and PR management. PR and issue assignment is centralized in `.github/actions/ensure-agent-assignees`, with the lifecycle workflows calling that shared action where possible.

## Active Agents

### GitHub Copilot
- **Handle**: `@copilot`
- **Trigger**: Requested as a formal reviewer on every PR; also triggered by `copilot_code_review` ruleset on push
- **Capabilities**: Code review, conflict resolution, fix suggestions, PR comments
- **Config**: `.github/copilot-code-review-instructions.md`, `.github/copilot-instructions.md`

### Claude (Anthropic)
- **Handle**: `@claude`
- **Trigger**: Auto-review on PR open/sync/ready + @mention in PR comments via `claude-code-action` workflow
- **Capabilities**: Deep code review, verification of applied fixes, scope and regression analysis, edge case detection
- **Role**: Complementary reviewer — focuses on scope/intent verification, failure paths, and cross-file regressions that other agents miss
- **Config**: `CLAUDE_CODE_OAUTH_TOKEN` secret required; uses `anthropics/claude-code-action` pinned to a commit SHA (tagged `v1.0.96`)

### Codex (OpenAI)
- **Handle**: `@codex`
- **Trigger**: @mention in PR comments
- **Capabilities**: Correctness review, regression detection, test coverage analysis
- **Role**: Secondary verification — checks for missed items and follow-up needs

### Gemini Code Assist
- **Handle**: `@gemini-code-assist[bot]`
- **Trigger**: @mention in PR comments; auto-reviews via GitHub App
- **Capabilities**: Code review, security analysis, style suggestions

### ChatGPT Codex Connector
- **Handle**: `@chatgpt-codex-connector[bot]`
- **Trigger**: @mention in PR comments
- **Capabilities**: Code fixes, diagnostics, review suggestions

### Sentry
- **Handle**: `@sentry[bot]`
- **Trigger**: @mention in PR comments; auto-links issues
- **Capabilities**: Error tracking integration, issue linking, performance analysis
- **Assignment note**: Sentry is not requested as a formal reviewer by the shared assignment action; mention it directly when Sentry issue context is needed

### Ollama Cloud (Kimi + GLM + MiniMax)
- **Trigger**: Automatic on PR open/sync/ready via `ollama-pr-review` workflow
- **Models**: `kimi-k2.6:cloud` (lead primary pass), `glm-5.1:cloud` (secondary pass), `minimax-m2.7:cloud` (deep pass on every non-draft PR)
- **Capabilities**: High-reasoning logic review, material finding detection, cross-file regression analysis, operational risk
- **Assignment note**: Ollama model IDs such as `kimi-k2.6:cloud`, `glm-5.1:cloud`, and `minimax-m2.7:cloud` are API model names, not GitHub user logins. They cannot be added as PR assignees or formal reviewers. The workflow posts review comments through the Actions token instead.

## Automated Workflows

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| `auto-assign-agents` | PR/issue lifecycle events, comments, schedule (10m), manual | Assigns eligible agents and requests reviews through the shared action |
| `ollama-pr-review` | PR open/sync/ready | Three-pass Ollama review + agent assignee sync |
| `auto-fix-review` | Review submitted/comment | Collects suggestions, dispatches to all agents for fixes + agent assignee sync |
| `agent-thread-dispatch` | PR comment created/edited | Routes new thread items to all agents + agent assignee sync |
| `auto-resolve-conflicts` | Push to main, schedule (8h) | Detects conflicts, opens helper PRs, assigns agents |
| `auto-merge` | PR open, review, check/status events | Squash merges when all checks pass + agent assignee sync |
| `claude-code-action` | PR open/sync/ready, @claude mention | Claude auto-review + interactive @mention responses |
| `org-auto-assign-sweep` | Schedule (10m), workflow_dispatch | Org-wide sweep — assigns canonical agents to every open PR across all org repos |
| `auto-approve-bot-runs` | Schedule (10m), manual | Approves pending workflow/deployment runs from trusted bot actors |
| `dependabot-auto-approve` | Dependabot PR open/sync/reopen | Automatically approves Dependabot PRs to satisfy branch protection rules |
| `stale` | Schedule (daily) | Automatically marks and closes abandoned issues and PRs |
| `delete-old-workflow-runs` | Schedule (daily), manual | Automatically deletes old workflow runs to save storage and keep history clean |
| `auto-rollback` | Manual (via agent) | Autonomous service recovery by reverting regression commits |
| `ci-doctor-copilot` | CI workflow failure | `gh aw` CI failure investigation using Copilot |
| `ci-doctor-codex` | CI workflow failure | `gh aw` CI failure investigation using Codex |
| `ci-doctor-claude` | CI workflow failure | `gh aw` CI failure investigation using Claude |

## Agent Assignment

Agents are auto-assigned through the shared composite action in the PR and issue lifecycle workflows. Assignment is idempotent, so duplicate runs for the same PR are queued rather than cancelled; this avoids cancelled checks becoming noisy PR failures. Conflict helper PRs use equivalent inline logic because they create branches and PRs directly from a script. Coverage includes:
- PR creation, reopening, and draft-to-ready transitions
- Code synchronization (new pushes)
- Review submissions and review comments
- Issue comments on PRs
- Merge conflict detection
- Check suite completion and status changes
- Scheduled sweeps (every 10 minutes for assignment, every 8 hours for conflict detection)

Assignment eligibility is determined by:
- The shared review-bot list in `.github/actions/ensure-agent-assignees/action.yml`
- Logins listed in the `OLLAMA_AGENT_ASSIGNEES` repository variable
- Trusted bot actors listed in `auto-approve-bot-runs` for workflow-run approval only

## GitHub Enterprise Compatibility

All workflows are compatible with GitHub Enterprise Server (GHES 3.9+):
- Octokit-based workflows (`actions/github-script`) automatically use `GITHUB_API_URL`
- Raw HTTP calls use `github.api_url` / `GITHUB_API_URL` instead of hardcoded endpoints
- The `copilot_code_review` ruleset gracefully falls back on GHES versions that don't support it
- GraphQL auto-merge uses the Octokit GraphQL helper which targets the correct GHES endpoint

## Authentication

### GitHub App (recommended)

All workflows support a dedicated GitHub App for authentication, giving each workflow its own rate limit pool (5,000 requests/hr) independent of any personal PAT.

**Setup:**
1. Go to `github.com/organizations/BRYNTLY-ORG/settings/apps/new`
2. Create an app named `BRYNTLY-ORG Bot` with these permissions:
   - **Repository permissions**: Contents (Read & Write), Issues (Read & Write), Pull requests (Read & Write), Metadata (Read), Administration (Read & Write)
   - **Organization permissions**: Members (Read)
3. Install it on all repositories in the org
4. Set org-level **variable** `AGENT_APP_ID` = the App ID (visible on the app settings page)
5. Set org-level **secret** `AGENT_APP_PRIVATE_KEY` = the generated private key (PEM format)
6. For companion bootstrap tooling, also set `BOOTSTRAP_APP_ID` (variable) and `BOOTSTRAP_APP_PRIVATE_KEY` (secret) when that tooling is in use; they can be the same app or a separate one

Workflows automatically fall back to PAT-based auth if the App is not configured.

### Local gh CLI

Repository workflows already avoid the personal-token REST bucket by using GitHub App installation tokens. For local CLI work, use `scripts/gh-app` instead of raw `gh` when you need the same isolation locally.

Examples:

```bash
scripts/create-gh-app-from-manifest
scripts/install-gh-app-credentials --id 1234567 --key-file ~/Downloads/app-private-key.pem
scripts/gh-app api rate_limit
scripts/gh-app workflow run bootstrap.yml -R BRYNTLY-ORG/REPO_BOOTSTRAP --ref main -f overwrite_managed_files=true
scripts/gh-app pr view 294 -R BRYNTLY-ORG/LDMT
```

Credential lookup order for the wrapper:
- `GH_APP_ID` + `GH_APP_PRIVATE_KEY`
- `AGENT_APP_ID` + `AGENT_APP_PRIVATE_KEY`
- `BOOTSTRAP_APP_ID` + `BOOTSTRAP_APP_PRIVATE_KEY`
- Same-named macOS Keychain entries

The wrapper intentionally does not fall back to a personal token.

If the app does not exist yet, run `scripts/create-gh-app-from-manifest`. It launches the org app-registration page in the normal browser session, completes the manifest conversion on a local callback, stores the app ID and private key in Keychain under the selected prefix, and then opens the install page for the new app.

### Required Secrets & Variables

| Name | Type | Used By | Purpose |
|------|------|---------|---------|
| `AGENT_APP_ID` | Variable | All PR workflows | GitHub App ID for agent operations |
| `AGENT_APP_PRIVATE_KEY` | Secret | All PR workflows | GitHub App private key |
| `BOOTSTRAP_APP_ID` | Variable | `bootstrap` | GitHub App ID for bootstrap (can share with agent app) |
| `BOOTSTRAP_APP_PRIVATE_KEY` | Secret | `bootstrap` | GitHub App private key for bootstrap |
| `CLAUDE_CODE_OAUTH_TOKEN` | Secret | `claude-code-action` | Claude OAuth token for Claude reviews (via `claude setup-token`) |
| `ANTHROPIC_API_KEY` | Secret | `ci-doctor-claude` | Claude API key for `gh aw` CI Doctor |
| `CODEX_API_KEY` or `OPENAI_API_KEY` | Secret | `ci-doctor-codex` | Codex/OpenAI API key for `gh aw` CI Doctor |
| `OLLAMA_API_KEY` | Secret | `ollama-pr-review` | Ollama cloud API key for Kimi/GLM/MiniMax reviews |
| `AGENT_PAT` | Secret | All workflows (fallback) | GitHub PAT fallback if App not configured |
| `REPO_BOOTSTRAP_PAT` | Secret | `bootstrap` (fallback) | PAT fallback for bootstrap |

Set all as **org-level** secrets/variables for automatic propagation to all repos.

## Interacting with Agents

- **Request a fix**: Comment `@copilot fix this` on a review thread
- **Ask for review**: Comment `@claude please review this change`
- **Trigger all agents**: The `auto-fix-review` workflow auto-dispatches actionable suggestions to all agents
- **Conflict help**: The `auto-resolve-conflicts` workflow auto-creates helper PRs and assigns agents
- **Autonomous Recovery**: The `incident-triage` agent is empowered to trigger the `auto-rollback` workflow to recover unhealthy services by reverting regressions.

## Stateful Intelligence (Memory)

Every repository contains a `PROJECT/Docs/LESSONS_LEARNED.md` file which serves as its **Institutional Memory**.
- **Agent Contribution**: AI agents MUST contribute a technical entry after every successful autonomous repair (e.g., CI fix).
- **Prevention**: Agents MUST refer to this file before starting new tasks to ensure they do not re-introduce historical regressions.
- **Rigor**: Entries must include the root cause, the fix SHA, and the specific "Detection Gap" that was closed.

## Collective Intelligence

The organization maintains a **Global Tactical Playbook** in `PROJECT/Docs/GLOBAL_TACTICAL_PLAYBOOK.md`.
- **Global Brain**: This playbook is autonomously synthesized from tactical insights harvested across the entire organization fleet.
- **Agent Duty**: Agents MUST consult the global playbook before starting any high-risk implementation or troubleshooting. This ensures that a lesson learned in one project is immediately applied organization-wide.
- **Flywheel**: By contributing high-quality technical entries to `LESSONS_LEARNED.md`, agents directly improve the intelligence of the entire organization.

## Repository Contracts

Every repository contains a `PROD_SPEC.md` file which serves as its **Living Contract**.
- **Source of Truth**: It defines the repository's mission, production targets, and health baselines.
- **Agent Guidance**: AI agents MUST refer to `PROD_SPEC.md` to understand repository context before performing triage, refactoring, or feature development.
- **Safety**: Agents are forbidden from modifying `PROD_SPEC.md` without explicit human approval.

## Immutable Security Standards

All GitHub Actions workflows created or modified by AI agents MUST use **immutable commit SHAs** instead of mutable tags.
- **Requirement**: Use `uses: actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5 # v4.3.1` instead of `@v4`.
- **Reasoning**: This prevents supply-chain attacks via tag-moving and ensures consistent execution environments across the organization fleet.
- **Audit**: The bootstrap engine automatically audits all repositories for compliance with this standard.

## Supply Chain Integrity

The repository control plane enforces **SLSA Level 3** compliance for its automation fleet.
- **Verification**: All bootstrap source bundles and compliance dashboards are cryptographically signed.
- **Agent Duty**: When performing high-risk infrastructure changes, agents SHOULD verify artifact attestations to ensure the integrity of the source configuration.
