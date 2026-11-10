import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronRight, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { listCardContext } from "../types/context";
import { useAnimes } from "../hooks/useAnimes";
import type { AnimeListResponse } from "../types/api/Response";

type ListTitleContextMenuProps = {
  x: number;
  y: number;
  list: AnimeListResponse;
};

export default function ListTitleContextMenu({ x, y, list }: ListTitleContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAnimesTab, setShowAnimesTab] = useState(false);
  const { setMenuView, setMenuOption } = useContext(listCardContext);
  const { animes, fetchAnimes } = useAnimes();

  useEffect(() => {
    if (showAnimesTab) void fetchAnimes();
  }, [showAnimesTab, fetchAnimes]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuView(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuView(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setMenuView]);

  const newAnimes = useMemo(() => {
    if (!animes) return [];
    const listIds = new Set((list.animes ?? []).map((anime) => anime.id));
    return animes.filter((anime) => !listIds.has(anime.id));
  }, [animes, list.animes]);

  const clampedX = Math.min(x, window.innerWidth - 280);
  const clampedY = Math.min(y, window.innerHeight - 260);

  return createPortal(
    <div
      ref={menuRef}
      className="panel fixed z-[60] w-[260px] animate-pop overflow-hidden p-1.5"
      style={{ top: clampedY, left: clampedX }}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-lead-200 transition-colors hover:bg-lead-700/70 hover:text-white"
        onClick={() => setMenuOption("editList")}
      >
        <FiEdit2 size={16} />
        Renomear lista
      </button>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-lead-200 transition-colors hover:bg-lead-700/70 hover:text-white"
        onClick={() => setShowAnimesTab((current) => !current)}
      >
        <span className="flex items-center gap-2.5">
          <FiPlus size={16} />
          Adicionar anime
        </span>
        <FiChevronRight
          size={15}
          className={`transition-transform ${showAnimesTab ? "rotate-90" : ""}`}
        />
      </button>

      {showAnimesTab && (
        <div className="mt-1 max-h-44 overflow-y-auto border-t border-lead-700/70 pt-1">
          {newAnimes.length > 0 ? (
            newAnimes.map((anime) => (
              <button
                key={anime.id}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs text-lead-300 transition-colors hover:bg-crimson-600/15 hover:text-crimson-200"
                onClick={() => setMenuOption("add", anime.id)}
              >
                <span className="truncate">{anime.title}</span>
                <span className="shrink-0 text-[10px] text-lead-500">T{anime.season}</span>
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-xs text-lead-500">
              Todos os animes já estão nesta lista.
            </p>
          )}
        </div>
      )}

      <div className="my-1 h-px bg-lead-700/70" />
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
        onClick={() => setMenuOption("delete")}
      >
        <FiTrash2 size={16} />
        Excluir lista
      </button>
    </div>,
    document.body,
  );
}
