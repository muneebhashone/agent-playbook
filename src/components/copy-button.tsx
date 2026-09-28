"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`rounded-[3px] border border-rule bg-sheet px-2.5 py-1 text-sm font-medium text-ink transition-colors hover:border-line hover:text-line ${className}`}
      aria-live="polite"
    >
      {state === "copied" ? "Copied" : state === "failed" ? "Copy blocked by browser" : label}
    </button>
  );
}
