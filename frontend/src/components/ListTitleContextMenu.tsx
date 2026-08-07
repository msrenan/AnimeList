import { useContext, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { listCardContext } from "../types/context";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useAnimes } from "../hooks/useAnimes";
import type { AnimeResponse, AnimeListResponse } from "../types/api/Response";

type props = {
    x: number,
    y: number,
    list: AnimeListResponse
}

export default function ListTitleContextMenu(data: props) {

    const menuRef = useRef<HTMLDivElement>(null);

    const [showAnimesTab, setShowAnimesTab] = useState<boolean>(false);
    const [newAnimes, setNewAnimes] = useState<AnimeResponse[]>([]);

    const [x] = useState<number>(data.x);
    const [y] = useState<number>(data.y);

    const { view, setMenuView, setMenuOption } = useContext(listCardContext);

    const { animes, fetchAnimes } = useAnimes();

    useEffect(() => {
        if (showAnimesTab) fetchAnimes();
    }, [showAnimesTab])

    useEffect(() => {
        const updateAnimes = () => {
            if (animes) {
                const listAnimes = data.list.animes.map((an) => an.id);

                const tabAnimes = animes.filter((anime) => {
                    if (!listAnimes.includes(anime.id)) {
                        return anime;
                    }
                })
                setNewAnimes(tabAnimes);
            }
        }

        updateAnimes();
    }, [animes])

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
                    <div className="animeMenuRow" onClick={() => setMenuOption("editList")}>
    
                        <MdEdit size={22} />
    
                        <p className="font-bold text-[18px]">
                            Editar
                        </p>
                    </div>
                    <div className="animeMenuRow" onClick={() => setMenuOption("delete")}>
    
                        <FaTrashAlt size={22} />
    
                        <p className="font-bold text-[18px]">
                            Deletar
                        </p>
                    </div>
                    <div className="animeMenuRow" >
                        <FaPlus size={22} />
    
                        <p className="font-bold text-[18px]"
                            onClick={() => setShowAnimesTab(true)}>
                            Adicionar anime
                        </p>
                    </div>
                    {
                        showAnimesTab && newAnimes != undefined && (
                            <>
                                <hr className="min-w-[80%] border-lead-200 my-3" />
                                <div className="flex flex-col w-[200px] h-full ml-5 overflow-auto">
                                    {
                                        newAnimes.map((anime) => (
                                            <div className="flex flex-col w-full h-full justify-center hover:bg-lead-500
                                            text-lead-200 hover:text-crimson-300 transition-all hover:cursor-pointer"
                                                onClick={() => setMenuOption("add", anime.id)}>
                                                <p className="text-[18px]">{anime.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
    
                        )
                    }
                </div>
    
            </div>
        );
}