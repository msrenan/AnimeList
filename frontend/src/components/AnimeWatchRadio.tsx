import { useContext, useEffect, useState } from "react";
import { animeFormContext } from "../types/context";

type props = {
  ntw?: boolean,
  watched?: boolean
}

export default function AnimeWatchRadio(data: props) {
  // O estado guarda o 'value' da opção selecionada
  const [status, setStatus] = useState(() => {
    if (data.ntw != null && data.watched != null) {
      if (!data.ntw && !data.watched) {
          return 'assistindo'
      } else if (data.ntw && !data.watched) {
          return 'comecar'
      } else if (data.ntw && data.watched) {
          return 'rever'
      } else {
          return 'assistido'
      }
  } else {
    return ""
  }
  });

  const { setTracking } = useContext(animeFormContext);

  useEffect(() => {
    const superTracking = () => {
      setTracking(status);
    }

    superTracking();
  }, [status]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 p-6 rounded-lg w-full">
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeWatchStatus" // O 'name' igual é o que agrupa os botões!
          value="assistindo"
          checked={status === "assistindo"}
          onChange={(e) => setStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          Assistindo
        </span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeWatchStatus"
          value="comecar"
          checked={status === "comecar"}
          onChange={(e) => setStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          Começar
        </span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeWatchStatus"
          value="rever"
          checked={status === "rever"}
          onChange={(e) => setStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          Rever
        </span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name="animeWatchStatus"
          value="assistido"
          checked={status === "assistido"}
          onChange={(e) => setStatus(e.target.value)}
          className="radioButton"
        />
        <span className="text-lead-200 group-hover:text-white transition-colors">
          Assistido
        </span>
      </label>
    </div>
  );
}