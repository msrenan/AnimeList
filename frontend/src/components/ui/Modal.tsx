import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const SIZES = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
} as const;

type ModalProps = {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: keyof typeof SIZES;
  bodyClassName?: string;
};

export default function Modal({
  title,
  subtitle,
  onClose,
  children,
  footer,
  size = "lg",
  bodyClassName = "",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal-overlay animate-fade-in"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal-panel animate-pop ${SIZES[size]}`}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="min-w-0">
            {title && (
              <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
            )}
            {subtitle && <p className="mt-1 text-sm text-lead-300">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="btn-icon -mt-1 shrink-0"
            onClick={onClose}
            aria-label="Fechar"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        <div className={`max-h-[70vh] overflow-y-auto px-6 py-5 ${bodyClassName}`}>
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-lead-700/70 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
