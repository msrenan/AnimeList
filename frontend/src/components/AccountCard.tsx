import { useContext, useEffect, useRef, useState } from "react";
import { FiEdit2, FiMail, FiTrash2, FiX } from "react-icons/fi";
import { accountContext } from "../types/context";
import { useAccount } from "../hooks/useAccount";
import { initials } from "../utils/anime";
import DeleteAccountModal from "./DeleteAccountModal";

type AccountCardProps = {
  onClose: () => void;
};

export default function AccountCard({ onClose }: AccountCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { account, logout, refreshAccount } = useContext(accountContext);
  const { editAccount } = useAccount(account?.id ?? "");

  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState(account?.nick ?? "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const cancelEditRef = useRef(false);

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (showDeleteModal) return;
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !showDeleteModal) onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, showDeleteModal]);

  const saveNickname = async () => {
    if (savingRef.current) return;

    if (cancelEditRef.current) {
      cancelEditRef.current = false;
      setNickname(account?.nick ?? "");
      return;
    }

    const trimmed = nickname.trim();
    if (!trimmed || trimmed === account?.nick) {
      setNickname(account?.nick ?? "");
      setEditMode(false);
      return;
    }

    savingRef.current = true;
    setSaving(true);
    const updated = await editAccount({ nickname: trimmed });
    setSaving(false);
    savingRef.current = false;

    if (updated) {
      setEditMode(false);
      refreshAccount();
    }
  };

  const handleDelete = async () => {
    logout();
    setShowDeleteModal(false);
    onClose();
  };

  return (
    <>
      <div
        ref={cardRef}
        className="panel fixed top-[76px] right-4 z-50 w-[min(92vw,360px)] animate-pop p-5 sm:right-6"
      >
        {account ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-crimson-500 to-crimson-800 text-base font-bold text-white shadow-[0_10px_28px_-12px_rgba(225,29,72,0.9)]">
                  {initials(account.nick)}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-lead-400 uppercase">
                    Sua conta
                  </p>
                  {editMode ? (
                    <input
                      ref={inputRef}
                      value={nickname}
                      onChange={(event) => setNickname(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") void saveNickname();
                        if (event.key === "Escape") {
                          cancelEditRef.current = true;
                          setNickname(account.nick);
                          setEditMode(false);
                        }
                      }}
                      onBlur={() => void saveNickname()}
                      disabled={saving}
                      maxLength={32}
                      className="mt-1 w-full rounded-lg border border-lead-600 bg-lead-950 px-2 py-1 font-display text-base font-semibold text-white outline-none focus:border-crimson-500"
                    />
                  ) : (
                    <p className="truncate font-display text-base font-semibold text-white">
                      {account.nick}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-icon -mt-1 -mr-1 h-8 w-8"
                aria-label="Fechar perfil"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5 text-sm text-lead-300">
              <FiMail size={16} className="shrink-0 text-lead-400" />
              <span className="truncate">{account.email}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="btn-secondary text-xs"
                onClick={() => {
                  cancelEditRef.current = false;
                  setNickname(account.nick);
                  setEditMode(true);
                }}
              >
                <FiEdit2 size={15} />
                Editar nick
              </button>
              <button
                type="button"
                className="btn text-xs text-red-300 hover:bg-red-500/10"
                onClick={() => setShowDeleteModal(true)}
              >
                <FiTrash2 size={15} />
                Excluir conta
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] text-lead-500">
              Sessão protegida por token JWT
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <div className="skeleton h-12 w-12 rounded-2xl" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-4 w-full" />
          </div>
        )}
      </div>

      {showDeleteModal && account && (
        <DeleteAccountModal
          account={account}
          setView={setShowDeleteModal}
          onDeleted={handleDelete}
        />
      )}
    </>
  );
}
