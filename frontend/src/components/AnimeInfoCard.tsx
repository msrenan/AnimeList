import { useEffect, useState } from "react";
import type { AnimeResponse } from "../types/api/Response";
import { FaRegStar, FaStar } from "react-icons/fa";

type props = {
    animeData: AnimeResponse,
    Ikey: string
}

export default function AnimeCard(data: props) {

    const [info, setInfo] = useState<AnimeResponse>(data.animeData);
    const [favorite, setFavorite] = useState<boolean>(data.animeData.favorite);
    const [status, setStatus] = useState<string>("");
    const [tracking, setTracking] = useState<string>("");

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



    return(
            <div className="w-[350px] h-[450px] rounded-[16px] bg-lead-500 flex flex-col
                            items-center shrink-0 hover:-translate-y-0.5 transition-all
                            p-5 border-2 border-crimson-600"
                 key={data.Ikey}
            >

                <div className="flex w-full items-center justify-end">
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
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <h1 className="font-bold text-[28px] text-crimson-600">{info.title}</h1>
                    <p className="font-semibold text-[20px] text-crimson-500"><u>Informações:</u></p>
                    <div className="flex flex-col h-full items-center justify-center">
                        <p className="animeCardInfo">Temporada: {info.season}</p>
                        <p className="animeCardInfo">Episódio: {info.episode}</p>
                        <p className="animeCardInfo">Dia de Lançamento: {info.releaseDay}</p>
                        <p className="animeCardInfo">Status: {status}</p>
                        <p className="animeCardInfo">{tracking}</p>
                    </div>
                </div>
            </div>
    );
}