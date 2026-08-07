import { useContext, useEffect, useRef, useState } from "react"
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response"
import { FaListUl } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import AnimeInfoCard from "./AnimeInfoCard";
import ListContextMenu from "./ListContextMenu";
import { listCardContext, listsContext, type ListCardContext } from "../types/context";
import ListTitleContextMenu from "./ListTitleContextMenu";
import { useList } from "../hooks/useList";
import Loading from "./Loading";
import type { EditAnimeListData } from "../types/api/Request";
import { useAnimes } from "../hooks/useAnimes";
import { FilterOptions } from "../types/enum";

type props = {
    listData: AnimeListResponse,
    alwaysActive: boolean
}

export default function ListCard(data: props) {

    const [info] = useState<AnimeListResponse>(data.listData);
    const [showAnimes, setShowAnimes] = useState<boolean>(data.alwaysActive);
    const [animes, setAnimes] = useState<AnimeResponse[]>([]);
    const [showAnimeCard, setShowAnimeCard] = useState<{view: boolean, animeInfo?: AnimeResponse}>({view: false});
    const [infoCardCoord, setInfoCardCoord] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [showContext, setShowContext] = useState<boolean>(false);
    const [showTitleContext, setShowTitleContext] = useState<boolean>(false);
    const [contextCoords, setContextCoords] = useState<{x: number, y:number}>({x: 0, y: 0});
    const [animeRow, setAnimeRow] = useState<AnimeResponse>();

    const [editMode, setEditMode] = useState<boolean>(false);

    const LIST_STYLE = "w-full max-h-[80%] bg-lead-600 border-2 border-lead-300 rounded-[16px]\
            hover:border-crimson-500 transition-all flex flex-col justify-center py-3 px-3 text-lead-300 hover:text-crimson-500\
            hover:cursor-pointer hover:-translate-y-0.5 group focus:border-crimson-500 focus:text-crimson-500\
            focus:-translate-y-0.5 overflow-hidden shrink-0"

    const ACTIVE_LIST_STYLE = "w-full max-h-[80%] bg-lead-600 border-2 rounded-[16px] border-crimson-500 flex flex-col justify-center py-3 px-3\
            text-crimson-500 hover:cursor-pointer hover:-translate-y-0.5 group overflow-hidden shrink-0"

    const cardRef = useRef<HTMLDivElement>(null);
    const infoCardRef = useRef<HTMLDivElement>(null);

    const { getListAnimes, isLoading } = useList();
    const { animeFilter } = useAnimes();

    const { setRemoveAnimeFromList, setEditForm, setAddAnimeToList,
        setDeleteList, setEditedListData
     } = useContext(listsContext);

    const handleClick = () => {
        if (editMode) return;
        if (data.alwaysActive) return;
        if (cardRef.current != null) {
            if (showAnimes) {
                cardRef.current.blur();
                setShowAnimes(false);
                setShowAnimeCard({view: false});
            } else {
                cardRef.current.focus();
                setShowAnimes(true);
            }
        }   
    }

    const updateCoords = (coords: {x: number, y: number}) => {
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;

        if (coords.x > maxX / 2 && coords.y > maxY / 2) {
            setContextCoords({x: coords.x - 280, y: coords.y})
        } else if (coords.x > maxX / 2 && coords.y <= maxY / 2) {
            setContextCoords({x: coords.x - 280, y: coords.y})
        } else if (coords.x <= maxX / 2 && coords.y > maxY / 2) {
            setContextCoords({x: coords.x, y: coords.y})
        } else {
            setContextCoords({x: coords.x, y: coords.y});
        }
    }

    const sendListEdition = (newName: string) => {

        const changes: EditAnimeListData = {
            name: newName
        };

        setEditedListData(info.id, changes);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendListEdition(e.currentTarget.value);
        }
    }

    const ListCardContextValue: ListCardContext = {
        setMenuView: (view: boolean) => {
            setShowContext(view);
            setShowTitleContext(view);
        },
        view: showContext || showTitleContext,
        setMenuOption: (option: 'editAnime' | 'remove' | 'editList' | 'delete' | 'add', animeId?: string) => {
            if (option === 'editAnime') {
                console.log("AnimeEdition");
                if (animeRow) {
                    setEditForm(true, animeRow);
                }
                setShowContext(false);
                setShowTitleContext(false);
            } else if (option === 'remove') {
                console.log("Anime removal")
                if (animeRow) {
                    setRemoveAnimeFromList(info.id, animeRow.id);
                }
                setShowContext(false);
                setShowTitleContext(false);
            } else if (option === 'editList') {
                console.log("ListEdition!");
                setEditMode(true);
                setShowContext(false);
                setShowTitleContext(false);
            } else if (option === 'delete') {
                setDeleteList(true, info);
                setShowContext(false);
                setShowTitleContext(false);
            } else if (option === 'add' && animeId) {
                setAddAnimeToList(animeId, info.id)
                setShowContext(false);
                setShowTitleContext(false);
            }
        },
    }

    useEffect(() => {

        const updateAnimes = async () => {
            if (info.id === "watching") {
                const listAnimes = await animeFilter(FilterOptions.Assistindo)
                 if (listAnimes) {
                    setAnimes(listAnimes);
                }
            } else if (info.id === "start") {
                const listAnimes = await animeFilter(FilterOptions.Comecar)
                 if (listAnimes) {
                    setAnimes(listAnimes);
                }
            } else {
                const listAnimes = await getListAnimes(info.id);
                if (listAnimes) {
                    setAnimes(listAnimes);
                }
            }
            
        }

        updateAnimes();

        if (!showAnimeCard.view) return;

        const handleClickOutside = (e: MouseEvent) => {
            // Se o clique foi fora do container pai, fecha o dropdown
            if (infoCardRef.current && !infoCardRef.current.contains(e.target as Node)) {
                setShowAnimeCard({view: false});
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAnimeCard.view]);

    return(
        <listCardContext.Provider value={ListCardContextValue}>
            <div className={data.alwaysActive ? ACTIVE_LIST_STYLE : LIST_STYLE}
            key={info.id}
            ref={cardRef}
            onBlur={() => {
                setShowAnimeCard({view: false}); 
                if (!data.alwaysActive) setShowAnimes(false)
            }}
            tabIndex={0}
            >
                <div className="flex items-center justify-between w-full"
                onClick={() => handleClick()} onContextMenu={(e) => {
                    e.preventDefault();
                    updateCoords({x: e.clientX, y: e.clientY});
                    setShowTitleContext(true);
                }}>
                    <div className="flex items-center justify-start gap-3 h-full w-[50%] shrink-0">
                        <FaListUl size={30}/>
                        {
                            editMode ? (
                                <input autoFocus={true} className="font-bold text-[32px]
                                outline-none" defaultValue={info.name} onKeyDown={(e) => handleKeyDown(e)}
                                onBlur={(e) => sendListEdition(e.currentTarget.value)}/>
                            ) : (
                                <h1 className="font-bold text-[32px]">{info.name}</h1>
                            )
                        }
                        
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <p className="text-[24px]">{animes.length} anime(s)</p>
                    </div>
                    <div className="flex items-center justify-center -rotate-90 group-focus:rotate-0 transition-all
                    duration-100 shrink-0">
                        <TiArrowSortedDown size={32} />
                    </div>
                </div>
                

                <div 
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                        showAnimes 
                            ? "grid-rows-[1fr] opacity-100 mt-1" 
                            : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                >
                    <div className="flex flex-col gap-1 overflow-scroll">
                        {isLoading ? (
                            <Loading size={24}/>
                        ) : animes.length > 0 ? animes.map((an, i) => (
                            <div key={`${an.id}-${info.id}`} className="flex w-full h-full text-crimson-500 items-center gap-3
                            hover:bg-lead-800/50 hover:text-crimson-500 transform-fill"
                            onClick={(e) => {
                                setShowAnimeCard({view: true, animeInfo: an});
                                setInfoCardCoord({x:e.clientX, y:e.clientY})}}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                updateCoords({x: e.clientX, y: e.clientY});
                                setAnimeRow(an);
                                setShowContext(true);
                            }}
                            >
                                <p className="font-bold text-[28px] mr-5 w-[50%]"><span className={an.favorite ? "text-yellow-400" : ""}>{i + 1}.</span> {an.title}</p>
                                <div className="flex gap-2 items-center justify-center">
                                    <p className="text-[24px]">Temporada: {an.season}</p>
                                    <p className="text-[24px]">Episódio: {an.episode}</p>

                                </div>
                            </div>
                        )) : (
                            <div className="flex w-full h-fit text-crimson-500 items-center justify-center gap-3">
                                <h1 className="text-[28px] font-bold">Lista vazia.</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showAnimeCard.view && showAnimeCard.animeInfo && (
                <div className="absolute w-fit h-fit"
                style={{top:`${infoCardCoord.y}px`, left: `${infoCardCoord.x}px`}}
                ref={infoCardRef}
                >
                    <AnimeInfoCard animeData={showAnimeCard.animeInfo} Ikey={showAnimeCard.animeInfo.id}/>
                </div>
            )}

            {showContext && animeRow && (
                <ListContextMenu x={contextCoords.x} y={contextCoords.y} isSpecial={info.name.toLowerCase() === "favoritos" || info.id === "start" || info.id === "watching"} />
            )}

            {info.name.toLowerCase() !== "favoritos" && info.id != "watching" && info.id != "start" && showTitleContext && (
                <ListTitleContextMenu x={contextCoords.x} y={contextCoords.y} list={info} />
            )}
        </listCardContext.Provider>
    );

}