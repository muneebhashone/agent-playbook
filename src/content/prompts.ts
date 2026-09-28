export type PromptExample = {
  title: string;
  text: string;
  source: number;
};

/** Quoted verbatim from the sources. */
export const prompts: PromptExample[] = [
  {
    title: "Define done and when to stop",
    source: 11,
    text: `Migrate the payment endpoints from the old client to the new one.
Done means: every endpoint uses the new client, the old client is
deleted, and the test suite passes.
Stop and ask me only if a test fails for a reason you can't explain.`,
  },
  {
    title: "Get interviewed into a spec",
    source: 6,
    text: `I want to build [brief description]. Interview me in detail using the AskUserQuestion tool. Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs. Don't ask obvious questions, dig into the hard parts I might not have considered. Keep interviewing until we've covered everything, then write a complete spec to SPEC.md.`,
  },
  {
    title: "A Codex Goal with a verification surface",
    source: 5,
    text: `/goal Reduce p95 checkout latency below 120 ms, verified by the checkout benchmark, while keeping the correctness suite green. Use only the checkout service, benchmark fixtures, and related tests. Between iterations, record what changed, what the benchmark showed, and the next best experiment to try. If the benchmark cannot run or no valid paths remain, stop with the attempted paths, the evidence gathered, the blocker, and the next input needed.`,
  },
  {
    title: "Fan out an audit to subagents",
    source: 11,
    text: `Audit every service in services/ for the retry bug in the linked issue.
Give each service to its own subagent. When a subagent reports back,
check its evidence before you accept it.
Finish with one table: service, affected yes or no, and the evidence.`,
  },
  {
    title: "Review a diff for blockers only",
    source: 11,
    text: `Review the diff on this branch against main.
List only problems you'd block the merge for. For each one, give the
file and line, why it's wrong, and how to show it fails.`,
  },
  {
    title: "Review against the plan in a fresh context",
    source: 6,
    text: `Use a subagent to review the rate limiter diff against PLAN.md. Check that every requirement is implemented, the listed edge cases have tests, and nothing outside the task's scope changed. Report gaps, not style preferences.`,
  },
  {
    title: "Fix the root cause",
    source: 6,
    text: `the build fails with this error: [paste error]. fix it and verify the build succeeds. address the root cause, don't suppress the error`,
  },
  {
    title: "Nudge an unattended run",
    source: 10,
    text: `Your task list still has open items: migrate the remaining two endpoints and update their tests. Continue with them. If one is blocked, say what is blocking it.`,
  },
  {
    title: "Plan, approve, document",
    source: 15,
    text: `# Goal: Run the evaluation against the current model
- Review a previous run to understand the workflow.
- Write a detailed plan in this notebook.
- Wait for me to review and approve the plan before beginning.
- Document the commands you run, their output, and how you interpret the results.`,
  },
  {
    title: "Name the styles you don't want",
    source: 10,
    text: `Output a vanilla HTML/CSS personal website with placeholder data. Do not use a cream or off-white background, italic accent words in headlines, numbered "01/02/03" section labels, monospace labels, or pill-shaped buttons.`,
  },
  {
    title: "Grow the scope with a plan first",
    source: 14,
    text: `I like the minimalist, modern style, so keep that while we grow the house to be much more livable. Draw me a floor plan first. We'll validate and evolve it from there.`,
  },
  {
    title: "Feedback from actual use",
    source: 3,
    text: `When I approach almost parallel to a planet, I can still come in too fast, and the planet nearly disappears while terrain loads. We need to fix the speed curve and terrain streaming together. Could atmosphere soften the transition between distant LOD and detailed terrain? The planet should never disappear during the approach.`,
  },
];
