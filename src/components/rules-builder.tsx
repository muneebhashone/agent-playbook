"use client";

import { useEffect, useMemo, useState } from "react";
import { buildFile, emptyProject, ruleGroups, type ProjectInfo, type Target } from "@/content/rules";
import { CopyButton } from "./copy-button";

const STORAGE_KEY = "agent-playbook:builder";

const fileName: Record<Target, string> = { agents: "AGENTS.md", claude: "CLAUDE.md" };

const fields: { key: keyof ProjectInfo; label: string; hint: string; rows: number }[] = [
  { key: "name", label: "Project name", hint: "acme-web", rows: 1 },
  { key: "purpose", label: "What the repo is for", hint: "Customer dashboard for Acme. Next.js app, Postgres via Prisma.", rows: 2 },
  { key: "commands", label: "Commands, one per line", hint: "npm run dev\nnpm test -- path/to/file.test.ts\nnpm run lint\nnpm run typecheck", rows: 4 },
  { key: "docs", label: "Docs by situation, one per line", hint: "docs/architecture.md for service boundaries\ndocs/database.md for schema changes", rows: 2 },
  { key: "gotchas", label: "Gotchas, one per line", hint: "All types live in src/types.ts and nowhere else\nThe test DB resets on every run; never point tests at .env.local", rows: 3 },
];

type Draft = { target: Target; groups: string[]; project: ProjectInfo; shareAgents: boolean };

const defaultDraft: Draft = {
  target: "claude",
  groups: ruleGroups.filter((g) => g.defaultOn).map((g) => g.id),
  project: emptyProject,
  shareAgents: false,
};

export function RulesBuilder() {
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [loaded, setLoaded] = useState(false);
  const { target, groups, project, shareAgents } = draft;
  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));
  const setTarget = (t: Target) => update({ target: t });
  const setShareAgents = (v: boolean) => update({ shareAgents: v });
  const setProject = (p: ProjectInfo) => update({ project: p });

  // Restore the viewer's own draft after mount (the server render can't see localStorage).
  // Storage can be unavailable; the builder works without it.
  useEffect(() => {
    let restored: Draft | null = null;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved) {
        restored = {
          target: saved.target === "agents" ? "agents" : "claude",
          groups: Array.isArray(saved.groups) ? saved.groups : defaultDraft.groups,
          project: { ...emptyProject, ...saved.project },
          shareAgents: saved.shareAgents === true,
        };
      }
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from an external store
    if (restored) setDraft(restored);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {}
  }, [loaded, draft]);

  const output = useMemo(
    () => buildFile(target, groups, project, shareAgents),
    [target, groups, project, shareAgents],
  );
  const lineCount = output.split("\n").length;
  const sharing = target === "claude" && shareAgents;

  function toggle(id: string) {
    setDraft((d) => ({
      ...d,
      groups: d.groups.includes(id) ? d.groups.filter((x) => x !== id) : [...d.groups, id],
    }));
  }

  function download() {
    const url = URL.createObjectURL(new Blob([output], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName[target];
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-8">
        <fieldset>
          <legend className="mb-3 font-display text-lg font-semibold">Which agent reads it?</legend>
          <div role="radiogroup" className="grid grid-cols-2 gap-2">
            {(["claude", "agents"] as Target[]).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={target === t}
                onClick={() => setTarget(t)}
                className={`rounded-[3px] border px-3 py-2.5 text-left transition-colors ${
                  target === t ? "border-ink bg-ink text-paper" : "border-rule bg-sheet hover:border-line"
                }`}
              >
                <span className="block font-semibold">{fileName[t]}</span>
                <span className={`block text-sm ${target === t ? "opacity-80" : "text-muted"}`}>
                  {t === "claude" ? "Claude Code" : "Codex, and most other agents"}
                </span>
              </button>
            ))}
          </div>
          {target === "claude" && (
            <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={shareAgents}
                onChange={(e) => setShareAgents(e.target.checked)}
                className="mt-1 accent-[var(--line)]"
              />
              <span>
                I also use Codex. Keep the rules in AGENTS.md and have CLAUDE.md import it.
                <span className="block text-muted">
                  Claude Code skips AGENTS.md when a CLAUDE.md exists, so the import keeps one source of truth.
                </span>
              </span>
            </label>
          )}
        </fieldset>

        <fieldset disabled={sharing} className={sharing ? "opacity-45" : undefined}>
          <legend className="mb-1 font-display text-lg font-semibold">Your project</legend>
          <p className="mb-3 text-sm text-muted">
            Optional, but this is the part that helps most. Empty fields become comments that tell you what to fill in.
          </p>
          <div className="space-y-3">
            {fields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-sm font-medium">{f.label}</span>
                {f.rows === 1 ? (
                  <input
                    value={project[f.key]}
                    onChange={(e) => setProject({ ...project, [f.key]: e.target.value })}
                    placeholder={f.hint}
                    className="w-full rounded-[3px] border border-rule bg-sheet px-3 py-2 text-[0.95rem] placeholder:text-muted/60 focus:border-line focus:outline-none"
                  />
                ) : (
                  <textarea
                    value={project[f.key]}
                    onChange={(e) => setProject({ ...project, [f.key]: e.target.value })}
                    placeholder={f.hint}
                    rows={f.rows}
                    className="w-full resize-y rounded-[3px] border border-rule bg-sheet px-3 py-2 text-[0.95rem] placeholder:text-muted/60 focus:border-line focus:outline-none"
                  />
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={sharing} className={sharing ? "opacity-45" : undefined}>
          <legend className="mb-1 font-display text-lg font-semibold">Rules to include</legend>
          <p className="mb-3 text-sm text-muted">Every rule is quoted or closely adapted from the sources. Include only what you need.</p>
          <div className="divide-y divide-rule border-y border-rule">
            {ruleGroups.map((g) => (
              <label key={g.id} className="flex cursor-pointer items-start gap-3 py-2.5">
                <input
                  type="checkbox"
                  checked={groups.includes(g.id)}
                  onChange={() => toggle(g.id)}
                  className="mt-1.5 accent-[var(--line)]"
                />
                <span>
                  <span className="block font-medium">
                    {g.heading} <span className="font-normal text-muted">({g.rules.filter((r) => !r.only || r.only === target).length})</span>
                  </span>
                  <span className="block text-sm text-muted">{g.summary}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="overflow-hidden rounded-[4px] border border-ink/80 bg-sheet shadow-[6px_6px_0_0_var(--line)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule px-4 py-2.5">
            <span className="font-semibold">{fileName[target]}</span>
            <span className="flex items-center gap-2">
              <span className={`text-sm ${lineCount > 200 ? "font-semibold text-red-600" : "text-muted"}`}>
                {lineCount} lines{lineCount > 200 ? ", over the 200 line guide" : ""}
              </span>
              <CopyButton text={output} label={`Copy ${fileName[target]}`} />
              <button
                type="button"
                onClick={download}
                className="rounded-[3px] border border-ink bg-ink px-2.5 py-1 text-sm font-medium text-paper transition-opacity hover:opacity-85"
              >
                Download
              </button>
            </span>
          </div>
          <pre className="max-h-[70vh] overflow-auto p-4 font-code text-[0.8rem] leading-relaxed whitespace-pre-wrap">
            {output}
          </pre>
        </div>
        {sharing && (
          <p className="mt-4 text-sm">
            Now switch to{" "}
            <button type="button" onClick={() => setTarget("agents")} className="font-medium text-line underline underline-offset-2">
              AGENTS.md
            </button>{" "}
            to build the shared rules, and commit both files at the repo root.
          </p>
        )}
        <p className="mt-4 text-sm text-muted">
          Place it at the repo root. Lines inside <code className="font-code">{"<!-- -->"}</code> are stripped before Claude Code reads the file, so the reminders cost nothing.
        </p>
      </div>
    </div>
  );
}
