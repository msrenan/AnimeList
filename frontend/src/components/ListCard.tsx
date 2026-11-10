import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaListUl } from "react-icons/fa6";
import { FiChevronDown, FiEdit2, FiMoreVertical, FiStar } from "react-icons/fi";
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response";
import { listCardContext, listsContext, type ListCardContext } from "../types/context";
import AnimeInfoCard from "./AnimeInfoCard";
import ListContextMenu from "./ListContextMenu";
import ListTitleContextMenu from "./ListTitleContextMenu";
import {
  formatReleaseDay,
  getTrackingStatus,
  gradientFor,
  pluralize,
  toneClass,
} from "../utils/anime";

type ListCardProps = {
  listData: AnimeListResponse;
  alwaysActive: boolean;
};

export default function ListCard({ listData, alwaysActive }: ListCardProps) {
  const [expanded, setExpanded] = useState(alwaysActive);
  const [editMode, setEditMode] = useState(false);
  const [draftName, setDraftName] = useState(listData.name);
  const [showAnimeMenu, setShowAnimeMenu] = useState(false);
  const [showTitleMenu, setShowTitleMenu] = useState(false);
  const [contextCoords, setContextCoords] = useState({ x: 0, y: 0 });
  const [selectedAnime, setSelectedAnime] = useState<AnimeResponse>();
  const [infoCard, setInfoCard] = useState<{ anime: AnimeResponse; x: number; y: number }>();
  const infoRef = useRef<HTMLDivElement>(null);
  const savingNameRef = useRef(false);
  const cancelNameRef = useRef(false);

  const {
    setRemoveAnimeFromList,
    setEditForm,
    setAddAnimeToList,
    setDeleteList,
    setEditedListData,
  } = useContext(listsContext);

  const animes = listData.animes ?? [];
  const isSpecial =
    listData.name.toLowerCase() === "favoritos" ||
    listData.id === "watching" ||
    listData.id === "start";

  useEffect(() => {
    if (!infoCard) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setInfoCard(undefined);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setInfoCard(undefined);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [infoCard]);

  const listCardContextValue = useMemo<ListCardContext>(
    () => ({
      setMenuView: (view) => {
        setShowAnimeMenu(view);
        setShowTitleMenu(view);
      },
      view: showAnimeMenu || showTitleMenu,
      setMenuOption: (option, animeId) => {
        if (option === "editAnime" && selectedAnime) {
          setEditForm(true, selectedAnime);
        } else if (option === "remove" && selectedAnime) {
          setRemoveAnimeFromList(listData.id, selectedAnime.id);
        } else if (option === "editList") {
          cancelNameRef.current = false;
          savingNameRef.current = false;
          setDraftName(listData.name);
          setEditMode(true);
        } else if (option === "delete") {
          setDeleteList(true, listData);
        } else if (option === "add" && animeId) {
          setAddAnimeToList(animeId, listData.id);
        }

        setShowAnimeMenu(false);
        setShowTitleMenu(false);
      },
    }),
    [
      showAnimeMenu,
      showTitleMenu,
      selectedAnime,
      listData,
      setEditForm,
      setRemoveAnimeFromList,
      setDeleteList,
      setAddAnimeToList,
    ],
  );

  const openTitleMenu = (x: number, y: number) => {
    setContextCoords({
      x: Math.min(x, window.innerWidth - 280),
      y: Math.min(y, window.innerHeight - 260),
    });
    setShowTitleMenu(true);
    setShowAnimeMenu(false);
  };

  const openAnimeMenu = (anime: AnimeResponse, x: number, y: number) => {
    setSelectedAnime(anime);
    setContextCoords({
      x: Math.min(x, window.innerWidth - 240),
      y: Math.min(y, window.innerHeight - 150),
    });
    setShowAnimeMenu(true);
    setShowTitleMenu(false);
  };

  const saveListName = () => {
    if (savingNameRef.current) return;

    if (cancelNameRef.current) {
      cancelNameRef.current = false;
      setDraftName(listData.name);
      return;
    }

    const trimmed = draftName.trim();
    setEditMode(false);

    if (!trimmed || trimmed === listData.name) {
      setDraftName(listData.name);
      return;
    }

    savingNameRef.current = true;
    setEditedListData(listData.id, { name: trimmed });
  };

  const openInfoCard = (anime: AnimeResponse, x: number, y: number) => {
    setInfoCard({
      anime,
      x: Math.min(x + 12, window.innerWidth - 370),
      y: Math.min(y + 12, window.innerHeight - 420),
    });
  };

  return (
    <listCardContext.Provider value={listCardContextValue}>
      <div className="panel flex flex-col overflow-hidden">
        <div
          className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5"
          onContextMenu={(event) => {
            if (isSpecial) return;
            event.preventDefault();
            openTitleMenu(event.clientX, event.clientY);
          }}
        >
          <div
            role={alwaysActive ? undefined : "button"}
            tabIndex={alwaysActive ? undefined : 0}
            className={`flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-crimson-500/40 ${
              alwaysActive ? "cursor-default" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!alwaysActive) setExpanded((current) => !current);
            }}
            onKeyDown={(event) => {
              if (!alwaysActive && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                setExpanded((current) => !current);
              }
            }}
            aria-expanded={expanded}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
              style={{ background: gradientFor(listData.name) }}
            >
              <FaListUl size={16} />
            </span>
            <span className="min-w-0 flex-1">
              {editMode ? (
                <input
                  autoFocus
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveListName();
                    if (event.key === "Escape") {
                      cancelNameRef.current = true;
                      setDraftName(listData.name);
                      setEditMode(false);
                    }
                  }}
                  onBlur={saveListName}
                  maxLength={60}
                  className="w-full rounded-lg border border-crimson-500/60 bg-lead-950 px-2 py-1 font-display text-base font-semibold text-white outline-none"
                />
              ) : (
                <span className="block truncate font-display text-base font-semibold text-white">
                  {listData.name}
                </span>
              )}
              <span className="mt-0.5 block text-xs text-lead-400">
                {pluralize(animes.length, "anime", "animes")}
              </span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {!alwaysActive && (
              <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                className="btn-icon h-8 w-8"
                aria-label={expanded ? "Recolher lista" : "Expandir lista"}
              >
                <FiChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            )}
            {!isSpecial && (
              <button
                type="button"
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  openTitleMenu(rect.right - 260, rect.bottom + 6);
                }}
                className="btn-icon h-8 w-8"
                aria-label="Opções da lista"
                title="Opções da lista"
              >
                <FiMoreVertical size={17} />
              </button>
            )}
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 ease-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="soft-divider" />
            <ul className="max-h-[430px] space-y-1 overflow-y-auto p-2">
              {animes.length > 0 ? (
                animes.map((anime, index) => {
                  const tracking = getTrackingStatus(anime);

                  return (
                    <li
                      key={`${anime.id}-${listData.id}`}
                      className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-lead-800/70"
                      onClick={(event) =>
                        openInfoCard(anime, event.clientX, event.clientY)
                      }
                      onContextMenu={(event) => {
                        event.preventDefault();
                        openAnimeMenu(anime, event.clientX, event.clientY);
                      }}
                    >
                      <span className="w-5 shrink-0 text-center text-xs font-semibold text-lead-500">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 truncate text-sm font-medium text-lead-100">
                          {anime.favorite && (
                            <FiStar
                              size={12}
                              className="shrink-0 text-amber-300"
                              fill="currentColor"
                            />
                          )}
                          <span className="truncate">{anime.title}</span>
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-lead-400">
                          <span>T{anime.season}</span>
                          <span className="text-lead-600">•</span>
                          <span>EP {anime.episode}</span>
                          <span className="text-lead-600">•</span>
                          <span>{formatReleaseDay(anime.releaseDay)}</span>
                        </p>
                      </div>

                      <span
                        className={`hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:inline-flex ${toneClass(
                          tracking.tone,
                        )}`}
                      >
                        {tracking.label}
                      </span>

                      <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setEditForm(true, anime);
                          }}
                          className="btn-icon h-7 w-7"
                          aria-label="Editar anime"
                          title="Editar anime"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        {!isSpecial && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              const rect = event.currentTarget.getBoundingClientRect();
                              openAnimeMenu(anime, rect.right - 220, rect.bottom + 6);
                            }}
                            className="btn-icon h-7 w-7"
                            aria-label="Opções do anime"
                            title="Opções do anime"
                          >
                            <FiMoreVertical size={15} />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="flex flex-col items-center justify-center gap-1 px-4 py-10 text-center">
                  <p className="text-sm font-semibold text-lead-300">Lista vazia</p>
                  <p className="text-xs text-lead-500">
                    {isSpecial
                      ? "Os animes aparecem aqui automaticamente."
                      : "Use o menu da lista para adicionar animes."}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {showAnimeMenu && selectedAnime && (
        <ListContextMenu x={contextCoords.x} y={contextCoords.y} isSpecial={isSpecial} />
      )}

      {showTitleMenu && !isSpecial && (
        <ListTitleContextMenu x={contextCoords.x} y={contextCoords.y} list={listData} />
      )}

      {infoCard &&
        createPortal(
          <div
            ref={infoRef}
            className="fixed z-[70]"
            style={{ top: infoCard.y, left: infoCard.x }}
          >
            <AnimeInfoCard
              animeData={infoCard.anime}
              onClose={() => setInfoCard(undefined)}
            />
          </div>,
          document.body,
        )}
    </listCardContext.Provider>
  );
}
