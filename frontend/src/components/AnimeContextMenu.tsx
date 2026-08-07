import { useContext, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { accountContext, animeCardContext } from "../types/context";
import { FaPlus } from "react-icons/fa";
import { useList } from "../hooks/useList";

type props = {
    x: number,
    y: number
}

export default function AnimeContextMenu(data: props) {

    const menuRef = useRef<HTMLDivElement>(null);

    const [x] = useState<number>(data.x);
    const [y] = useState<number>(data.y);
    const [showListsTab, setShowListsTab] = useState<boolean>(false);

    const { setMenuView, view, setMenuOption } = useContext(animeCardContext);

    const { accountId } = useContext(accountContext);

    const { lists, fetchLists } = useList(accountId);

    useEffect(() => {
        fetchLists();
    }, [])

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
            <div className=" flex flex-col items-center justify-center w-[280px] h-fit max-h-[250px]">
                <div className="animeMenuRow" onClick={() => setMenuOption('edit')}>

                    <MdEdit size={22} />

                    <p className="font-bold text-[18px]">
                        Editar
                    </p>
                </div>
                <div className="animeMenuRow" onClick={() => setMenuOption('addToList')}>
                    <FaPlus size={22} />

                    <p className="font-bold text-[18px]"
                        onClick={() => setShowListsTab(!showListsTab)}>
                        Adicionar à uma lista
                    </p>
                </div>
                {
                    showListsTab && (
                        <>
                            <hr className="min-w-[80%] border-lead-200 my-3" />
                            <div className="flex flex-col w-[200px] h-full ml-5 overflow-auto">
                                {lists.filter((l) => l.name.toLowerCase() != "favoritos").map((list) => (
                                    <div className="flex flex-col w-full h-full justify-center hover:bg-lead-500
                                    text-lead-200 hover:text-crimson-300 transition-all hover:cursor-pointer"
                                        onClick={() => setMenuOption("addToList", list.id)}>
                                        <p className="text-[18px]">{list.name}</p>
                                    </div>
                                ))}
                            </div>
                        </>

                    )
                }
            </div>

        </div>
    );
}