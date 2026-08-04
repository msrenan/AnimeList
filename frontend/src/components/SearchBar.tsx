import { SlMagnifier } from "react-icons/sl";
import { animeContext } from "../types/context";
import { useContext, useEffect } from "react";
import { useAnimes } from "../hooks/useAnimes";


export default function SearchBar() {

    const { setAnimes, setLoading } = useContext(animeContext);

    const { animes, animeSearch, isLoading } = useAnimes();

    const handleInput = (query: string) => {
        animeSearch(query.trim());
    }

    useEffect(() => {
        const superAnimes = () => {
            if (animes) setAnimes(animes);
        }

        superAnimes();
    }, [animes])

    useEffect(() => {
        const superLoading = () => {
            setLoading(isLoading);
        } 

        superLoading();
    }, [isLoading])

    return(
        <div className="w-[800px] h-[80px] flex px-5 items-center gap-5 shrink-0">
            <div className="text-lead-400">
                <SlMagnifier size={32} />
            </div>
            <input 
                className="border-b-2 border-lead-400 w-full outline-0 text-[28px] text-crimson-600"
                placeholder=" "
                onChange={(e) => handleInput(e.currentTarget.value)}
                onBlur={(e) => handleInput(e.currentTarget.value)}
            />    
        </div>
    );

}