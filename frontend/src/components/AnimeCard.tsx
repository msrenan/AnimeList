import { useContext, useEffect, useState } from "react";
import type { AnimeResponse } from "../types/api/Response";
import { FaRegStar, FaStar, FaTrashAlt } from "react-icons/fa";
import { animeCardContext, animeContext, type AnimeCardContext } from "../types/context";
import type { EditAnimeData } from "../types/api/Request";
import AnimeContextMenu from "./AnimeContextMenu";

type props = {
    animeData: AnimeResponse,
    Ikey: string
}

export default function AnimeCard(data: props) {

    const [info, setInfo] = useState<AnimeResponse>(data.animeData);
    const [favorite, setFavorite] = useState<boolean>(data.animeData.favorite);
    const [status, setStatus] = useState<string>("");
    const [tracking, setTracking] = useState<string>("");

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [menuCoord, setMenuCoord] = useState<{x: number, y: number}>({x: 0, y: 0});

    const { setDirty, setEditForm, setShowDeleteModal, setAddAnimeToList } = useContext(animeContext);

    const updateCoords = (coords: {x: number, y: number}) => {
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;

        if (coords.x > maxX / 2 && coords.y > maxY / 2) {
            setMenuCoord({x: coords.x - 280, y: coords.y - 105})
        } else if (coords.x > maxX / 2 && coords.y <= maxY / 2) {
            setMenuCoord({x: coords.x - 280, y: coords.y})
        } else if (coords.x <= maxX / 2 && coords.y > maxY / 2) {
            setMenuCoord({x: coords.x, y: coords.y - 105})
        } else {
            setMenuCoord({x: coords.x, y: coords.y});
        }
    }

    const AnimeCardContextValue: AnimeCardContext = {
        setMenuView: (view: boolean) => {
            setShowMenu(view)
        },
        view: showMenu,
        setMenuOption: (option: 'edit' | 'addToList', listId?: string) => {
            if (option === 'edit') {
                setEditForm(true, info);
                setShowMenu(false);
            } else {
                if (listId) {
                    setAddAnimeToList(info.id, listId)
                    setShowMenu(false);
                }
            }
            
        }

    }

    useEffect(() => {
        const updateInfo = () => {
            setInfo(data.animeData)
            setFavorite(data.animeData.favorite);
            const finished = data.animeData.isFinished;
            const waiting = data.animeData.waitingForNextSeason;
            const ntw = data.animeData.needToWatch;
            const watched = data.animeData.watched;

            if (finished && !waiting) {
                setStatus("Finalizado")
            } else if (!finished && waiting) {
                const waitingStr = "Esperando T" + (data.animeData.season + 1);
                setStatus(waitingStr)
            } else {
                setStatus("On going")
            }

            if (ntw && !watched) {
                setTracking("Começar");
            } else if (!ntw && watched) {
                setTracking("Assistido");
            } else if (ntw && watched) {
                setTracking("Rever")
            } else {
                setTracking("Assistindo");
            }
        }

        updateInfo();
    }, [data.animeData])

    useEffect(() => {
        const updateFavorite = () => {
            setInfo({...info, favorite: favorite});
        }
        if (favorite != data.animeData.favorite) {
            const dirty: EditAnimeData = {
                favorite: favorite
            }
            updateFavorite();
            setDirty(info.id, dirty);
        }
        
    }, [favorite])

    return(
        <animeCardContext.Provider value={AnimeCardContextValue}>

            <div className="w-[350px] h-[450px] rounded-[16px] bg-lead-500 flex flex-col
                            items-center shrink-0 hover:-translate-y-0.5 transition-all
                            hover:cursor-pointer p-5"
                 key={data.Ikey}
                 onContextMenu={(e: React.MouseEvent) => {
                                e.preventDefault();
                                updateCoords({x:e.clientX, y:e.clientY})
                                setShowMenu(true);
                                }}>
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center justify-center">
                        <button className="text-crimson-900 hover:cursor-pointer hover:scale-[1.5]
                            transition-all"
                            onClick={() => setShowDeleteModal(true, info)}>
                            <FaTrashAlt size={34} />
                        </button>  
                    </div>
                    <div className="flex items-center justify-center">
                        {favorite ? (
                            <button className="text-amber-300 hover:cursor-pointer hover:scale-[1.5]
                            transition-all"
                            onClick={() => setFavorite(!favorite)}>
                                <FaStar size={34} />
                            </button>  
                        ) : (
                            <button className="text-amber-300 hover:cursor-pointer hover:scale-[1.5]
                            transition-all"
                            onClick={() => setFavorite(!favorite)}>
                                <FaRegStar size={34}/>
                            </button> 
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <h1 className="font-bold text-[28px] text-crimson-600 w-full text-center">{info.title}</h1>
                    <p className="font-semibold text-[20px] text-crimson-500"><u>Informações:</u></p>
                    <div className="flex flex-col h-full items-center justify-center">
                        <p className="animeCardInfo">Temporada: {info.season}</p>
                        <p className="animeCardInfo">Episódio: {info.episode}</p>
                        <p className="animeCardInfo">Dia de Lançamento: {info.releaseDay}</p>
                        <p className="animeCardInfo">Status: {status}</p>
                        <p className="animeCardInfo">{tracking}</p>
                    </div>
                </div>
                <p className="font-light text-lead-300 text-[16px]">Clique com o botão direito para editar!</p>
            </div>
            
            {showMenu && menuCoord && (
                <AnimeContextMenu x={menuCoord.x} y={menuCoord.y}/>
            )}
        
        </animeCardContext.Provider>
    );
//TODO 1. Fechar com click outside 2. Forms com blur.
}