import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronRight, FiEdit2, FiPlus } from "react-icons/fi";
import { accountContext, animeCardContext } from "../types/context";
import { useList } from "../hooks/useList";

type AnimeContextMenuProps = {
  x: number;
  y: number;
};

export default function AnimeContextMenu({ x, y }: AnimeContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { setMenuView, setMenuOption } = useContext(animeCardContext);
  const { accountId } = useContext(accountContext);
  const { lists, fetchLists } = useList(accountId);
  const [showLists, setShowLists] = useState(false);

  const availableLists = useMemo(
    () => lists.filter((list) => list.name.toLowerCase() !== "favoritos"),
    [lists],
  );

  useEffect(() => {
    void fetchLists();
  }, [fetchLists]);

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

  const clampedX = Math.min(x, window.innerWidth - 260);
  const clampedY = Math.min(y, window.innerHeight - 220);

  return createPortal(
    <div
      ref={menuRef}
      className="panel fixed z-[60] w-[240px] animate-pop overflow-hidden p-1.5"
      style={{ top: clampedY, left: clampedX }}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-lead-200 transition-colors hover:bg-lead-700/70 hover:text-white"
        onClick={() => setMenuOption("edit")}
      >
        <FiEdit2 size={16} />
        Editar anime
      </button>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-lead-200 transition-colors hover:bg-lead-700/70 hover:text-white"
        onClick={() => setShowLists((current) => !current)}
      >
        <span className="flex items-center gap-2.5">
          <FiPlus size={16} />
          Adicionar à lista
        </span>
        <FiChevronRight
          size={15}
          className={`transition-transform ${showLists ? "rotate-90" : ""}`}
        />
      </button>

      {showLists && (
        <div className="mt-1 max-h-40 overflow-y-auto border-t border-lead-700/70 pt-1">
          {availableLists.length > 0 ? (
            availableLists.map((list) => (
              <button
                key={list.id}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs text-lead-300 transition-colors hover:bg-crimson-600/15 hover:text-crimson-200"
                onClick={() => setMenuOption("addToList", list.id)}
              >
                <span className="truncate">{list.name}</span>
                <span className="shrink-0 text-[10px] text-lead-500">
                  {list.animes?.length ?? 0}
                </span>
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-xs text-lead-500">
              Crie uma lista para adicionar animes.
            </p>
          )}
        </div>
      )}
    </div>,
    document.body,
  );
}
