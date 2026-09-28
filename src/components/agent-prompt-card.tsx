"use client";

import { useState } from "react";
import { buildShortPrompt, promptTargets, setupUrl, skillsUrl, type PromptTarget } from "@/content/agent-prompt";
import { skillPacks } from "@/content/skills";
import { CopyButton } from "./copy-button";

export function AgentPromptCard({ siteUrl, version }: { siteUrl: string; version: string }) {
  const [target, setTarget] = useState<PromptTarget>("claude");
  const [skills, setSkills] = useState<string[]>([]);
  const prompt = buildShortPrompt(siteUrl, target, skills);
  const toggleSkill = (id: string, on: boolean) =>
    setSkills((s) => (on ? [...s, id] : s.filter((x) => x !== id)));
  const docUrl = setupUrl(siteUrl, target);

  return (
    <div className="overflow-hidden rounded-[4px] border border-ink/80 bg-sheet shadow-[6px_6px_0_0_var(--line)]">
      <div className="border-b border-rule px-4 pt-3.5 pb-3">
        <p className="font-display text-lg font-semibold">Setup prompt for your agent</p>
        <p className="mt-0.5 text-sm text-muted">
          One line. Your agent fetches the latest playbook from this site, studies your project, and writes the file.
        </p>
        <div role="radiogroup" aria-label="Agent" className="mt-3 grid grid-cols-3 gap-1.5">
          {promptTargets.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={target === t.id}
              title={t.note}
              onClick={() => setTarget(t.id)}
              className={`rounded-[3px] border px-2 py-1.5 text-sm font-medium transition-colors ${
                target === t.id ? "border-ink bg-ink text-paper" : "border-rule hover:border-line"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">{promptTargets.find((t) => t.id === target)?.note}</p>

        <fieldset className="mt-3">
          <legend className="text-sm font-medium">Also install skill packs (optional)</legend>
          <div className="mt-1.5 space-y-1.5">
            {skillPacks.map((p) => (
              <label key={p.id} className="flex cursor-pointer items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={skills.includes(p.id)}
                  onChange={(e) => toggleSkill(p.id, e.target.checked)}
                  className="mt-1 accent-[var(--line)]"
                />
                <span>
                  <a href={p.repo} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2">
                    {p.name}
                  </a>
                  <span className="block text-muted">{p.about}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <pre className="px-4 py-4 font-code text-[0.85rem] leading-relaxed break-words whitespace-pre-wrap">{prompt}</pre>

      <div className="border-t border-rule px-4 py-3">
        <CopyButton
          text={prompt}
          label="Copy prompt"
          className="w-full border-ink! bg-ink! py-2.5! text-base! text-paper! hover:opacity-85"
        />
        <p className="mt-2.5 text-sm text-muted">
          Paste it into {target === "codex" ? "Codex" : target === "claude" ? "Claude Code" : "either agent"} from your repo root.
          Run it again any time to pick up playbook updates.{" "}
          <a href={docUrl} target="_blank" rel="noreferrer" className="text-line underline underline-offset-2">
            See what it fetches
          </a>{" "}
          (version {version})
          {skills.length > 0 && (
            <>
              {" "}and{" "}
              <a href={skillsUrl(siteUrl)} target="_blank" rel="noreferrer" className="text-line underline underline-offset-2">
                the skill install steps
              </a>
            </>
          )}
          .
        </p>
      </div>
    </div>
  );
}
