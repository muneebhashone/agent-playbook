export type SkillPack = {
  id: string;
  name: string;
  repo: string;
  about: string;
  /** Shell commands, run in order. Claude Code installs at project scope, so they land in .claude/settings.json. */
  claude: string[];
  codex: string[];
  /** Steps only the human can do in the agent's UI, reported back under "Blocked on me". */
  afterInstall?: { claude?: string; codex?: string };
};

// Opt-in only: nothing here is installed unless it's ticked in the setup prompt.
export const skillPacks: SkillPack[] = [
  {
    id: "superpowers",
    name: "Superpowers",
    repo: "https://github.com/obra/superpowers",
    about: "A full development method: brainstorm, plan, TDD, debug systematically, review.",
    claude: ["claude plugin install superpowers@claude-plugins-official --scope project"],
    codex: ["codex plugin add superpowers@openai-curated-remote"],
  },
  {
    id: "mattpocock",
    name: "Matt Pocock's skills",
    repo: "https://github.com/mattpocock/skills",
    about: "Skills for real engineers: issues, PRDs, TDD, refactoring, and codebase design.",
    claude: ["claude plugin install mattpocock-skills@claude-plugins-official --scope project"],
    codex: ["codex plugin add mattpocock-skills@openai-curated-remote"],
    afterInstall: {
      claude: "Run /setup-matt-pocock-skills once in this repo; it asks which issue tracker you use.",
      codex: "Run /setup-matt-pocock-skills once in this repo; it asks which issue tracker you use.",
    },
  },
  {
    id: "ponytail",
    name: "Ponytail",
    repo: "https://github.com/dietrichgebert/ponytail",
    about: "Writes only the code the task needs: platform features and stdlib before new code.",
    claude: [
      "claude plugin marketplace add DietrichGebert/ponytail --scope project",
      "claude plugin install ponytail@ponytail --scope project",
    ],
    codex: ["codex plugin marketplace add DietrichGebert/ponytail", "codex plugin add ponytail@ponytail"],
    afterInstall: {
      codex: "In Codex, open /hooks, review and trust Ponytail's two lifecycle hooks, then start a new thread.",
    },
  },
  {
    id: "agent-skills",
    name: "Addy Osmani's agent skills",
    repo: "https://github.com/addyosmani/agent-skills",
    about: "Production engineering skills: specs, TDD, code review, performance, and shipping.",
    claude: [
      "claude plugin marketplace add addyosmani/agent-skills --scope project",
      "claude plugin install agent-skills@addy-agent-skills --scope project",
    ],
    codex: ["codex plugin marketplace add addyosmani/agent-skills", "codex plugin add agent-skills@agent-skills"],
  },
  {
    id: "compound-engineering",
    name: "Compound Engineering",
    repo: "https://github.com/EveryInc/compound-engineering-plugin",
    about: "Plan, work, review, then record what was learned so each run makes the next one easier.",
    claude: [
      "claude plugin marketplace add EveryInc/compound-engineering-plugin --scope project",
      "claude plugin install compound-engineering@compound-engineering-plugin --scope project",
    ],
    codex: [
      "codex plugin marketplace add EveryInc/compound-engineering-plugin",
      "codex plugin add compound-engineering@compound-engineering-plugin",
    ],
  },
];
