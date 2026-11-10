import { useCallback, useState } from "react";
import { authCheck, authLogin, authRegister } from "../api/routes/auth";
import type { loginResponse } from "../types/api/Response";

export function useAuth() {
  const [token, setToken] = useState<string>(() => localStorage.getItem("AccountToken") ?? "");
  const [accountId, setAccountId] = useState<string>(() => localStorage.getItem("AccountId") ?? "");

  const storeSession = useCallback((response: loginResponse) => {
    localStorage.setItem("AccountToken", response.token);
    localStorage.setItem("AccountId", response.accountId);
    setToken(response.token);
    setAccountId(response.accountId);
    return response;
  }, []);

  const login = useCallback(
    async (cred: string, pass: string) => {
      const response = await authLogin({ login: cred.trim(), password: pass });
      return storeSession(response);
    },
    [storeSession],
  );

  const register = useCallback(
    async (nick: string, email: string, pass: string) => {
      const response = await authRegister({
        nickname: nick.trim(),
        email: email.trim(),
        password: pass,
      });
      return storeSession(response);
    },
    [storeSession],
  );

  const check = useCallback(async () => authCheck(), []);

  const clearSession = useCallback(() => {
    localStorage.removeItem("AccountToken");
    localStorage.removeItem("AccountId");
    setToken("");
    setAccountId("");
  }, []);

  return { token, accountId, login, register, check, clearSession };
}
