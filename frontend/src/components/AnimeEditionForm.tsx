import { useMemo, useState } from "react";
import { FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "./ui/Modal";
import ReleaseDayDropdown from "./ReleaseDayDropdown";
import AnimeStatusRadio from "./AnimeStatusRadio";
import AnimeWatchRadio from "./AnimeWatchRadio";
import { ReleaseDay } from "../types/enum";
import { animeFormContext, type AnimeFormContext } from "../types/context";
import type { AnimeData, EditAnimeData } from "../types/api/Request";
import type { AnimeResponse } from "../types/api/Response";

type AnimeEditionFormProps = {
  animeData: AnimeResponse;
  setEditForm: (view: boolean, animeData?: AnimeResponse) => void;
  setEditAnime: (id: string, editedAnime: EditAnimeData) => Promise<unknown> | unknown;
};

function parseNonNegative(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

export default function AnimeEditionForm({
  animeData,
  setEditForm,
  setEditAnime,
}: AnimeEditionFormProps) {
  const [id] = useState(animeData.id);
  const [title, setTitle] = useState(animeData.title);
  const [season, setSeason] = useState(animeData.season.toString());
  const [episode, setEpisode] = useState(animeData.episode.toString());
  const [isFavorite, setIsFavorite] = useState(animeData.favorite);
  const [releaseDay, setReleaseDay] = useState<ReleaseDay>(animeData.releaseDay);
  const [finished, setFinished] = useState(animeData.isFinished);
  const [waiting, setWaiting] = useState(animeData.waitingForNextSeason);
  const [ntw, setNTW] = useState(animeData.needToWatch);
  const [watched, setWatched] = useState(animeData.watched);
  const [saving, setSaving] = useState(false);
  const [titleError, setTitleError] = useState(false);

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

    const editedAnime: AnimeData = {
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
    const result = await Promise.resolve(setEditAnime(id, editedAnime));
    setSaving(false);

    if (result !== null) setEditForm(false);
  };

  return (
    <animeFormContext.Provider value={formContext}>
      <Modal
        title="Editar anime"
        subtitle={animeData.title}
        onClose={() => setEditForm(false)}
        footer={
          <>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEditForm(false)}
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="anime-edition-form"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </>
        }
      >
        <form id="anime-edition-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="edit-anime-title" className="field-label">
              Título do anime
            </label>
            <input
              id="edit-anime-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
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
              <label htmlFor="edit-anime-season" className="field-label">
                Temporada
              </label>
              <input
                id="edit-anime-season"
                type="number"
                min={0}
                value={season}
                onChange={(event) => setSeason(event.target.value)}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="edit-anime-episode" className="field-label">
                Episódio atual
              </label>
              <input
                id="edit-anime-episode"
                type="number"
                min={0}
                value={episode}
                onChange={(event) => setEpisode(event.target.value)}
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
                Mantém o anime na lista Favoritos.
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
              <AnimeStatusRadio isFinished={finished} waiting={waiting} />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-lead-100">
                Status de acompanhamento
              </p>
              <AnimeWatchRadio ntw={ntw} watched={watched} />
            </div>
          </div>
        </form>
      </Modal>
    </animeFormContext.Provider>
  );
}
