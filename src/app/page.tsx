import type { ReactNode } from "react";
import { AgentPromptCard } from "@/components/agent-prompt-card";
import { CopyButton } from "@/components/copy-button";
import { OpenOnHash } from "@/components/open-on-hash";
import { RulesBuilder } from "@/components/rules-builder";
import { SourceChips } from "@/components/source-chips";
import { loop, principles, shortVersion } from "@/content/principles";
import { prompts } from "@/content/prompts";
import { PLAYBOOK_VERSION, SITE_URL } from "@/content/site";
import { sources } from "@/content/sources";

/** Everything past the prompt is opt-in reading, so it starts collapsed. */
function Section({ id, title, note, children }: { id: string; title: string; note: string; children: ReactNode }) {
  return (
    <details id={id} className="group border-t border-rule">
      <summary className="flex items-baseline gap-3 py-4 hover:text-kw">
        <span aria-hidden className="caret font-mono text-comment">
          ›
        </span>
        <span className="font-mono text-[0.95rem] font-medium">{title}</span>
        <span className="hidden text-sm text-comment sm:inline">{note}</span>
      </summary>
      <div className="pb-10 pl-6">{children}</div>
    </details>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <OpenOnHash />
      <header className="flex items-center gap-4 py-5 font-mono text-sm">
        <span className="font-semibold">agent-playbook</span>
        <a href="#sources" className="ml-auto text-comment hover:text-kw">
          15 sources
        </a>
      </header>

      <main>
        <section className="pt-10 pb-14 sm:pt-16">
          <h1 className="max-w-[20ch] font-mono text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
            Paste one line. Your agent writes its own rules file.
          </h1>
          <p className="mt-4 max-w-[60ch] text-comment">
            It reads your repo and writes a short CLAUDE.md or AGENTS.md using what OpenAI and Anthropic published about
            directing Codex and Claude Code.
          </p>
          <div className="mt-8">
            <AgentPromptCard siteUrl={SITE_URL} version={PLAYBOOK_VERSION} />
          </div>
        </section>

        <section aria-labelledby="rules" className="pb-14">
          <h2 id="rules" className="font-mono text-[0.95rem] font-medium">
            Eight rules, if you read nothing else
          </h2>
          <ul className="mt-4 space-y-2.5">
            {shortVersion.map((p) => (
              <li key={p.text} className="grid grid-cols-[1.25rem_1fr] leading-snug">
                <span aria-hidden className="font-mono text-cursor">
                  -
                </span>
                <span>
                  {p.text}
                  <SourceChips ids={p.sources} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="loop" className="pb-14">
          <h2 id="loop" className="font-mono text-[0.95rem] font-medium">
            The loop for a real feature
          </h2>
          <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[0.8rem]">
            {loop.map((s, i) => (
              <li key={s.step} className="flex items-center gap-2" title={s.detail}>
                <span className="rounded-md border border-rule bg-panel px-2.5 py-1.5">
                  <span className="text-comment">{i + 1}</span> {s.step.toLowerCase()}
                </span>
                {i < loop.length - 1 && (
                  <span aria-hidden className="text-comment">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-comment">Small changes can skip to step 3.</p>
        </section>

        <Section id="principles" title="Principles" note="Ten topics, four points each">
          <div className="space-y-8">
            {principles.map((p) => (
              <article key={p.id} id={p.id} className="max-w-[70ch]">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-0.5 text-sm text-comment">{p.lede}</p>
                <ul className="mt-3 space-y-2 text-[0.95rem]">
                  {p.points.map((pt) => (
                    <li key={pt.text} className="grid grid-cols-[1.25rem_1fr]">
                      <span aria-hidden className={`font-mono ${pt.key ? "text-cursor" : "text-comment"}`}>
                        -
                      </span>
                      <span>
                        <span className={pt.key ? "font-medium" : undefined}>{pt.text}</span>
                        <SourceChips ids={pt.sources} />
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="prompts" title="Prompts" note="Quoted from the guides, ready to copy">
          <div className="space-y-6">
            {prompts.map((p) => (
              <figure key={p.title}>
                <figcaption className="flex items-center justify-between gap-3 text-sm">
                  <span>
                    {p.title}
                    <SourceChips ids={[p.source]} />
                  </span>
                  <CopyButton text={p.text} className="shrink-0" />
                </figcaption>
                <pre className="mt-2 overflow-x-auto rounded-md border border-rule bg-panel p-3.5 font-mono text-[0.8rem] leading-relaxed whitespace-pre-wrap text-str">
                  {p.text}
                </pre>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="build" title="Build the file by hand" note="Fill in a form instead of running the prompt">
          <RulesBuilder />
        </Section>

        <Section id="sources" title="Sources" note="The numbers in brackets point here">
          <ol className="grid gap-x-8 gap-y-3 text-sm md:grid-cols-2">
            {sources.map((s) => (
              <li key={s.id} id={`source-${s.id}`} className="grid scroll-mt-6 grid-cols-[2.25rem_1fr] target:text-kw">
                <span className="font-mono text-comment">[{s.id}]</span>
                <span>
                  <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-kw hover:underline">
                    {s.title}
                  </a>
                  <span className="block text-comment">{s.tool}</span>
                </span>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      <footer className="border-t border-rule py-8 text-sm text-comment">
        A summary, not a replacement. When a point matters to you, read the source.
      </footer>
    </div>
  );
}
