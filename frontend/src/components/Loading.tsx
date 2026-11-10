import { LuLoaderCircle } from "react-icons/lu";

type LoadingProps = {
  size?: number;
  label?: string;
  compact?: boolean;
};

export default function Loading({
  size = 28,
  label = "Carregando...",
  compact = false,
}: LoadingProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 text-center ${
        compact ? "py-6" : "py-20"
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex items-center justify-center">
        <span
          className="absolute rounded-full border border-crimson-500/20"
          style={{ width: size * 1.9, height: size * 1.9 }}
        />
        <LuLoaderCircle
          size={size}
          className="animate-spin text-crimson-500"
          style={{ animationDuration: "0.8s" }}
        />
      </span>
      <p className="text-xs font-medium tracking-wide text-lead-400 uppercase">{label}</p>
    </div>
  );
}
