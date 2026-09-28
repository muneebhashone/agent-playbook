export type Source = {
  id: number;
  title: string;
  tool: "Codex" | "Claude Code";
  url: string;
  about: string;
};

export const sources: Source[] = [
  {
    id: 1,
    title: "Rethinking skills and prompts for GPT-6 Astra",
    tool: "Codex",
    url: "https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra",
    about: "Task prompts, AGENTS.md, skills, and completion criteria.",
  },
  {
    id: 2,
    title: "GPT-6 model guidance",
    tool: "Codex",
    url: "https://developers.openai.com/api/docs/guides/latest-model",
    about: "Model choice and prompting patterns across Astra, Sol, and Luna.",
  },
  {
    id: 3,
    title: "Building games with Astra",
    tool: "Codex",
    url: "https://developers.openai.com/blog/how-to-build-games-with-astra",
    about: "Real prompts from an iterative Codex build.",
  },
  {
    id: 4,
    title: "Run long horizon tasks with Codex",
    tool: "Codex",
    url: "https://developers.openai.com/blog/run-long-horizon-tasks-with-codex",
    about: "Specs, milestones, validation, and Plan mode.",
  },
  {
    id: 5,
    title: "Using Goals in Codex",
    tool: "Codex",
    url: "https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex",
    about: "Measurable outcomes for work spanning several turns.",
  },
  {
    id: 6,
    title: "Best practices for Claude Code",
    tool: "Claude Code",
    url: "https://code.claude.com/docs/en/best-practices",
    about: "The core guide to tasks, context, and workflow.",
  },
  {
    id: 7,
    title: "How Claude remembers your project",
    tool: "Claude Code",
    url: "https://code.claude.com/docs/en/memory",
    about: "Writing persistent instructions in CLAUDE.md.",
  },
  {
    id: 8,
    title: "Extend Claude with skills",
    tool: "Claude Code",
    url: "https://code.claude.com/docs/en/skills",
    about: "Reusable builder workflows and commands.",
  },
  {
    id: 9,
    title: "Prompting Claude Fable 5.1",
    tool: "Claude Code",
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1",
    about: "Long tasks, scope, edits, progress, and effort.",
  },
  {
    id: 10,
    title: "Prompting Claude Opus 5.5",
    tool: "Claude Code",
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5",
    about: "Effort, unattended runs, progress, and frontend work.",
  },
  {
    id: 11,
    title: "Getting the most out of Opus 5.5 in Claude and Claude Code",
    tool: "Claude Code",
    url: "https://claude.dev/blog/getting-the-most-out-of-opus-5-5/",
    about: "Concrete prompts for defining done, steering long runs, and checking results.",
  },
  {
    id: 12,
    title: "Using Claude Code: Spending your effort",
    tool: "Claude Code",
    url: "https://claude.dev/blog/spending-your-effort/",
    about: "Choosing effort with Opus 5.5 and Fable 5.1.",
  },
  {
    id: 13,
    title: "The new rules of context engineering for Claude 5 generation models",
    tool: "Claude Code",
    url: "https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/",
    about: "How prompts, skills, memory, and CLAUDE.md work together.",
  },
  {
    id: 14,
    title: "Architectural visualization with Astra",
    tool: "Codex",
    url: "https://developers.openai.com/blog/architectural-visualization-with-astra",
    about: "Starting from a visual brief and refining the built artifact.",
  },
  {
    id: 15,
    title: "Automating repetitive work at OpenAI with Codex",
    tool: "Codex",
    url: "https://developers.openai.com/blog/automating-repetitive-work-at-openai-with-codex",
    about: "A goal, a review point, and decisions recorded for future runs.",
  },
];
