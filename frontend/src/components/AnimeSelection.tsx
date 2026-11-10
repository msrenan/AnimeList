import { useEffect, useMemo, useState } from "react";
import { FiCheck, FiSearch } from "react-icons/fi";
import { useAnimes } from "../hooks/useAnimes";
import { gradientFor, initials } from "../utils/anime";

type AnimeSelectionProps = {
  sendData: (ids: string[]) => void;
};

export default function AnimeSelection({ sendData }: AnimeSelectionProps) {
  const { animes, fetchAnimes, isLoading } = useAnimes();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    void fetchAnimes();
  }, [fetchAnimes]);

  const filtered = useMemo(() => {
    if (!animes) return [];
    const normalized = query.trim().toLowerCase();
    if (!normalized) return animes;
    return animes.filter((anime) => anime.title.toLowerCase().includes(normalized));
  }, [animes, query]);

  const toggle = (id: string) => {
    setSelectedIds((current) => {
      const next = current.includes(id)
        ? current.filter((animeId) => animeId !== id)
        : [...current, id];
      sendData(next);
      return next;
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-lead-100">
          Animes iniciais
          <span className="ml-2 rounded-full bg-crimson-600/15 px-2 py-0.5 text-[11px] text-crimson-300">
            {selectedIds.length} selecionado{selectedIds.length === 1 ? "" : "s"}
          </span>
        </p>
      </div>

      <div className="relative">
        <FiSearch
          size={16}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-lead-400"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filtrar animes..."
          className="input h-10 py-0 pl-10 text-sm"
        />
      </div>

      <div className="min-h-[180px] flex-1 space-y-1 overflow-y-auto rounded-xl border border-lead-700/70 bg-lead-950/40 p-1.5">
        {isLoading && !animes ? (
          <div className="space-y-2 p-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="skeleton h-11" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((anime) => {
            const selected = selectedIds.includes(anime.id);

            return (
              <button
                key={anime.id}
                type="button"
                onClick={() => toggle(anime.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                  selected ? "bg-crimson-600/15" : "hover:bg-lead-800/70"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    selected
                      ? "border-crimson-500 bg-crimson-600 text-white"
                      : "border-lead-500 text-transparent"
                  }`}
                >
                  <FiCheck size={13} />
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{ background: gradientFor(anime.title) }}
                >
                  {initials(anime.title)}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm ${
                      selected ? "font-semibold text-crimson-100" : "text-lead-200"
                    }`}
                  >
                    {anime.title}
                  </span>
                  <span className="block text-[11px] text-lead-500">
                    Temporada {anime.season} · Episódio {anime.episode}
                  </span>
                </span>
              </button>
            );
          })
        ) : (
          <p className="px-3 py-8 text-center text-xs text-lead-500">
            Nenhum anime encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
