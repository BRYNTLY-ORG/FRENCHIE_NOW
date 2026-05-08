## Repository Context
- Refer to `PROD_SPEC.md` as the primary source of truth for the repository's mission, technical baselines, and production safety.
- Always cross-reference proposed changes against the **Critical Path** and **SLA targets** defined in the spec.

## Copilot Pro Models
- Copilot Pro models are available for code completion, chat, test generation, and PR reviews.
- Use `@copilot` in PR comments for automated fixes and conflict resolution.

## Institutional Memory
- **CRITICAL**: Before starting any task or proposing changes, you MUST read `PROJECT/Docs/LESSONS_LEARNED.md` (the repository's institutional memory) and `PROJECT/Docs/GLOBAL_TACTICAL_PLAYBOOK.md` (the organization's global memory).
- You must ensure your solutions do not violate historical lessons learned.
- If you solve a complex issue, add a new entry to `PROJECT/Docs/LESSONS_LEARNED.md` documenting the root cause, fix, and detection gap.

<!-- BRYNTLY-QUALITY-FIRST:BEGIN -->
## BRYNTLY Copilot Review Guidance (Managed 2026-05-08)

This block is managed. Keep repo-specific review rules above and below it.

- Review for correctness, security, test coverage, operational risk, and user-visible regressions first; avoid style-only comments unless they block maintainability.
- GitHub hierarchy: GitHub is an Enterprise-level account: Enterprise `bryntly` at `https://github.com/enterprises/bryntly`; the organization inside the Enterprise is `BRYNTLY-ORG`; repositories live under `BRYNTLY-ORG/<REPO_NAME>`. Do not suggest `bryntly/<REPO_NAME>` for normal repo operations; use `--repo BRYNTLY-ORG/<REPO_NAME>` or `GH_REPO=BRYNTLY-ORG/<REPO_NAME>`.
- Respect repo-root discipline: `/Users/pacman/GITHUB_ACTUAL` and `/Users/pacman/GITHUB_WORKTREES` are collection roots; repo state belongs only under the actual `git rev-parse --show-toplevel` root.
- Do not recreate `/Users/pacman/GITHUB_ACTUAL/ADWORDS_MCP`; it has been deleted and should be treated as stale if referenced.
- Require secret hygiene: no tokens, API keys, cookies, private keys, one-time codes, QR payloads, or credentials in prompts, logs, repo files, shell history, screenshots, or process arguments.
- Prefer `rg` and `rg --files` for search and inventory. Mention line references with `rg -n` or equivalent.
- Optional helper CLIs should be checked with `command -v <tool>` and relevant help/version output before use.
- Command safety categories are read-only diagnostics, advisory AI/model output, local file/state changes, external service mutations, and secret-bearing authentication. Prefer read-only diagnostics; external service mutations and secret-bearing authentication require explicit approval and read-back verification.
- For GitHub Enterprise `gh`, use explicit host/repo targeting and never print tokens with `gh auth status --show-token`; use BRYNTLY repo references as `BRYNTLY-ORG/<REPO_NAME>`.
- Treat `gk ai`, `docker ai`, Copilot, Ollama, LM Studio, and other model outputs as advisory until verified by code, diffs, logs, tests, or read-back commands.
- For GitKraken CLI, useful bounded commands include `gk graph`, `gk pr list`, and `gk ai explain`; verify with native `git` and `gh`.
- For LM Studio, check `lms server status`, `lms ps`, and `lms load <model> --estimate-only`; do not disturb the Harrier embedding model without approval.
- For Copilot Enterprise, use `copilot login --host <enterprise-host>` when needed and prefer scoped permissions over broad `--allow-all` or `--yolo`.
- For Tailscale, start with `tailscale status`, `tailscale ip`, `tailscale netcheck`, and `tailscale ping <host>`; state-changing commands need approval.
- For Postman, prefer `postman collection run <collectionId/Path>` and `postman spec lint <spec>`; protect `postman login --with-api-key <key>` secrets, use `postman logout` for one-off credentials, and require approval for destructive API/workspace/environment changes.
- For OpenClaw, prefer `openclaw health --json`, `openclaw status --all --json`, `openclaw <command> --help`, `openclaw --dev`, `openclaw --profile <name>`, and bounded `--timeout <ms>`; approval is required for `openclaw doctor --fix`, `openclaw secrets`, setup/reset/update, channel auth, sends, restores, migrations, sandbox, or plugin changes.
- Parallel offload commands are available for independent non-secret work: `ollama launch claude --model glm-5.1:cloud` and `ollama launch codex --model glm-5.1:cloud`. Local model loading example: `ollama run medgemma:27b-it-bf16`.
<!-- BRYNTLY-QUALITY-FIRST:END -->
