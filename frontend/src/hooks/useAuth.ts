import { useState } from "react";
import { authCheck, authLogin, authRegister } from "../api/routes/auth"
import type { loginResponse } from "../types/api/Response";

export function useAuth() {

    const [token, setToken] = useState<string>("");
    const [accountId, setAccountId] = useState<string>("");

    const login = async (cred: string, pass: string) => {
        const response: loginResponse = await authLogin({login: cred, password: pass});
        setToken(response.token);
        setAccountId(response.accountId);
    }

    const register = async (nick: string, email: string, pass: string) => {
        const response: loginResponse = await authRegister({nickname: nick, email, password: pass});
        setToken(response.token);
        setAccountId(response.accountId);
    }

    const check = async () => {
        return await authCheck();
    }

    return { token, login, register, check, accountId };

}