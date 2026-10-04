export type Point = {
  text: string;
  sources: number[];
  /** Highlighted: worth remembering if you read nothing else. */
  key?: boolean;
};

export type Principle = {
  id: string;
  title: string;
  lede: string;
  points: Point[];
};

/** The short version, shown in the hero. */
export const shortVersion: Point[] = [
  { text: "Say what done means, with a check the agent can run, before it starts.", sources: [1, 5, 6, 11] },
  { text: "Hand over the whole task in one message, then let it run.", sources: [11, 9] },
  { text: "Keep CLAUDE.md and AGENTS.md short: repo purpose, commands, gotchas.", sources: [6, 7, 13] },
  { text: "Delete rules written for older models. The new ones take every word seriously.", sources: [1, 13, 11] },
  { text: "Put procedures in skills that load on demand, with narrow triggers.", sources: [1, 8, 13] },
  { text: "On long runs, keep the plan and status in files, not the chat.", sources: [4, 11] },
  { text: "Use low effort to explore, high effort to verify.", sources: [12] },
  { text: "Ask for evidence, not claims. Have a fresh context review the diff.", sources: [5, 6, 11] },
];

export const principles: Principle[] = [
  {
    id: "done",
    title: "Define done before you start",
    lede: "The biggest single lever. Agents stop too early or wander when the finish line is vague.",
    points: [
      { text: "Give the whole task in one message and name the finish line: “the tests pass”, “every endpoint is migrated”. Then leave it alone.", sources: [11], key: true },
      { text: "Say when you want it to stop and ask, not only what done looks like.", sources: [11] },
      { text: "Completion must rest on evidence (files, tests, logs, benchmark output), not on the model believing it is probably done. Hitting a budget is not completion.", sources: [5] },
      { text: "Give the agent a check it can run and get a pass or fail from: tests, a build exit code, a linter, a diff against a fixture, a screenshot compared to a design.", sources: [6], key: true },
    ],
  },
  {
    id: "instructions",
    title: "Keep instruction files lean",
    lede: "CLAUDE.md and AGENTS.md load every session. Every line costs context and can conflict with something else.",
    points: [
      { text: "Spend a sentence on what the repo is for, then spend most of the tokens on gotchas. Skip anything the agent can see from the file tree.", sources: [13, 6], key: true },
      { text: "Instructions tuned for older models can now hold the new ones back. Vague or contradictory guidance does not get ignored, it gets taken seriously.", sources: [1], key: true },
      { text: "Remove “run tests / check your work” nagging and “think carefully” lines. The new models do both on their own, and the extra lines cause over-testing or slower replies.", sources: [1, 11] },
      { text: "Anything that must happen every time belongs in a hook, not the file. CLAUDE.md is advisory; hooks are deterministic.", sources: [6, 7] },
    ],
  },
  {
    id: "skills",
    title: "Move procedures into skills",
    lede: "A skill’s body loads only when it is used. That makes it the right home for anything longer than a rule.",
    points: [
      { text: "Write narrow triggers. Bad: “Use when working with databases, queries, models, or persistence.” Good: “Use when adding or changing a migration, or reviewing its rollout.”", sources: [1], key: true },
      { text: "Create a skill when you keep pasting the same checklist, or when a CLAUDE.md section has grown into a procedure.", sources: [8, 7] },
      { text: "Keep SKILL.md under 500 lines and make it a router: link sibling files and scripts and say when to load each.", sources: [8, 1] },
      { text: "Give side-effect workflows (deploy, commit, send a message) disable-model-invocation: true so only you can trigger them.", sources: [8, 6] },
    ],
  },
  {
    id: "long-runs",
    title: "Run long tasks from files, not chat",
    lede: "Hours-long runs survive compaction and drift when the plan, status, and decisions live on disk.",
    points: [
      { text: "Use durable project memory: a spec, a plan with milestones small enough to finish in one loop, a runbook, and a status log the agent re-reads.", sources: [4], key: true },
      { text: "When something is ambiguous, make a reasonable decision and record it in the plan before coding, so the agent doesn’t oscillate.", sources: [4] },
      { text: "Use Codex Goals (/goal) when the finish line is clear but the path isn’t: “<end state> verified by <evidence> while preserving <constraints>… If blocked, <what to report>.”", sources: [5] },
      { text: "End every run with three headings: Blocked on me, Changed, Found. Read the first one first.", sources: [11] },
    ],
  },
  {
    id: "scope",
    title: "Hold the scope",
    lede: "The request is the deliverable. Don’t quietly narrow, widen, or swap it.",
    points: [
      { text: "Report pre-existing bugs as follow-ups instead of fixing them, unless the requested behavior can’t work without the fix.", sources: [9], key: true },
      { text: "If part of the task is blocked, finish everything else and say exactly what was left out.", sources: [9] },
      { text: "Where the task is ambiguous, implement the reading the wording and surrounding code most directly support, and state that assumption.", sources: [9] },
      { text: "Edit surgically instead of rewriting whole files.", sources: [9] },
    ],
  },
  {
    id: "verify",
    title: "Verify with evidence",
    lede: "Ask for proof, give the agent ways to look, and get a second opinion from a fresh context.",
    points: [
      { text: "Ask for evidence, not claims: the test output, the command and what it returned, a screenshot.", sources: [6], key: true },
      { text: "Have a subagent in a fresh context review the diff. Tell it to flag only gaps that affect correctness or the stated requirements, or it will push toward over-engineering.", sources: [6, 11] },
      { text: "Reproduce bugs first. Write the failing test, fix, confirm it passes, and check that tests fail on half-finished fixes.", sources: [4, 12] },
      { text: "For research, add: “Mark anything you couldn’t confirm, and say where you looked.” Keep confirmed, approximate, and blocked claims separate.", sources: [11, 5] },
    ],
  },
  {
    id: "effort",
    title: "Spend effort deliberately",
    lede: "Effort sets how much the model verifies and judges on its own. It does not change the basic approach.",
    points: [
      { text: "Low: quick in-the-loop replies. Medium: most regular engineering. High: bug fixes in brownfield code, anything with edge cases. Max: fully autonomous hard problems.", sources: [12], key: true },
      { text: "A useful loop: have the model interview you for a spec, implement on low, review and iterate on low, then verify and test on high.", sources: [12] },
      { text: "Effort cuts “missed a case” failures but not wrong approaches. Spend high or max on security review and performance work.", sources: [12] },
      { text: "To get less thinking, lower effort instead of adding prompt instructions. Change it per task with /effort; that doesn’t break the prompt cache.", sources: [10, 12] },
    ],
  },
  {
    id: "context",
    title: "Manage the context window",
    lede: "“Claude’s context window fills up fast, and performance degrades as it fills.”",
    points: [
      { text: "Run /clear between unrelated tasks. After more than two corrections on the same issue, clear and start over with a better prompt.", sources: [6], key: true },
      { text: "Explore, plan, implement, commit. Skip the plan if you could describe the diff in one sentence.", sources: [6] },
      { text: "Delegate research to subagents so the file dumps stay out of your main context.", sources: [6] },
      { text: "Instructions given only in conversation are lost at compaction. Move anything durable into CLAUDE.md.", sources: [7] },
    ],
  },
  {
    id: "visual",
    title: "Brief visual work precisely",
    lede: "“Avoid the AI look” swaps one default for another. Name what you don’t want.",
    points: [
      { text: "List the specific styles to avoid, check the first result, and extend the list.", sources: [10, 11], key: true },
      { text: "Settle the look with reference images before building much, then save them as targets.", sources: [3] },
      { text: "Change one dimension per prompt: setting and lighting, then layout, then detail.", sources: [14] },
      { text: "Give feedback from actually using the thing, and be specific about what to change. Start small: a boat, a room, a single interaction.", sources: [3] },
    ],
  },
  {
    id: "decisions",
    title: "Keep a review point and a record",
    lede: "The human decides when a plan is ready and when a choice needs judgement. Everything else can run.",
    points: [
      { text: "Before wrapping up, record the decisions that would otherwise disappear into the conversation: why an option was chosen and what to do differently next time.", sources: [15], key: true },
      { text: "For repeated workflows, have the agent read records of previous runs, write a plan, and wait for approval before executing.", sources: [15] },
      { text: "Keep the human review point for choosing between alternatives with real trade-offs, not for every step.", sources: [15, 2] },
      { text: "Keep a keep-going rule, but keep your own check before anything risky or hard to undo, and keep permission prompts on for destructive commands.", sources: [11] },
    ],
  },
];

/** A true sequence, so it gets numbers. */
export const loop: { step: string; detail: string; sources: number[] }[] = [
  { step: "Interview", detail: "Have the agent interview you about the hard parts, then write SPEC.md.", sources: [6, 12] },
  { step: "Plan", detail: "Plan mode or /plan. Milestones with acceptance criteria and validation commands.", sources: [4, 6] },
  { step: "Build on low", detail: "Implement and iterate on low or medium effort while you review.", sources: [12] },
  { step: "Verify on high", detail: "Run the checks on high effort. Show output as evidence.", sources: [12, 6] },
  { step: "Fresh review", detail: "A subagent in a clean context reviews the diff for blocking issues only.", sources: [6, 11] },
  { step: "Record", detail: "Write down decisions, dead ends, and what to change next time.", sources: [15, 4] },
];
