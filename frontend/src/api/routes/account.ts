import api from "../axios";
import type { AnimeListData, EditAccountData } from "../../types/api/Request";
import type {
  AccountResponse,
  AnimeListResponse,
} from "../../types/api/Response";

export async function getAccount(id: string): Promise<AccountResponse> {
  const response = await api.get<AccountResponse>(`/account/${id}`);
  return response.data;
}

export async function getAccountLists(
  id: string,
  query?: string,
): Promise<AnimeListResponse[]> {
  const response = await api.get<AnimeListResponse[]>(`/account/${id}/lists`, {
    params: query ? { search: query } : undefined,
  });
  return response.data;
}

export async function createAccountList(
  id: string,
  data: AnimeListData,
): Promise<AnimeListResponse> {
  const response = await api.post<AnimeListResponse>(`/account/${id}/lists`, data);
  return response.data;
}

export async function editAccountById(
  id: string,
  data: EditAccountData,
): Promise<AccountResponse> {
  const response = await api.put<AccountResponse>(`/account/${id}`, data);
  return response.data;
}

export async function deleteAccountById(id: string): Promise<void> {
  await api.delete(`/account/${id}`);
}
