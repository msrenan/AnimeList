import { useContext, useState } from "react";
import { animeFormContext } from "../types/context";

type AnimeWatchRadioProps = {
  ntw?: boolean;
  watched?: boolean;
};

const OPTIONS = [
  { value: "assistindo", label: "Assistindo" },
  { value: "comecar", label: "Começar" },
  { value: "rever", label: "Rever" },
  { value: "assistido", label: "Assistido" },
];

export default function AnimeWatchRadio({ ntw, watched }: AnimeWatchRadioProps) {
  const [status, setStatus] = useState(() => {
    if (!ntw && !watched) return "assistindo";
    if (ntw && !watched) return "comecar";
    if (ntw && watched) return "rever";
    if (!ntw && watched) return "assistido";
    return "";
  });

  const { setTracking } = useContext(animeFormContext);

  const choose = (value: string) => {
    setStatus(value);
    setTracking(value);
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {OPTIONS.map((option) => {
        const selected = status === option.value;

        return (
          <label
            key={option.value}
            className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
              selected
                ? "border-crimson-500/60 bg-crimson-600/10 text-crimson-200"
                : "border-lead-700 bg-lead-950/40 text-lead-300 hover:border-lead-500 hover:text-white"
            }`}
          >
            <input
              type="radio"
              name="animeWatchStatus"
              value={option.value}
              checked={selected}
              onChange={() => choose(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
