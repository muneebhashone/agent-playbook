import { AgentPromptCard } from "@/components/agent-prompt-card";
import { CopyButton } from "@/components/copy-button";
import { RulesBuilder } from "@/components/rules-builder";
import { SourceChips } from "@/components/source-chips";
import { loop, principles, shortVersion } from "@/content/principles";
import { prompts } from "@/content/prompts";
import { PLAYBOOK_VERSION, SITE_URL } from "@/content/site";
import { sources } from "@/content/sources";

const nav = [
  { href: "#principles", label: "Principles" },
  { href: "#loop", label: "The loop" },
  { href: "#rules", label: "Build by hand" },
  { href: "#prompts", label: "Prompts" },
  { href: "#sources", label: "Sources" },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-rule bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            Agent Playbook
          </a>
          <nav className="hidden gap-5 text-sm md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-muted hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#top"
            className="ml-auto rounded-[3px] bg-ink px-3 py-1.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            Get the setup prompt
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section className="grid items-start gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <div className="lg:pt-4">
            <h1 className="font-display text-[2.5rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-[4rem]">
              Fifteen guides on directing coding agents, on one page.
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg text-muted">
              What OpenAI and Anthropic published about working with Codex (GPT-6 Astra, Sol, Luna) and Claude Code (Opus 5.5,
              Fable 5.1), with the repetition taken out. The fastest way to use it: copy the prompt, paste it into your agent, and
              it writes a CLAUDE.md or AGENTS.md for the project you’re in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#principles"
                className="rounded-[3px] border border-ink px-4 py-2.5 font-medium transition-colors hover:bg-ink hover:text-paper"
              >
                Read the principles
              </a>
              <a
                href="#rules"
                className="rounded-[3px] px-4 py-2.5 font-medium text-line underline decoration-rule underline-offset-4 hover:decoration-line"
              >
                Or build the file by hand
              </a>
            </div>
          </div>

          <AgentPromptCard siteUrl={SITE_URL} version={PLAYBOOK_VERSION} />
        </section>

        <section aria-labelledby="short" className="border-t-2 border-ink py-10">
          <h2 id="short" className="font-display text-xl font-semibold">
            If you read nothing else
          </h2>
          <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {shortVersion.map((p) => (
              <li key={p.text} className="leading-snug">
                <span className="mark">{p.text}</span>
                <SourceChips ids={p.sources} />
              </li>
            ))}
          </ul>
        </section>

        {/* Principles */}
        <section id="principles" className="border-t-2 border-ink py-14">
          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <nav aria-label="Principles" className="hidden lg:block">
              <div className="sticky top-20">
                <h2 className="font-display text-2xl font-bold tracking-tight">Principles</h2>
                <p className="mt-2 text-sm text-muted">
                  Grouped by topic. <span className="mark">Highlighted</span> points matter most.
                </p>
                <ul className="mt-5 space-y-1.5 text-[0.95rem]">
                  {principles.map((p) => (
                    <li key={p.id}>
                      <a href={`#${p.id}`} className="text-muted hover:text-ink">
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex flex-col gap-1.5 text-xs text-muted">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-[2px] border border-line/40" /> Codex source
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-[2px] bg-line/15" /> Claude Code source
                  </span>
                </p>
              </div>
            </nav>

            <div className="space-y-14">
              <h2 className="font-display text-3xl font-bold tracking-tight lg:hidden">Principles</h2>
              {principles.map((p) => (
                <article key={p.id} id={p.id} className="max-w-[72ch]">
                  <h3 className="font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.015em]">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.lede}</p>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt.text} className="relative pl-5">
                        <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-line" />
                        <span className={pt.key ? "mark" : undefined}>{pt.text}</span>
                        <SourceChips ids={pt.sources} />
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Loop */}
        <section id="loop" className="border-t-2 border-ink py-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">The loop for a real feature</h2>
          <p className="mt-2 max-w-[65ch] text-muted">
            Stitched together from the Claude Code and Codex guides. Small changes can skip straight to step 3.
          </p>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {loop.map((s, i) => (
              <li key={s.step} className="bg-sheet p-5">
                <span className="font-display text-4xl font-bold text-line/70">{i + 1}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{s.step}</h3>
                <p className="mt-1 text-[0.95rem]">
                  {s.detail}
                  <SourceChips ids={s.sources} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Rules builder */}
        <section id="rules" className="border-t-2 border-ink py-14">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Build your rules file</h2>
          <p className="mt-3 mb-10 max-w-[65ch] text-lg text-muted">
            The guides agree: a short file with your project’s commands and gotchas beats a long list of generic rules. Fill in what
            you know, pick the rule sets you want, then copy or download.
          </p>
          <RulesBuilder />
        </section>

        {/* Prompts */}
        <section id="prompts" className="py-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">Prompts worth stealing</h2>
          <p className="mt-2 max-w-[65ch] text-muted">Quoted exactly from the guides. Swap in your own task and keep the structure.</p>
          <div className="mt-8 columns-1 gap-6 md:columns-2">
            {prompts.map((p) => (
              <figure key={p.title} className="mb-6 break-inside-avoid border-t border-ink pt-3">
                <figcaption className="flex items-start justify-between gap-3">
                  <span className="font-display font-semibold">
                    {p.title}
                    <SourceChips ids={[p.source]} />
                  </span>
                  <CopyButton text={p.text} className="shrink-0" />
                </figcaption>
                <pre className="mt-3 overflow-x-auto rounded-[3px] bg-sheet p-3.5 font-code text-[0.8rem] leading-relaxed whitespace-pre-wrap">
                  {p.text}
                </pre>
              </figure>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section id="sources" className="border-t-2 border-ink py-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">Sources</h2>
          <p className="mt-2 text-muted">The numbers match the chips throughout the page.</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {(["Codex", "Claude Code"] as const).map((tool) => (
              <div key={tool}>
                <h3 className="font-display text-xl font-semibold">{tool}</h3>
                <ol className="mt-4 space-y-4">
                  {sources
                    .filter((s) => s.tool === tool)
                    .map((s) => (
                      <li key={s.id} id={`source-${s.id}`} className="grid scroll-mt-24 grid-cols-[2rem_1fr] target:bg-mark/25">
                        <span className="font-display font-bold text-line">{s.id}</span>
                        <span>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline decoration-rule underline-offset-3 hover:decoration-line"
                          >
                            {s.title}
                          </a>
                          <span className="block text-sm text-muted">{s.about}</span>
                        </span>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-rule py-8 text-center text-sm text-muted">
        A summary, not a replacement. When a point matters to you, read the source.
      </footer>
    </>
  );
}
