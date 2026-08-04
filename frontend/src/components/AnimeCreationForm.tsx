import { useContext, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import ReleaseDayDropdown from "./ReleaseDayDropdown";
import { ReleaseDay } from "../types/enum";
import { animeContext, animeFormContext, type AnimeFormContext } from "../types/context";
import AnimeStatusRadio from "./AnimeStatusRadio";
import AnimeWatchRadio from "./AnimeWatchRadio";
import type { AnimeData } from "../types/api/Request";
import { IoMdClose } from "react-icons/io";

export default function AnimeCreationForm() {

    const [title, setTitle] = useState<string>("");
    const [season, setSeason] = useState<string>("");
    const [episode, setEpisode] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [releaseDay, setReleaseDay] = useState<ReleaseDay>(ReleaseDay.Domingo);
    const [finished, setFinished] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(false);
    const [ntw, setNTW]  = useState<boolean>(false);
    const [watched, setWatched] = useState<boolean>(false);

    const { setAnimeForm, setAddAnime } = useContext(animeContext);

    const AnimeFormContextValue: AnimeFormContext = {
        setReleaseDay: (day: ReleaseDay) => {
            setReleaseDay(day);
        },
        setStatus: (status: string) => {
            if (status === 'finalizado') {
                setFinished(true);
                setWaiting(false);
            } else if (status === 'ongoing') {
                setFinished(false);
                setWaiting(false);
            } else {
                setFinished(false);
                setWaiting(true);
            }
        },
        setTracking: (tracking: string) => {
            if (tracking === 'assistindo') {
                setNTW(false);
                setWatched(false);
            } else if (tracking === 'comecar') {
                setNTW(true);
                setWatched(false);
            } else if (tracking === 'rever') {
                setNTW(true);
                setWatched(true);
            } else {
                setNTW(false);
                setWatched(true);
            }
        },
    };

    const handleSend = () => {
        let intEp, intTemp;

        if (episode === '') {
            intEp = 0;
        } else {
            intEp = parseInt(episode.trim());
        }

        if (season === '') {
            intTemp = 0;
        } else {
            intTemp = parseInt(season.trim());
        }

        const newAnime: AnimeData = {
            title,
            season: intTemp,
            episode: intEp,
            releaseDay,
            isFinished: finished,
            favorite: isFavorite,
            needToWatch: ntw,
            waitingForNextSeason: waiting,
            watched
        }

        setAddAnime(newAnime);

        console.log(`Adding anime: ${JSON.stringify(newAnime)}`)

        setAnimeForm(false);
    }

    return(
        <animeFormContext.Provider value={AnimeFormContextValue}>
        <div className="absolute w-[600px] h-[880px] top-1/2 left-1/2 
                        -translate-x-[300px] -translate-y-[440px] bg-lead-500 shadow-md
                        rounded-[16px] p-5 border-2 border-lead-200 flex flex-col
                        items-center">
            <div className="flex w-full items-center justify-end">
                <button className="border-2 border-lead-600 text-lead-600 hover:border-lead-200
                hover:text-lead-200 hover:cursor-pointer transition-all duration-75"
                onClick={() => setAnimeForm(false)}>
                    <IoMdClose size={28} />
                </button>
            </div>
            <h1 className="font-bold text-[32px] text-lead-200 mb-5">Adicione um Anime!</h1>
            <div className="w-full flex flex-col gap-8 items-center justify-center">
                <div className="relative w-full">
                    <input
                        id={"titleInput"}
                        /* O truque do CSS: um espaço em branco no placeholder */
                        placeholder=" "
                        onBlur={(e) => setTitle(e.currentTarget.value)}
                        className="peer w-full rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[28px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                    />
                    
                    <label
                        htmlFor={"titleInput"}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                        /* Quando o input está focado */
                        peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-crimson-400
                        /* Quando o input NÃO está vazio (tem texto digitado) */
                        peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-crimson-500"
                    >
                        {"Título do Anime"}
                    </label>
                </div>

                <div className="w-full flex items-center">
                    <div className="w-fit shrink-0">
                        <div className="relative w-full">
                            <input
                                id={"seasonInput"}
                                /* O truque do CSS: um espaço em branco no placeholder */
                                placeholder=" "
                                onBlur={(e) => setSeason(e.currentTarget.value)}
                                min={0}
                                className="peer w-[325px] rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[28px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                            />
                            
                            <label
                                htmlFor={"seasonInput"}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                                /* Quando o input está focado */
                                peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-crimson-400
                                /* Quando o input NÃO está vazio (tem texto digitado) */
                                peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-crimson-500"
                            >
                                {"Temporada Atual"}
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {isFavorite ? (
                            <button className="text-amber-300 hover:cursor-pointer" onClick={() => setIsFavorite(!isFavorite)}>
                                <FaStar size={46}/>
                            </button>  
                        ) : (
                            <button className="text-amber-300 hover:cursor-pointer" onClick={() => setIsFavorite(!isFavorite)}>
                                <FaRegStar size={46}/>
                            </button> 
                        )}
                    </div>
                </div>
                
                <div className="w-full flex items-center gap-2">
                    <div className="w-fit shrink-0">
                        <div className="relative w-full">
                            <input
                                id={"episodeInput"}
                                /* O truque do CSS: um espaço em branco no placeholder */
                                placeholder=" "
                                min={0}
                                onBlur={(e) => setEpisode(e.currentTarget.value)}
                                className="peer w-[285px] rounded-lg border border-lead-700 bg-lead-900 px-4 py-2 text-[28px] text-white outline-none transition-all focus:border-lead-700 focus:ring-1 focus:ring-lead-700"
                            />
                            
                            <label
                                htmlFor={"episodeInput"}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-lead-400 transition-all duration-200 ease-out 
                                /* Quando o input está focado */
                                peer-focus:-top-8 peer-focus:translate-y-0 peer-focus:text-[20px] peer-focus:font-medium peer-focus:text-crimson-400
                                /* Quando o input NÃO está vazio (tem texto digitado) */
                                peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[20px] peer-[:not(:placeholder-shown)]:text-crimson-500"
                            >
                                {"Episódio Atual"}
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <ReleaseDayDropdown />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-0.5 justify-center items-center">
                    <div className="flex flex-col w-full items-center justify-center shrink-0">
                        <p className="text-[24px] text-lead-200 font-bold shrink-0">Status do Anime: </p>
                        <AnimeStatusRadio />
                    </div>

                    <div className="flex flex-col w-full items-center justify-center">
                        <p className="text-[24px] text-lead-200 font-bold shrink-0">Status de Acompanhamento: </p>
                        <AnimeWatchRadio />
                    </div>
                </div>
                
            </div>
            <button className="genericButton shrink-0" onClick={() => handleSend()}>
                <p className="font-bold text-[20px] text-lead-200">Adicionar Anime</p>
            </button>
        </div>
        </animeFormContext.Provider>
    );

}