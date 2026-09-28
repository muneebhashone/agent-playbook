import { sources } from "@/content/sources";

export function SourceChips({ ids }: { ids: number[] }) {
  return (
    <span className="ml-1.5 inline-flex translate-y-[-1px] gap-1 align-middle">
      {ids.map((id) => {
        const s = sources.find((x) => x.id === id);
        return (
          <a
            key={id}
            href={`#source-${id}`}
            title={s ? `${s.title} (${s.tool})` : undefined}
            aria-label={s ? `Source ${id}: ${s.title}` : `Source ${id}`}
            className={`inline-grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-[3px] px-1 text-[0.7rem] font-semibold leading-none no-underline transition-colors ${
              s?.tool === "Codex"
                ? "border border-line/40 text-line hover:bg-line hover:text-paper"
                : "bg-line/15 text-line hover:bg-line hover:text-paper"
            }`}
          >
            {id}
          </a>
        );
      })}
    </span>
  );
}
