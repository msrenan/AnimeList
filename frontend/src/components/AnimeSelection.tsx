import { useEffect, useState } from "react";
import { useAnimes } from "../hooks/useAnimes";

type props = {
    sendData: (ids: string[]) => void;
}

export default function AnimeSelection(data: props) {

    const { animes, fetchAnimes } = useAnimes();
    const [initialIds, setInitialIds] = useState<string[]>([]);

    const handleAnimeSelection = (id: string) => {
        if (initialIds.includes(id)) {
            setInitialIds(l => l.filter((aid) => aid !== id))
        } else {
            setInitialIds(l => [...l, id])
        }
    }

    useEffect(() => {
        data.sendData(initialIds);
    }, [initialIds])

    useEffect(() => {
        fetchAnimes();
    }, [])
    
    return(
        <div className="w-full h-full flex flex-col gap-1 overflow-hidden p-5">
            <p className="w-full text-[24px] font-bold text-crimson-200 text-center">
                Adicione animes à sua lista!
            </p>
            <div className="w-full max-h-[100%] bg-lead-900 rounded-[12px] flex flex-col
            overflow-x-clip overflow-y-scroll p-2">
                {animes && animes.map((a) => (
                    <div className={initialIds.includes(a.id) ? "text-[20px] font-bold bg-lead-600\
                        text-crimson-300 hover:cursor-pointer" 
                        : "text-[20px] text-lead-300 hover:bg-lead-600 hover:text-crimson-300\
                        transition-all hover:cursor-pointer"}
                    onClick={() => handleAnimeSelection(a.id)}
                    >
                    {a.title} 
                    </div>
                ))}
            </div>

        </div>
    );

}