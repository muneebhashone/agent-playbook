import { ruleGroups, type Target } from "./rules";
import { PLAYBOOK_VERSION } from "./site";

export type PromptTarget = "claude" | "codex" | "both";

export const setupFiles: Record<PromptTarget, string> = {
  claude: "claude.md",
  codex: "codex.md",
  both: "both.md",
};

export function setupUrl(siteUrl: string, target: PromptTarget): string {
  return `${siteUrl}/setup/${setupFiles[target]}`;
}

const writtenFile: Record<PromptTarget, string> = {
  claude: "CLAUDE.md",
  codex: "AGENTS.md",
  both: "AGENTS.md and CLAUDE.md",
};

/** What the builder copies: one line that pulls the current instructions from the hosted site. */
export function buildShortPrompt(siteUrl: string, target: PromptTarget): string {
  return `Run \`curl -fsSL ${setupUrl(siteUrl, target)}\` and follow the instructions it returns to write or update this project's ${writtenFile[target]}.`;
}

export const promptTargets: { id: PromptTarget; label: string; note: string }[] = [
  { id: "claude", label: "Claude Code", note: "Writes CLAUDE.md" },
  { id: "codex", label: "Codex", note: "Writes AGENTS.md" },
  { id: "both", label: "Both", note: "AGENTS.md, plus a CLAUDE.md that imports it" },
];

function ruleLibrary(target: Target): string {
  return ruleGroups
    .map((g) => {
      const rules = g.rules.filter((r) => !r.only || r.only === target);
      return [`### ${g.heading}`, ...rules.map((r) => `- ${r.text}`)].join("\n");
    })
    .join("\n\n");
}

const fileLine: Record<PromptTarget, string> = {
  claude: "Write a CLAUDE.md at the repository root for Claude Code.",
  codex: "Write an AGENTS.md at the repository root for Codex.",
  both: "Write an AGENTS.md at the repository root that Codex and Claude Code will share, and a CLAUDE.md next to it whose first line is `@AGENTS.md` (Claude Code ignores AGENTS.md when a CLAUDE.md exists, so the import keeps one source of truth). Put only Claude Code-specific notes below the import, or nothing.",
};

/**
 * The hosted setup instructions. Self-contained: the agent reading them has never seen this site,
 * so everything it needs to follow the playbook is inlined.
 */
export function buildSetupDoc(siteUrl: string, target: PromptTarget): string {
  const file = target === "claude" ? "CLAUDE.md" : "AGENTS.md";
  const library = ruleLibrary(target === "claude" ? "claude" : "agents");
  const marker = `<!-- Agent Playbook ${PLAYBOOK_VERSION}. To refresh: curl -fsSL ${setupUrl(siteUrl, target)} and follow it. -->`;

  return `# Agent Playbook setup (version ${PLAYBOOK_VERSION})

${fileLine[target]} Base it on this project as it actually is, not on a generic template.

Put this line at the very top of ${target === "both" ? "AGENTS.md" : file}, replacing any older Agent Playbook line:

${marker}

If the file already has an Agent Playbook line with an older version, this is a refresh: bring the working rules up to date with the library below, and keep the project-specific parts (purpose, commands, docs, gotchas) unless they are wrong.

## 1. Study the project first

Read before writing: the README, package or build manifests and their scripts, CI config, lint/format/test config, env examples, the top-level folder layout, and recent git history for commit and branch conventions. If an AGENTS.md, CLAUDE.md, .cursorrules, or similar file already exists, read it and improve it instead of replacing it; keep the owner's rules unless they contradict each other, and tell me what you changed.

## 2. Write the file

Keep it under 200 lines. Every line should pass this test: would removing it cause an agent to make a mistake here? In this order:

1. **Purpose.** One or two sentences on what the repo is for and its main stack.
2. **Commands.** The exact commands an agent can't guess: install, dev, build, run a single test, lint, typecheck. Only list commands you confirmed exist; run the fast, safe ones (lint, typecheck, a single test) to check they work.
3. **Where to look.** Point to docs by situation ("docs/database.md for schema changes"), never "read all of these before every edit".
4. **Gotchas.** Spend most of the file here: non-obvious conventions, env quirks, generated files not to edit, places where the code differs from what the framework's defaults would suggest. Skip anything visible from the file tree or true of every project.
5. **Working rules.** Pick the rules from the library below that fit this project and how it's worked on. Copy them as written, or tighten them with this repo's real commands and paths. Leave out any that don't apply.

Write rules that can be checked, with exact commands, paths, and formats. Don't add lines telling the agent to "think carefully" or to "always run the tests"; current models do both, and the extra lines cause slower replies and over-testing. Don't use strong "always ask first" language; instead, grant explicit permission for workflows that are safe here (for example a local test suite with disposable fixtures). Multi-step procedures belong in skills, not in this file; if you find one, suggest it as a skill instead of inlining it.

## Rule library

${library}

## Done means

- ${target === "both" ? "AGENTS.md and CLAUDE.md are" : `${file} is`} written at the repository root, under 200 lines.
- Every command in it exists, and the ones you ran worked.
- No other files were changed.
- You end with three headings: **Blocked on me** (anything you couldn't determine), **Changed**, and **Found** (gotchas you noticed but weren't sure enough to include).
`;
}
