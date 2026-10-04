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
// One workflow pack on purpose. Superpowers, Addy Osmani's agent-skills, and Compound Engineering each
// bring their own plan/TDD/review flow, so installing more than one gives the agent competing triggers
// for the same job. Superpowers also tells the agent it MUST invoke a skill on a 1% match, which fights
// this playbook's narrow-trigger, soft-language rules. Ponytail stays: it adds a constraint, not a flow.
export const skillPacks: SkillPack[] = [
  {
    id: "mattpocock",
    name: "Matt Pocock's skills",
    repo: "https://github.com/mattpocock/skills",
    about: "Small skills you call yourself: PRDs, issues, TDD, refactoring, codebase design.",
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
];
