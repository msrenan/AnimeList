import { useContext, useMemo, useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiMoreVertical,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import type { AnimeResponse } from "../types/api/Response";
import {
  animeCardContext,
  animeContext,
  type AnimeCardContext,
} from "../types/context";
import {
  formatReleaseDay,
  getAnimeStatus,
  getTrackingStatus,
  gradientFor,
  initials,
  toneClass,
} from "../utils/anime";
import AnimeContextMenu from "./AnimeContextMenu";

type AnimeCardProps = {
  animeData: AnimeResponse;
  Ikey: string;
};

export default function AnimeCard({ animeData, Ikey }: AnimeCardProps) {
  const { setDirty, setEditForm, setShowDeleteModal, setAddAnimeToList } =
    useContext(animeContext);
  const [showMenu, setShowMenu] = useState(false);
  const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });
  const [savingFavorite, setSavingFavorite] = useState(false);

  const status = getAnimeStatus(animeData);
  const tracking = getTrackingStatus(animeData);

  const animeCardContextValue = useMemo<AnimeCardContext>(
    () => ({
      setMenuView: setShowMenu,
      view: showMenu,
      setMenuOption: (option, listId) => {
        if (option === "edit") {
          setEditForm(true, animeData);
          setShowMenu(false);
          return;
        }

        if (option === "addToList" && listId) {
          setAddAnimeToList(animeData.id, listId);
          setShowMenu(false);
        }
      },
    }),
    [showMenu, animeData, setEditForm, setAddAnimeToList],
  );

  const toggleFavorite = async () => {
    setSavingFavorite(true);
    await setDirty(animeData.id, { favorite: !animeData.favorite });
    setSavingFavorite(false);
  };

  const openMenuAt = (x: number, y: number) => {
    setMenuCoord({
      x: Math.min(x, window.innerWidth - 260),
      y: Math.min(y, window.innerHeight - 210),
    });
    setShowMenu(true);
  };

  return (
    <animeCardContext.Provider value={animeCardContextValue}>
      <article
        key={Ikey}
        onContextMenu={(event) => {
          event.preventDefault();
          openMenuAt(event.clientX, event.clientY);
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-lead-700/80 bg-lead-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500/40 hover:bg-lead-900 hover:shadow-[0_24px_60px_-28px_rgba(225,29,72,0.45)] animate-fade-up"
      >
        <div
          className="absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: gradientFor(animeData.title) }}
        />

        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneClass(
                status.tone,
              )}`}
            >
              {status.label}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneClass(
                tracking.tone,
              )}`}
            >
              {tracking.label}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => void toggleFavorite()}
              disabled={savingFavorite}
              className={`btn-icon h-8 w-8 ${
                animeData.favorite
                  ? "text-amber-300 hover:text-amber-200"
                  : "text-lead-400 hover:text-amber-300"
              }`}
              aria-label={animeData.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              title={animeData.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <FiStar size={16} fill={animeData.favorite ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              onClick={() => setEditForm(true, animeData)}
              className="btn-icon h-8 w-8"
              aria-label="Editar anime"
              title="Editar anime"
            >
              <FiEdit2 size={15} />
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true, animeData)}
              className="btn-icon h-8 w-8 hover:bg-red-500/10 hover:text-red-300"
              aria-label="Excluir anime"
              title="Excluir anime"
            >
              <FiTrash2 size={15} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                openMenuAt(rect.right - 240, rect.bottom + 8);
              }}
              className="btn-icon h-8 w-8"
              aria-label="Mais opções"
              title="Mais opções"
            >
              <FiMoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3.5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white shadow-lg"
            style={{ background: gradientFor(animeData.title) }}
          >
            {initials(animeData.title)}
          </div>
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-display text-[17px] leading-snug font-semibold text-white">
              {animeData.title}
            </h3>
            <p className="mt-1 text-xs text-lead-400">
              {animeData.releaseDay
                ? `Novos episódios na ${formatReleaseDay(animeData.releaseDay).toLowerCase()}`
                : "Dia de lançamento não definido"}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5">
            <dt className="text-[10px] font-semibold tracking-wide text-lead-500 uppercase">
              Temporada
            </dt>
            <dd className="mt-0.5 text-sm font-semibold text-lead-100">{animeData.season}</dd>
          </div>
          <div className="rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5">
            <dt className="text-[10px] font-semibold tracking-wide text-lead-500 uppercase">
              Episódio
            </dt>
            <dd className="mt-0.5 text-sm font-semibold text-lead-100">{animeData.episode}</dd>
          </div>
          <div className="rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5">
            <dt className="text-[10px] font-semibold tracking-wide text-lead-500 uppercase">
              Atualiza
            </dt>
            <dd className="mt-0.5 truncate text-sm font-semibold text-lead-100">
              {formatReleaseDay(animeData.releaseDay)}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="flex items-center gap-1.5 text-[11px] text-lead-500">
            <FiCalendar size={13} />
            {animeData.favorite ? "Favorito" : "Na coleção"}
          </span>
          <button
            type="button"
            onClick={() => setEditForm(true, animeData)}
            className="cursor-pointer text-xs font-semibold text-crimson-300 transition-colors hover:text-crimson-200"
          >
            Editar detalhes
          </button>
        </div>
      </article>

      {showMenu && <AnimeContextMenu x={menuCoord.x} y={menuCoord.y} />}
    </animeCardContext.Provider>
  );
}
