"use client";

import { useState } from "react";
import { buildShortPrompt, promptTargets, setupUrl, type PromptTarget } from "@/content/agent-prompt";
import { CopyButton } from "./copy-button";

export function AgentPromptCard({ siteUrl, version }: { siteUrl: string; version: string }) {
  const [target, setTarget] = useState<PromptTarget>("claude");
  const prompt = buildShortPrompt(siteUrl, target);
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
          (version {version}).
        </p>
      </div>
    </div>
  );
}
