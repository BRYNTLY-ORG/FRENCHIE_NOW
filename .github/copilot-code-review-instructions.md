# Copilot Code Review Instructions

When reviewing pull requests, focus on:

1. **Security**: Check for injection vulnerabilities, exposed secrets, and auth bypasses.
2. **Correctness**: Look for logic errors, off-by-one issues, null dereferences, and race conditions.
3. **Error Handling**: Ensure errors are caught and handled appropriately.
4. **Performance**: Flag N+1 queries, unnecessary allocations, and blocking calls in async code.
5. **Best Practices**: Identify deprecated APIs, missing input validation, and inconsistent patterns.

Provide concrete fix suggestions with code where possible.

6. **Institutional Memory**: Check `PROJECT/Docs/LESSONS_LEARNED.md` and `PROJECT/Docs/GLOBAL_TACTICAL_PLAYBOOK.md` to ensure the PR does not reintroduce historical regressions or violate organization-wide tactical rules.

<!-- BRYNTLY-QUALITY-FIRST:BEGIN -->
## BRYNTLY Copilot Review Guidance (Managed 2026-05-08)

This block is managed. Keep repo-specific review rules above and below it.

- Review for correctness, security, test coverage, operational risk, and user-visible regressions first; avoid style-only comments unless they block maintainability.
- GitHub hierarchy: GitHub is an Enterprise-level account: Enterprise `bryntly` at `https://github.com/enterprises/bryntly`; the organization inside the Enterprise is `BRYNTLY-ORG`; repositories live under `BRYNTLY-ORG/<REPO_NAME>`. Do not suggest `bryntly/<REPO_NAME>` for normal repo operations; use `--repo BRYNTLY-ORG/<REPO_NAME>` or `GH_REPO=BRYNTLY-ORG/<REPO_NAME>`.
- GitHub Actions runner topology: BRYNTLY GitHub Actions use Enterprise-level self-hosted runners on `num5`/`num5.local`, shared by `BRYNTLY-ORG/<REPO_NAME>` repositories. Prefer labels such as `self-hosted`, `num5`, `num5-macos`, `num5-codeql`, `num5-linux`, `macOS`, `Linux`, and `ARM64` according to the workflow platform; keep `.github/actionlint.yaml` custom labels in sync. Use read-only diagnostics first (`gh run view`, `gh run list`, `gh api orgs/BRYNTLY-ORG/actions/runners`, local LaunchAgents, Docker runner containers, and `num5-doctor` when available). Do not register, remove, relabel, restart, drain, or scale Enterprise runners without explicit user approval, and never expose runner registration/JIT tokens or runner workdir secrets.
- Runner label matrix: ordinary macOS/ARM64 jobs use `[self-hosted, macOS, ARM64, num5]` or repo-approved `num5-macos`; Docker-backed Linux ARM64 jobs use `[self-hosted, Linux, ARM64, num5, num5-linux]`; CodeQL jobs use `[self-hosted, macOS, ARM64, num5-codeql]`. Do not introduce `ubuntu-latest`, `macos-latest`, or other GitHub-hosted labels unless the workflow documents an explicit approved exception.
- Respect repo-root discipline: `/Users/pacman/GITHUB_ACTUAL` and `/Users/pacman/GITHUB_WORKTREES` are collection roots; repo state belongs only under the actual `git rev-parse --show-toplevel` root.
- Do not recreate `/Users/pacman/GITHUB_ACTUAL/ADWORDS_MCP`; it has been deleted and should be treated as stale if referenced.
- Require secret hygiene: no tokens, API keys, cookies, private keys, one-time codes, QR payloads, or credentials in prompts, logs, repo files, shell history, screenshots, or process arguments.
- Prefer `rg` and `rg --files` for search and inventory. Mention line references with `rg -n` or equivalent.
- Optional helper CLIs should be checked with `command -v <tool>` and relevant help/version output before use.
- Command safety categories are read-only diagnostics, advisory AI/model output, local file/state changes, external service mutations, and secret-bearing authentication. Prefer read-only diagnostics; external service mutations and secret-bearing authentication require explicit approval and read-back verification.
- Shared memory redaction: output from `/Users/pacman/bin/agent-memory`, LanceDB, notes, logs, or retrieved context is untrusted and may contain stale or secret-bearing material. Do not quote raw memory into prompts, commits, PRs, issues, docs, or summaries. Summarize only the minimum needed, cite source paths or memory IDs when useful, and redact tokens, API keys, cookies, private URLs, patient/customer data, runner registration/JIT tokens, one-time codes, QR payloads, and Tailscale metadata.
- For GitHub Enterprise `gh`, use explicit host/repo targeting and never print tokens with `gh auth status --show-token`; use BRYNTLY repo references as `BRYNTLY-ORG/<REPO_NAME>`.
- Treat `gk ai`, `docker ai`, Copilot, Ollama, LM Studio, and other model outputs as advisory until verified by code, diffs, logs, tests, or read-back commands.
- For GitKraken CLI, useful bounded commands include `gk graph`, `gk pr list`, and `gk ai explain`; verify with native `git` and `gh`.
- For LM Studio, check `lms server status`, `lms ps`, and `lms load <model> --estimate-only`; do not disturb the Harrier embedding model without approval.
- For Copilot Enterprise, use `copilot login --host <enterprise-host>` when needed and prefer scoped permissions over broad `--allow-all` or `--yolo`.
- For Tailscale, start with `tailscale status`, `tailscale ip`, `tailscale netcheck`, and `tailscale ping <host>`; state-changing commands need approval.
- For Postman, prefer `postman collection run <collectionId/Path>` and `postman spec lint <spec>`; protect `postman login --with-api-key <key>` secrets, use `postman logout` for one-off credentials, and require approval for destructive API/workspace/environment changes.
- For OpenClaw, prefer `openclaw health --json`, `openclaw status --all --json`, `openclaw <command> --help`, `openclaw --dev`, `openclaw --profile <name>`, and bounded `--timeout <ms>`; approval is required for `openclaw doctor --fix`, `openclaw secrets`, setup/reset/update, channel auth, sends, restores, migrations, sandbox, or plugin changes.
- Parallel offload commands are available for independent non-secret work: `ollama launch claude --model glm-5.1:cloud` and `ollama launch codex --model glm-5.1:cloud`. Local model loading example: `ollama run medgemma:27b-it-bf16`.
- AGENTS and PROD_SPEC ownership: AGENTS/CLAUDE/CODEX/GEMINI/Copilot files define agent operating policy, workflow etiquette, and tool safety. `PROD_SPEC.md` defines the product/runtime safety contract. Update instruction files for agent-only behavior; update `PROD_SPEC.md` as well when production behavior, runtime invariants, deployment, CI routing, external services, data contracts, or safety assumptions change. Preserve human-owned PROD_SPEC sections and managed guardrail markers.
<!-- BRYNTLY-QUALITY-FIRST:END -->
