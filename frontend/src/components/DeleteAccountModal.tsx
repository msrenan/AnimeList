import { useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { AccountResponse } from "../types/api/Response";
import { accountContext } from "../types/context";
import { useAccount } from "../hooks/useAccount";
import ConfirmModal from "./ui/ConfirmModal";

type DeleteAccountModalProps = {
  account: AccountResponse;
  setView: Dispatch<SetStateAction<boolean>>;
  onDeleted?: () => void;
};

export default function DeleteAccountModal({
  account,
  setView,
  onDeleted,
}: DeleteAccountModalProps) {
  const { logout } = useContext(accountContext);
  const { deleteAccount } = useAccount(account.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const deleted = await deleteAccount();
    setIsLoading(false);

    if (deleted) {
      logout();
      setView(false);
      onDeleted?.();
    }
  };

  return (
    <ConfirmModal
      title="Excluir conta"
      description={`Tem certeza que deseja excluir a conta de ${account.nick}? Todas as suas listas serão removidas.`}
      details={[account.email]}
      confirmLabel="Excluir conta"
      onConfirm={handleDelete}
      onClose={() => setView(false)}
      isLoading={isLoading}
    />
  );
}
