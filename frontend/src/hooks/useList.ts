import { useState } from "react";
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response";
import { createAccountList, getAccountLists } from "../api/routes/account";
import type { AnimeListData, EditAnimeData, EditAnimeListData } from "../types/api/Request";
import { addAnimeToListById, deleteAnimeList, editAnimeList, getListAnimesById, removeAnimeOfListById } from "../api/routes/animeList";
import { editAnimeById } from "../api/routes/anime";

export function useList(accountId?: string) {

    const [lists, setLists] = useState<AnimeListResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const normalize = (list: AnimeListResponse[]) => {
        const favList = list.filter((list) => list.name.toLowerCase() == "favoritos");
        const normList = list.filter((list) => list.name.toLowerCase() != "favoritos");

        favList.sort((a, b) => a.name.localeCompare(b.name));
        normList.sort((a, b) => a.name.localeCompare(b.name));

        return [...favList, ...normList];

    }

    const fetchLists = async () => {
        if (accountId) {
            setIsLoading(true);
            const response: AnimeListResponse[] = await getAccountLists(accountId);
            if (response && response != undefined) {
                setLists(normalize(response));
                setIsLoading(false);
            }
        }
    }

    const searchLists = async (query: string) => {
        if (!accountId) return;
        setIsLoading(true);
        const response: AnimeListResponse[] = await getAccountLists(accountId, query);
        if (response && response != undefined) {
            setLists(normalize(response));
            setIsLoading(false);
        }
    }

    const getListAnimes = async (listId: string) => {
        setIsLoading(true);
        const response: AnimeResponse[] = await getListAnimesById(listId);
        if (response && response != undefined) {
            setIsLoading(false);
            return response;
        }
    }

    const createList = async (data: AnimeListData) => {
        if (!accountId) return;
        setIsLoading(true);
        const response: AnimeListResponse = await createAccountList(accountId, data);
        if (response && response != undefined) {
            setLists(l => normalize([...l, response]));
            setIsLoading(false);
        }
    }

    const addAnimeToList = async (listId: string, animeId: string) => {
        setIsLoading(true);
        const response: AnimeListResponse = await addAnimeToListById(listId, animeId);
        if (response && response != undefined) {
            setLists(l => normalize(l.map((list) => list.id === listId ? response : list)));
            setIsLoading(false);
        }
    }

    const removeAnimeOfList = async (listId: string, animeId: string) => {
        setIsLoading(true);
        const response: AnimeListResponse = await removeAnimeOfListById(listId, animeId);
        if (response && response != undefined) {
            setLists(l => normalize(l.map((list) => list.id === listId ? response : list)));
            setIsLoading(false);
        }
    }

    const editAnimeInList = async (id: string, data: EditAnimeData) => {
        setIsLoading(true);
        const result: AnimeResponse = await editAnimeById(id, data);

        if (result && result != undefined) {

                setLists((prev) => {
                    const updatedLists = prev.map((list) => {
                        const updatedAnimes = list.animes.map((a) =>
                            a.id === id ? result : a
                        );

                        const filteredAnimes = updatedAnimes.filter((an) => {
                            if (list.name.toLowerCase() === "favoritos") {
                                return an.favorite;
                            }
                            return true;
                        });

                        return {
                            ...list,
                            animes: filteredAnimes,
                        };
                    });

                    return normalize(updatedLists);
                });
                setIsLoading(false);
        }
    }

    const editList = async (id: string, changes: EditAnimeListData) => {
        setIsLoading(true);
        const response: AnimeListResponse = await editAnimeList(id, changes);
        if (response && response != undefined) {
            setLists(l => l.map((list) => list.id === id ? response : list));
            setIsLoading(false);
        }
    }

    const deleteList = async (id: string) => {
        setIsLoading(true);
        await deleteAnimeList(id);
        if (lists) {
            setLists((prev) => prev.filter((list) => list.id !== id));
            setIsLoading(false);
        }
    }

    return { lists, isLoading, searchLists, createList, deleteList, editList,
        addAnimeToList, removeAnimeOfList, editAnimeInList, fetchLists, getListAnimes};
}