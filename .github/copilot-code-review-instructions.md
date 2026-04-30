# Copilot Code Review Instructions

When reviewing pull requests, focus on:

1. **Security**: Check for injection vulnerabilities, exposed secrets, and auth bypasses.
2. **Correctness**: Look for logic errors, off-by-one issues, null dereferences, and race conditions.
3. **Error Handling**: Ensure errors are caught and handled appropriately.
4. **Performance**: Flag N+1 queries, unnecessary allocations, and blocking calls in async code.
5. **Best Practices**: Identify deprecated APIs, missing input validation, and inconsistent patterns.

Provide concrete fix suggestions with code where possible.

6. **Institutional Memory**: Check `PROJECT/Docs/LESSONS_LEARNED.md` and `PROJECT/Docs/GLOBAL_TACTICAL_PLAYBOOK.md` to ensure the PR does not reintroduce historical regressions or violate organization-wide tactical rules.
