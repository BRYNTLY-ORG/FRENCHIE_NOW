# Claude Guidance

Read `AGENTS.md` first; it is the source of truth for this repository's AI
review agents, workflow triggers, authentication expectations, and assignment
rules.

Claude's role in this repo is complementary review:

- Verify scope and intent, especially whether a PR actually solves the stated
  problem.
- Look for failure paths, edge cases, and cross-file regressions.
- Keep review comments terse and material; skip style-only nits.

Use `@claude` in PR comments or review threads to request an interactive Claude
response. The automated `claude-code-action` workflow also reviews non-draft PRs
on open, sync, and ready-for-review events when `CLAUDE_CODE_OAUTH_TOKEN` is
configured.
