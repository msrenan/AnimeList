import type { IconType } from "react-icons";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: IconType;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-lead-700 bg-lead-900/40 px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson-600/10 text-crimson-400">
        <Icon size={30} />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-lead-300">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
