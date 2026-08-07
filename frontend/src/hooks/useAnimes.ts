import { useState } from "react";
import { type AnimeResponse } from "../types/api/Response";
import { createAnime, deleteAnimeById, editAnimeById, getAnimes, getAnimesByFilter, searchAnimes } from "../api/routes/anime";
import type { AnimeData, EditAnimeData } from "../types/api/Request";
import type { FilterOptions } from "../types/enum";

export function useAnimes() {

    const [animes, setAnimes] = useState<AnimeResponse[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const normalize = (list: AnimeResponse[]) => {
        const favList = list.filter((anime) => anime.favorite);
        const normList = list.filter((anime) => !anime.favorite);

        favList.sort((a, b) => a.title.localeCompare(b.title));
        normList.sort((a, b) => a.title.localeCompare(b.title));

        return [...favList, ...normList];

    }

    // Descobrir o porque da sincronização das listas não estar funcionando enquanto a dos animes funciona!

    const fetchAnimes = async () => {
        setIsLoading(true);
        const allAnimes: AnimeResponse[] = await getAnimes();
        if (allAnimes) {
            setAnimes(normalize(allAnimes));
            setIsLoading(false);
        }
    }

    const animeSearch = async (query: string) => {
        setIsLoading(true);
        const result: AnimeResponse[] = await searchAnimes(query);

        if (result && result != undefined) {
            setAnimes(normalize(result));
            setIsLoading(false);
        }
    }

    const animeFilter = async (filter: FilterOptions) => {
        setIsLoading(true);
        const result: AnimeResponse[] = await getAnimesByFilter(filter);
        if (result && result != undefined) {
            setAnimes(normalize(result));
            setIsLoading(false);
            return normalize(result);
        }
    }

    const addAnime = async (newAnime: AnimeData) => {
        setIsLoading(true);
        const result: AnimeResponse = await createAnime(newAnime);

        if (result && result != undefined) {
            setAnimes(l => {
                if (l) return normalize([...l, result]);
            });
            setIsLoading(false);
        }
    }

    const editAnime = async (id: string, data: EditAnimeData) => {
        const result: AnimeResponse = await editAnimeById(id, data);

        if (result && result != undefined) {
            
            if (animes) {
                const updatedList = animes.map((anime) => {
                    if (anime.id === id) return result;
                    return anime;
                })

                setAnimes(normalize(updatedList));
            }
            
        }
    } 

    const deleteAnime = async (id: string) => {
        setIsLoading(true);
        await deleteAnimeById(id);
        if (animes) {
            const updatedList = animes.filter((anime) => anime.id != id)

            setAnimes(normalize(updatedList));
            setIsLoading(false);
        }
    }

    return { animes, isLoading, setIsLoading, animeSearch, fetchAnimes, addAnime,
        editAnime, deleteAnime, animeFilter};
}