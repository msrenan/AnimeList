import { useState } from "react";
import type { AccountResponse } from "../types/api/Response";
import { editAccountById, getAccount, deleteAccountById } from "../api/routes/account";
import type { EditAccountData } from "../types/api/Request";

export function useAccount(id: string) {

    const [account, setAccount] = useState<AccountResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const fetchAccount = async () => {
        if (!id) return;
        setIsLoading(true);
        const response: AccountResponse = await getAccount(id);
        if (response && response != undefined) {
            setAccount(response);
            setIsLoading(false);
        }
    }

    const editAccount = async (newName: EditAccountData) => {
        if (!id) return;
        setIsLoading(true);
        const response: AccountResponse = await editAccountById(id, newName);
        if (response && response != undefined) {
            setAccount(response);
            setIsLoading(false);
        }
    }

    const deleteAccount = async () => {
        if (!id) return;
        console.log("Deleting account")
        setIsLoading(true);
        await deleteAccountById(id);
    }

    return { account, isLoading, fetchAccount, editAccount, setIsLoading, deleteAccount};
}