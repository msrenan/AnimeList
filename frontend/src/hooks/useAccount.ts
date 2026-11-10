import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AccountResponse } from "../types/api/Response";
import {
  deleteAccountById,
  editAccountById,
  getAccount,
} from "../api/routes/account";
import type { EditAccountData } from "../types/api/Request";
import { getApiErrorMessage } from "../api/axios";

export function useAccount(id: string) {
  const [account, setAccount] = useState<AccountResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAccount = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getAccount(id);
      setAccount(response);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const editAccount = useCallback(
    async (newName: EditAccountData) => {
      if (!id) return null;
      setIsLoading(true);
      try {
        const response = await editAccountById(id, newName);
        setAccount(response);
        toast.success("Perfil atualizado!");
        return response;
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  const deleteAccount = useCallback(async () => {
    if (!id) return false;
    setIsLoading(true);
    try {
      await deleteAccountById(id);
      setAccount(undefined);
      toast.success("Conta excluída.");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const currentAccount = account && account.id === id ? account : undefined;

  return { account: currentAccount, isLoading, fetchAccount, editAccount, deleteAccount };
}
