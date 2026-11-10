import axios from "axios";
import type { errorResponse } from "../types/api/Response";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccountToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && localStorage.getItem("AccountToken")) {
      localStorage.removeItem("AccountToken");
      localStorage.removeItem("AccountId");
      window.dispatchEvent(new CustomEvent("animelist:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<errorResponse>(error)) {
    const data = error.response?.data;

    if (data?.message) {
      if (typeof data.message === "string") return data.message;
      return Object.values(data.message).join(" ");
    }

    if (!error.response) {
      return "Não foi possível conectar ao servidor. Verifique se o backend está rodando.";
    }

    switch (error.response.status) {
      case 401:
        return "Credenciais inválidas ou sessão expirada.";
      case 403:
        return "Você não tem permissão para fazer isso.";
      case 404:
        return "Recurso não encontrado.";
      case 409:
        return "Já existe um registro com essas informações.";
      case 500:
        return "O servidor encontrou um erro. Tente novamente em instantes.";
      default:
        return "Não foi possível concluir a operação.";
    }
  }

  if (error instanceof Error) return error.message;
  return "Algo deu errado. Tente novamente.";
}

export function getApiFieldErrors(error: unknown): Record<string, string> | null {
  if (axios.isAxiosError<errorResponse>(error)) {
    const message = error.response?.data?.message;
    if (message && typeof message === "object" && !Array.isArray(message)) {
      return message as unknown as Record<string, string>;
    }
  }
  return null;
}

export default api;
