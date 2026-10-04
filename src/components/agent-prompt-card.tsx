"use client";

import { useState } from "react";
import { buildShortPrompt, promptTargets, setupUrl, skillsUrl, type PromptTarget } from "@/content/agent-prompt";
import { skillPacks } from "@/content/skills";

export function AgentPromptCard({ siteUrl, version }: { siteUrl: string; version: string }) {
  const [target, setTarget] = useState<PromptTarget>("claude");
  const [skills, setSkills] = useState<string[]>([]);
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");
  const prompt = buildShortPrompt(siteUrl, target, skills);
  const toggleSkill = (id: string) => setSkills((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 1800);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-rule bg-panel shadow-[0_1px_0_var(--rule),0_24px_48px_-28px_rgb(0_0_0/0.45)]">
      {/* Editor-style tabs: the agent decides which file gets written. */}
      <div role="radiogroup" aria-label="Agent" className="flex overflow-x-auto border-b border-rule font-mono text-[0.8rem]">
        {promptTargets.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={target === t.id}
            onClick={() => setTarget(t.id)}
            className={`-mb-px shrink-0 border-r border-rule px-4 py-2.5 transition-colors ${
              target === t.id ? "border-b-2 border-b-cursor bg-bg/60 text-ink" : "text-comment hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 items-center px-4 text-comment sm:flex">
          {promptTargets.find((t) => t.id === target)?.note}
        </span>
      </div>

      <pre className="px-4 py-5 font-mono text-[0.85rem] leading-relaxed break-words whitespace-pre-wrap sm:px-5">
        <span aria-hidden className="text-comment select-none">{"> "}</span>
        <span className="cursor text-str">{prompt}</span>
        {skillPacks
          .filter((p) => skills.includes(p.id))
          .map((p) => (
            <span key={p.id} className="mt-2 block text-comment">
              {`# ${p.id}: ${p.about}`}
            </span>
          ))}
      </pre>

      <div className="flex flex-col gap-3 border-t border-rule px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <fieldset className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.8rem]">
          <legend className="sr-only">Also install skill packs (optional)</legend>
          {skillPacks.map((p) => (
            <label key={p.id} title={p.about} className="flex cursor-pointer items-center gap-1.5 text-comment hover:text-ink">
              <input type="checkbox" checked={skills.includes(p.id)} onChange={() => toggleSkill(p.id)} className="sr-only" />
              <span aria-hidden className={skills.includes(p.id) ? "text-kw" : undefined}>
                {skills.includes(p.id) ? "[x]" : "[ ]"}
              </span>
              <span className={skills.includes(p.id) ? "text-ink" : undefined}>+ {p.id}</span>
            </label>
          ))}
        </fieldset>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="rounded-md bg-cursor px-5 py-2 font-mono text-sm font-semibold text-cursor-ink transition-opacity hover:opacity-90 sm:ml-auto"
        >
          {copied === "copied" ? "Copied" : copied === "failed" ? "Copy blocked by browser" : "Copy prompt"}
        </button>
      </div>

      <p className="flex flex-wrap gap-x-1 border-t border-rule px-4 py-2.5 text-[0.8rem] text-comment sm:px-5">
        Paste from your repo root. Re-run any time to pick up updates.{" "}
        <a href={setupUrl(siteUrl, target)} target="_blank" rel="noreferrer" className="text-kw hover:underline">
          What it fetches
        </a>
        {skills.length > 0 && (
          <>
            {" and "}
            <a href={skillsUrl(siteUrl)} target="_blank" rel="noreferrer" className="text-kw hover:underline">
              skill install steps
            </a>
          </>
        )}
        <span className="ml-auto font-mono">v{version}</span>
      </p>
    </div>
  );
}
