import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";

type ConfirmModalProps = {
  title: string;
  description: string;
  details?: string[];
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export default function ConfirmModal({
  title,
  description,
  details,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onClose,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      size="sm"
      title={title}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Removendo..." : confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <FiAlertTriangle size={22} />
        </div>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-lead-200">{description}</p>
          {details && details.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {details.map((detail) => (
                <span
                  key={detail}
                  className="rounded-lg border border-lead-700 bg-lead-950/60 px-3 py-1.5 text-xs text-lead-300"
                >
                  {detail}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-lead-400">Esta ação é irreversível.</p>
        </div>
      </div>
    </Modal>
  );
}
