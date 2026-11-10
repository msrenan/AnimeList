import api from "../axios";
import type { EditAnimeListData } from "../../types/api/Request";
import type {
  AnimeListResponse,
  AnimeResponse,
} from "../../types/api/Response";

export async function getList(id: string): Promise<AnimeListResponse> {
  const response = await api.get<AnimeListResponse>(`/list/${id}`);
  return response.data;
}

export async function getListAnimesById(id: string): Promise<AnimeResponse[]> {
  const response = await api.get<AnimeResponse[]>(`/list/${id}/animes`);
  return response.data;
}

export async function addAnimeToListById(
  id: string,
  animeId: string,
): Promise<AnimeListResponse> {
  const response = await api.patch<AnimeListResponse>(`/list/${id}/add/id/${animeId}`);
  return response.data;
}

export async function removeAnimeOfListById(
  id: string,
  animeId: string,
): Promise<AnimeListResponse> {
  const response = await api.patch<AnimeListResponse>(`/list/${id}/remove/id/${animeId}`);
  return response.data;
}

export async function editAnimeList(
  id: string,
  data: EditAnimeListData,
): Promise<AnimeListResponse> {
  const response = await api.put<AnimeListResponse>(`/list/${id}`, data);
  return response.data;
}

export async function deleteAnimeList(id: string): Promise<void> {
  await api.delete(`/list/${id}`);
}
