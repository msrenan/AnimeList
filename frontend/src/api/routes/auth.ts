import api from "../axios";
import type { LoginData, RegisterData } from "../../types/api/Request";
import type { loginResponse } from "../../types/api/Response";

export async function authLogin(data: LoginData): Promise<loginResponse> {
  const response = await api.post<loginResponse>("/auth/login", data);
  return response.data;
}

export async function authRegister(data: RegisterData): Promise<loginResponse> {
  const response = await api.post<loginResponse>("/auth/register", data);
  return response.data;
}

export async function authCheck(): Promise<boolean> {
  try {
    await api.get("/auth/check");
    return true;
  } catch {
    return false;
  }
}
