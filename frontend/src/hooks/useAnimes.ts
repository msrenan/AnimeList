import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AnimeResponse } from "../types/api/Response";
import {
  createAnime,
  deleteAnimeById,
  editAnimeById,
  getAnimes,
  getAnimesByFilter,
  searchAnimes,
} from "../api/routes/anime";
import type { AnimeData, EditAnimeData } from "../types/api/Request";
import type { FilterOptions } from "../types/enum";
import { getApiErrorMessage } from "../api/axios";

export function normalizeAnimes(list: AnimeResponse[]) {
  const favorites = list.filter((anime) => anime.favorite);
  const others = list.filter((anime) => !anime.favorite);

  const byTitle = (a: AnimeResponse, b: AnimeResponse) => a.title.localeCompare(b.title);
  favorites.sort(byTitle);
  others.sort(byTitle);

  return [...favorites, ...others];
}

export function useAnimes() {
  const [animes, setAnimes] = useState<AnimeResponse[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAnimes = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAnimes();
      setAnimes(normalizeAnimes(result));
      return normalizeAnimes(result);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const animeSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const result = query.trim() ? await searchAnimes(query) : await getAnimes();
      const normalized = normalizeAnimes(result);
      setAnimes(normalized);
      return normalized;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const animeFilter = useCallback(async (filter?: FilterOptions) => {
    setIsLoading(true);
    try {
      const result = filter ? await getAnimesByFilter(filter) : await getAnimes();
      const normalized = normalizeAnimes(result);
      setAnimes(normalized);
      return normalized;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAnime = useCallback(async (newAnime: AnimeData) => {
    try {
      const result = await createAnime(newAnime);
      setAnimes((current) => normalizeAnimes([...(current ?? []), result]));
      toast.success("Anime adicionado à coleção!");
      return result;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return null;
    }
  }, []);

  const editAnime = useCallback(async (id: string, data: EditAnimeData) => {
    try {
      const result = await editAnimeById(id, data);
      setAnimes((current) =>
        current
          ? normalizeAnimes(current.map((anime) => (anime.id === id ? result : anime)))
          : current,
      );
      return result;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return null;
    }
  }, []);

  const toggleFavorite = useCallback(
    async (anime: AnimeResponse) => {
      const result = await editAnime(anime.id, { favorite: !anime.favorite });
      if (result) {
        toast.success(result.favorite ? "Adicionado aos favoritos!" : "Removido dos favoritos.");
      }
      return result;
    },
    [editAnime],
  );

  const deleteAnime = useCallback(async (id: string) => {
    try {
      await deleteAnimeById(id);
      setAnimes((current) => current?.filter((anime) => anime.id !== id));
      toast.success("Anime removido da coleção.");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return false;
    }
  }, []);

  return {
    animes,
    isLoading,
    animeSearch,
    fetchAnimes,
    addAnime,
    editAnime,
    toggleFavorite,
    deleteAnime,
    animeFilter,
  };
}
