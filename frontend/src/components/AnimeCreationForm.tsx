import { useContext, useMemo, useState } from "react";
import { FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "./ui/Modal";
import ReleaseDayDropdown from "./ReleaseDayDropdown";
import AnimeStatusRadio from "./AnimeStatusRadio";
import AnimeWatchRadio from "./AnimeWatchRadio";
import { ReleaseDay } from "../types/enum";
import {
  animeContext,
  animeFormContext,
  type AnimeFormContext,
} from "../types/context";
import type { AnimeData } from "../types/api/Request";

function parseNonNegative(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

export default function AnimeCreationForm() {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [releaseDay, setReleaseDay] = useState<ReleaseDay>(ReleaseDay.Domingo);
  const [finished, setFinished] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [ntw, setNTW] = useState(false);
  const [watched, setWatched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const { setAnimeForm, setAddAnime } = useContext(animeContext);

  const formContext = useMemo<AnimeFormContext>(
    () => ({
      setReleaseDay: (day: ReleaseDay) => setReleaseDay(day),
      setStatus: (status: string) => {
        if (status === "finalizado") {
          setFinished(true);
          setWaiting(false);
        } else if (status === "ongoing") {
          setFinished(false);
          setWaiting(false);
        } else {
          setFinished(false);
          setWaiting(true);
        }
      },
      setTracking: (tracking: string) => {
        if (tracking === "assistindo") {
          setNTW(false);
          setWatched(false);
        } else if (tracking === "comecar") {
          setNTW(true);
          setWatched(false);
        } else if (tracking === "rever") {
          setNTW(true);
          setWatched(true);
        } else {
          setNTW(false);
          setWatched(true);
        }
      },
    }),
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
      toast.error("Informe o título do anime.");
      return;
    }

    const newAnime: AnimeData = {
      title: title.trim(),
      season: parseNonNegative(season),
      episode: parseNonNegative(episode),
      releaseDay,
      isFinished: finished,
      favorite: isFavorite,
      needToWatch: ntw,
      waitingForNextSeason: waiting,
      watched,
    };

    setSaving(true);
    const result = await setAddAnime(newAnime);
    setSaving(false);

    if (result !== null) setAnimeForm(false);
  };

  return (
    <animeFormContext.Provider value={formContext}>
      <Modal
        title="Adicionar anime"
        subtitle="Preencha os detalhes para começar a acompanhar."
        onClose={() => setAnimeForm(false)}
        footer={
          <>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setAnimeForm(false)}
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="anime-creation-form"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? "Adicionando..." : "Adicionar anime"}
            </button>
          </>
        }
      >
        <form id="anime-creation-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="anime-title" className="field-label">
              Título do anime
            </label>
            <input
              id="anime-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
              placeholder="Ex.: Frieren: Beyond Journey's End"
              maxLength={255}
              className={`input ${titleError ? "border-red-500/70" : ""}`}
              autoFocus
            />
            {titleError && (
              <p className="mt-1.5 text-xs text-red-300">O título é obrigatório.</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="anime-season" className="field-label">
                Temporada
              </label>
              <input
                id="anime-season"
                type="number"
                min={0}
                value={season}
                onChange={(event) => setSeason(event.target.value)}
                placeholder="0"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="anime-episode" className="field-label">
                Episódio atual
              </label>
              <input
                id="anime-episode"
                type="number"
                min={0}
                value={episode}
                onChange={(event) => setEpisode(event.target.value)}
                placeholder="0"
                className="input"
              />
            </div>
            <div>
              <label className="field-label">Atualiza em</label>
              <ReleaseDayDropdown initialValue={releaseDay} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFavorite((current) => !current)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
              isFavorite
                ? "border-amber-500/40 bg-amber-500/10"
                : "border-lead-700 bg-lead-950/40 hover:border-lead-500"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isFavorite ? "bg-amber-500/20 text-amber-300" : "bg-lead-800 text-lead-400"
              }`}
            >
              <FiStar size={18} fill={isFavorite ? "currentColor" : "none"} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-lead-100">
                Marcar como favorito
              </span>
              <span className="block text-xs text-lead-400">
                Adiciona automaticamente à lista Favoritos.
              </span>
            </span>
            <span
              className={`h-5 w-9 rounded-full p-0.5 transition-colors ${
                isFavorite ? "bg-amber-500" : "bg-lead-600"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                  isFavorite ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </span>
          </button>

          <div className="space-y-3">
            <div>
              <p className="mb-2 text-sm font-semibold text-lead-100">Status do anime</p>
              <AnimeStatusRadio />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-lead-100">
                Status de acompanhamento
              </p>
              <AnimeWatchRadio />
            </div>
          </div>
        </form>
      </Modal>
    </animeFormContext.Provider>
  );
}
