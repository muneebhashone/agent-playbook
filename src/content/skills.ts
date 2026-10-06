export type SkillPack = {
  id: string;
  name: string;
  repo: string;
  about: string;
  /** Shell commands, run in order. Claude Code installs at project scope, so they land in .claude/settings.json. */
  claude: string[];
  codex: string[];
  pi: string[];
  /** Steps only the human can do in the agent's UI, reported back under "Blocked on me". */
  afterInstall?: { claude?: string; codex?: string; pi?: string };
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
    pi: ["npx skills add mattpocock/skills -a pi -g"],
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
    pi: ["npx skills add DietrichGebert/ponytail -a pi -g"],
    afterInstall: {
      codex: "In Codex, open /hooks, review and trust Ponytail's two lifecycle hooks, then start a new thread.",
      pi: "Restart Pi, then run /skill:ponytail when you want the constraint.",
    },
  },
  {
    id: "caveman",
    name: "Caveman",
    repo: "https://github.com/juliusbrussee/caveman",
    about: "Terse replies that cut input and output tokens while code, paths, and errors stay exact.",
    claude: [
      "claude plugin marketplace add JuliusBrussee/caveman --scope project",
      "claude plugin install caveman@caveman --scope project",
    ],
    codex: ["npx skills add JuliusBrussee/caveman -a codex -g"],
    pi: ["npx skills add JuliusBrussee/caveman -a pi -g"],
    afterInstall: {
      claude: "Type /caveman if it doesn't start on its own.",
      codex: "Type /caveman if it doesn't start on its own.",
      pi: "Restart Pi, then run /skill:caveman. Say stop caveman to go back.",
    },
  },
  {
    id: "impeccable",
    name: "Impeccable",
    repo: "https://github.com/pbakaus/impeccable",
    about: "Frontend design workflow: shape, critique, audit, and polish UI, backed by detector rules.",
    claude: ["npx impeccable install --providers=claude --scope=project"],
    codex: ["npx impeccable install --providers=codex --scope=project"],
    pi: ["npx impeccable install --providers=pi --scope=project"],
    afterInstall: {
      claude: "Run /impeccable init once in this repo.",
      codex: "Run /impeccable init once in this repo, then open /hooks and trust the Impeccable project hook.",
      pi: "Restart Pi, then run /skill:impeccable init.",
    },
  },
];
