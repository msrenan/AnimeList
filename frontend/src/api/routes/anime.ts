import api from "../axios";
import type { AnimeData, EditAnimeData } from "../../types/api/Request";
import type { AnimeResponse } from "../../types/api/Response";
import type { FilterOptions } from "../../types/enum";

export async function getAnimes(): Promise<AnimeResponse[]> {
  const response = await api.get<AnimeResponse[]>("/anime");
  return response.data;
}

export async function searchAnimes(query: string): Promise<AnimeResponse[]> {
  const response = await api.get<AnimeResponse[]>("/anime", {
    params: { search: query },
  });
  return response.data;
}

export async function getAnimesByFilter(filter: FilterOptions): Promise<AnimeResponse[]> {
  const response = await api.get<AnimeResponse[]>("/anime", {
    params: { filter },
  });
  return response.data;
}

export async function getAnimeById(id: string): Promise<AnimeResponse> {
  const response = await api.get<AnimeResponse>(`/anime/id/${id}`);
  return response.data;
}

export async function createAnime(anime: AnimeData): Promise<AnimeResponse> {
  const response = await api.post<AnimeResponse>("/anime", anime);
  return response.data;
}

export async function editAnimeById(id: string, data: EditAnimeData): Promise<AnimeResponse> {
  const response = await api.put<AnimeResponse>(`/anime/id/${id}`, data);
  return response.data;
}

export async function deleteAnimeById(id: string): Promise<void> {
  await api.delete(`/anime/id/${id}`);
}
