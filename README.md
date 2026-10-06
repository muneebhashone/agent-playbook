# Agent Playbook

Paste one prompt into Claude Code, Codex, or Pi, and it writes a repo-accurate `CLAUDE.md` or `AGENTS.md` for you. The prompt is distilled from 15 official OpenAI and Anthropic guides.

Live site: https://playbook.themuneebh.com

## What it is

Most agent instruction files are generic templates the agent can't use. Agent Playbook turns the official guidance into a single copy-paste prompt: the agent reads your actual repo (manifests and scripts, CI, lint and test config, env examples, folder layout, recent git history) and writes the file itself. The result describes the project as it really is.

The site offers four things:

- **Setup prompts** — one prompt per target that writes the instruction file.
- **Skill packs** — optional installs with the exact command for each agent, plus any step only you can do.
- **Principles and prompts** — ten topics distilled from the guides, and the prompts quoted from them, ready to copy.
- **Build by hand** — a form that composes a rules file without running an agent.

## Setup targets

| Target | Writes | Setup document |
| --- | --- | --- |
| Claude Code | `CLAUDE.md` | `/setup/claude.md` |
| Codex | `AGENTS.md` | `/setup/codex.md` |
| Pi | `AGENTS.md` | `/setup/pi.md` |
| Both | `AGENTS.md`, plus a `CLAUDE.md` that imports it | `/setup/both.md` |

Skill packs share one document at `/setup/skills.md`.

Each setup URL is a static, plain-text prompt. Its top marker carries the playbook version, so a generated file can be refreshed later by re-running the same URL and prompt.

## How it works

1. Pick a target and copy the prompt.
2. Paste it into the agent in the repo you want documented.
3. The agent reads the repo and writes the instruction file.
4. To refresh later, re-run the setup URL and let the agent update the file.

## Skill packs

Defined in `src/content/skills.ts`, each with the install command for Claude Code, Codex, and Pi:

- **Matt Pocock's skills** — small skills you call yourself: PRDs, issues, TDD, refactoring, codebase design.
- **Ponytail** — writes only the code the task needs: platform features and stdlib before new code.
- **Caveman** — terse replies that cut input and output tokens while code, paths, and errors stay exact.
- **Impeccable** — frontend design workflow: shape, critique, audit, and polish UI, backed by detector rules.

Claude Code and Codex installs load on the next session. Pi installs land in `~/.agents/skills` and are invoked with `/skill:<name>` after a restart.

## Project layout

```
src/
  app/
    page.tsx                 the single-page site
    layout.tsx               metadata and fonts
    setup/[file]/route.ts    serves /setup/claude.md, codex.md, pi.md, both.md, skills.md
    opengraph-image.tsx      social preview
  components/
    agent-prompt-card.tsx    target tabs and the setup prompt
    rules-builder.tsx        the "build by hand" form
    copy-button.tsx, source-chips.tsx, social-card.tsx, open-on-hash.tsx
  content/                   the source of truth
    site.ts                  site URL, title, description, PLAYBOOK_VERSION
    agent-prompt.ts          targets, setup docs, prompt builders, launch commands
    skills.ts                skill packs
    principles.ts, prompts.ts, rules.ts, sources.ts
```

All site copy and generated documents come from `src/content`. To change what the site says, edit the content files, not the components.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

Next.js 16 with React 19 and Turbopack, TypeScript, Tailwind CSS v4.

## Deployment

Deployed on Vercel. `SITE_URL` in `src/content/site.ts` is the canonical URL. It ends up inside every copied prompt and generated file, so it must stay fixed per the production domain, not per deploy.

## Versioning

`PLAYBOOK_VERSION` in `src/content/site.ts`. Bump it when the rules or setup instructions change, so generated files show how current they are.
