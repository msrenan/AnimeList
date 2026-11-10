import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AnimeListResponse } from "../types/api/Response";
import { createAccountList, getAccountLists } from "../api/routes/account";
import type {
  AnimeListData,
  EditAnimeData,
  EditAnimeListData,
} from "../types/api/Request";
import {
  addAnimeToListById,
  deleteAnimeList,
  editAnimeList,
  getListAnimesById,
  removeAnimeOfListById,
} from "../api/routes/animeList";
import { editAnimeById } from "../api/routes/anime";
import { getApiErrorMessage } from "../api/axios";

export function normalizeLists(list: AnimeListResponse[]) {
  const favorites = list.filter((item) => item.name.toLowerCase() === "favoritos");
  const others = list.filter((item) => item.name.toLowerCase() !== "favoritos");

  const byName = (a: AnimeListResponse, b: AnimeListResponse) =>
    a.name.localeCompare(b.name);
  favorites.sort(byName);
  others.sort(byName);

  return [...favorites, ...others];
}

export function useList(accountId?: string) {
  const [lists, setLists] = useState<AnimeListResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLists = useCallback(async () => {
    if (!accountId) return [];
    setIsLoading(true);
    try {
      const response = await getAccountLists(accountId);
      const normalized = normalizeLists(response);
      setLists(normalized);
      return normalized;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  const searchLists = useCallback(
    async (query: string) => {
      if (!accountId) return [];
      setIsLoading(true);
      try {
        const response = query.trim()
          ? await getAccountLists(accountId, query)
          : await getAccountLists(accountId);
        const normalized = normalizeLists(response);
        setLists(normalized);
        return normalized;
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [accountId],
  );

  const getListAnimes = useCallback(async (listId: string) => {
    try {
      return await getListAnimesById(listId);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return undefined;
    }
  }, []);

  const createList = useCallback(
    async (data: AnimeListData) => {
      if (!accountId) return null;
      try {
        const response = await createAccountList(accountId, data);
        setLists((current) => normalizeLists([...current, response]));
        toast.success("Lista criada!");
        return response;
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        return null;
      }
    },
    [accountId],
  );

  const addAnimeToList = useCallback(async (listId: string, animeId: string) => {
    try {
      const response = await addAnimeToListById(listId, animeId);
      setLists((current) =>
        normalizeLists(current.map((list) => (list.id === listId ? response : list))),
      );
      toast.success("Anime adicionado à lista!");
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return null;
    }
  }, []);

  const removeAnimeOfList = useCallback(async (listId: string, animeId: string) => {
    try {
      const response = await removeAnimeOfListById(listId, animeId);
      setLists((current) =>
        normalizeLists(current.map((list) => (list.id === listId ? response : list))),
      );
      toast.success("Anime removido da lista.");
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return null;
    }
  }, []);

  const editAnimeInList = useCallback(async (id: string, data: EditAnimeData) => {
    try {
      const result = await editAnimeById(id, data);
      setLists((current) =>
        normalizeLists(
          current.map((list) => {
            const updatedAnimes = (list.animes ?? []).map((anime) =>
              anime.id === id ? result : anime,
            );

            return {
              ...list,
              animes:
                list.name.toLowerCase() === "favoritos"
                  ? updatedAnimes.filter((anime) => anime.favorite)
                  : updatedAnimes,
            };
          }),
        ),
      );
      toast.success("Anime atualizado!");
      return result;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return null;
    }
  }, []);

  const editList = useCallback(async (id: string, changes: EditAnimeListData) => {
    try {
      const response = await editAnimeList(id, changes);
      setLists((current) =>
        normalizeLists(current.map((list) => (list.id === id ? response : list))),
      );
      toast.success("Lista atualizada!");
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return null;
    }
  }, []);

  const deleteList = useCallback(async (id: string) => {
    try {
      await deleteAnimeList(id);
      setLists((current) => current.filter((list) => list.id !== id));
      toast.success("Lista excluída.");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return false;
    }
  }, []);

  return {
    lists,
    isLoading,
    searchLists,
    createList,
    deleteList,
    editList,
    addAnimeToList,
    removeAnimeOfList,
    editAnimeInList,
    fetchLists,
    getListAnimes,
  };
}
