import { createContext } from "react";

export interface LoginContext {
    isLoggedIn: (state: boolean) => void;
    storeId: (id: string) => void;
}

export const loginContext = createContext<LoginContext>({
    isLoggedIn: () => {},
    storeId: () => {}
});

export interface AccountContext {
    accountId: string;
}

export const accountContext = createContext<AccountContext>({
    accountId: ""
});


