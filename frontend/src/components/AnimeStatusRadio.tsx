import { useContext, useState } from "react";
import { animeFormContext } from "../types/context";

type AnimeStatusRadioProps = {
  isFinished?: boolean;
  waiting?: boolean;
};

const OPTIONS = [
  {
    value: "finalizado",
    label: "Finalizado",
    description: "A obra já foi concluída.",
  },
  {
    value: "aguardando",
    label: "Aguardando nova temporada",
    description: "Sem episódios no momento.",
  },
  {
    value: "ongoing",
    label: "Em exibição",
    description: "Ainda está sendo lançado.",
  },
];

export default function AnimeStatusRadio({ isFinished, waiting }: AnimeStatusRadioProps) {
  const [status, setAnimeStatus] = useState(() => {
    if (isFinished === undefined && waiting === undefined) return "ongoing";
    if (isFinished && !waiting) return "finalizado";
    if (!isFinished && waiting) return "aguardando";
    if (isFinished === false && waiting === false) return "ongoing";
    return "aguardando";
  });

  const { setStatus } = useContext(animeFormContext);

  const choose = (value: string) => {
    setAnimeStatus(value);
    setStatus(value);
  };

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {OPTIONS.map((option) => {
        const selected = status === option.value;

        return (
          <label
            key={option.value}
            className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
              selected
                ? "border-crimson-500/60 bg-crimson-600/10"
                : "border-lead-700 bg-lead-950/40 hover:border-lead-500"
            }`}
          >
            <input
              type="radio"
              name="animeStatus"
              value={option.value}
              checked={selected}
              onChange={() => choose(option.value)}
              className="sr-only"
            />
            <span className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-crimson-500" : "border-lead-500"
                }`}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-crimson-500" />}
              </span>
              <span>
                <span className="block text-sm font-semibold text-lead-100">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-lead-400">
                  {option.description}
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
