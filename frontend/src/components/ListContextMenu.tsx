import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { listCardContext } from "../types/context";

type ListContextMenuProps = {
  x: number;
  y: number;
  isSpecial: boolean;
};

export default function ListContextMenu({ x, y, isSpecial }: ListContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { setMenuView, setMenuOption } = useContext(listCardContext);

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

  const clampedX = Math.min(x, window.innerWidth - 240);
  const clampedY = Math.min(y, window.innerHeight - 150);

  return createPortal(
    <div
      ref={menuRef}
      className="panel fixed z-[60] w-[220px] animate-pop overflow-hidden p-1.5"
      style={{ top: clampedY, left: clampedX }}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-lead-200 transition-colors hover:bg-lead-700/70 hover:text-white"
        onClick={() => setMenuOption("editAnime")}
      >
        <FiEdit2 size={16} />
        Editar anime
      </button>
      {!isSpecial && (
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
          onClick={() => setMenuOption("remove")}
        >
          <FiTrash2 size={16} />
          Remover da lista
        </button>
      )}
    </div>,
    document.body,
  );
}
