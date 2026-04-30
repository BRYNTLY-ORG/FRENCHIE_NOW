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
