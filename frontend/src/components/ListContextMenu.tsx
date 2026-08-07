import { useContext, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { listCardContext } from "../types/context";
import { FaTrashAlt } from "react-icons/fa";

type props = {
    x: number,
    y: number,
    isSpecial: boolean
}

export default function ListContextMenu(data: props) {

    const menuRef = useRef<HTMLDivElement>(null);

    const [x] = useState<number>(data.x);
    const [y] = useState<number>(data.y);

    const { view, setMenuView, setMenuOption } = useContext(listCardContext);

    useEffect(() => {
        if (!view) return;

        const handleClickOutside = (e: MouseEvent) => {
            // Se o clique foi fora do container pai, fecha o dropdown
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuView(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [view]);

    return (
        <div className={`absolute w-fit h-fit flex items-center justify-center
        bg-lead-600 border-2 border-lead-200 rounded-[12px] py-5 z-20`}
            style={{ top: `${y}px`, left: `${x}px` }}
            ref={menuRef}>
            <div className=" flex flex-col items-center justify-center w-[280px] h-fit max-h-[150px]">
                <div className="animeMenuRow"
                onClick={() => setMenuOption('editAnime')}
                >
                    <MdEdit size={22} />

                    <p className="font-bold text-[18px]">
                        Editar
                    </p>
                </div>
                {!data.isSpecial && (
                    <div className="animeMenuRow" onClick={() => setMenuOption('remove')}>
                        <FaTrashAlt size={22} />

                        <p className="font-bold text-[18px]">
                            Remover da Lista
                        </p>
                    </div>
                )}
                
            </div>

        </div>
    );
}