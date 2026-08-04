import { useContext, useEffect, useState } from "react";
import { animeFormContext } from "../types/context";

type props = {
  isFinished?: boolean,
  waiting?: boolean
}

export default function AnimeStatusRadio(data: props) {
  // O estado guarda o 'value' da opção selecionada
  const [status, setAnimeStatus] = useState(() => {
    if (data.isFinished != null && data.waiting != null) {
      if (data.isFinished && !data.waiting ) {
          return 'finalizado'
      } else if (!data.isFinished && !data.waiting) {
          return 'ongoing'
      } else {
          return 'aguardando'
      }
    } else {
      return ";"
    }
  });

  const { setStatus } = useContext(animeFormContext);

  useEffect(() => {
    const superStatus = () => {
      setStatus(status);
    }

    superStatus();
  }, [status]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 p-6 rounded-lg w-full">
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeStatus" // O 'name' igual é o que agrupa os botões!
          value="finalizado"
          checked={status === "finalizado"}
          onChange={(e) => setAnimeStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          Finalizado
        </span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeStatus"
          value="aguardando"
          checked={status === "aguardando"}
          onChange={(e) => setAnimeStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          Aguardando nova temporada
        </span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeStatus"
          value="ongoing"
          checked={status === "ongoing"}
          onChange={(e) => setAnimeStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          On Going
        </span>
      </label>
    </div>
  );
}