import { sources } from "@/content/sources";

export function SourceChips({ ids }: { ids: number[] }) {
  return (
    <span className="ml-1 font-mono text-[0.7rem] whitespace-nowrap text-comment">
      [
      {ids.map((id, i) => {
        const s = sources.find((x) => x.id === id);
        return (
          <a
            key={id}
            href={`#source-${id}`}
            title={s ? `${s.title} (${s.tool})` : undefined}
            aria-label={s ? `Source ${id}: ${s.title}` : `Source ${id}`}
            className="hover:text-kw"
          >
            {id}
            {i < ids.length - 1 && ","}
          </a>
        );
      })}
      ]
    </span>
  );
}
