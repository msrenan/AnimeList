import { FiCalendar, FiLayers, FiPlayCircle, FiX } from "react-icons/fi";
import type { AnimeResponse } from "../types/api/Response";
import {
  formatReleaseDay,
  getAnimeStatus,
  getTrackingStatus,
  toneClass,
} from "../utils/anime";

type AnimeInfoCardProps = {
  animeData: AnimeResponse;
  onClose?: () => void;
};

export default function AnimeInfoCard({ animeData, onClose }: AnimeInfoCardProps) {
  const status = getAnimeStatus(animeData);
  const tracking = getTrackingStatus(animeData);

  return (
    <div className="panel w-[min(90vw,340px)] animate-pop p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${toneClass(
              status.tone,
            )}`}
          >
            {status.label}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${toneClass(
              tracking.tone,
            )}`}
          >
            {tracking.label}
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn-icon -mt-1 -mr-1 h-8 w-8 shrink-0"
            aria-label="Fechar detalhes"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-white">
        {animeData.title}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5">
          <p className="text-[10px] font-semibold tracking-wide text-lead-400 uppercase">
            Temporada
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-lead-100">
            <FiLayers size={14} className="text-crimson-400" />
            {animeData.season}
          </p>
        </div>
        <div className="rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5">
          <p className="text-[10px] font-semibold tracking-wide text-lead-400 uppercase">
            Episódio
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-lead-100">
            <FiPlayCircle size={14} className="text-crimson-400" />
            {animeData.episode}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-lead-700/70 bg-lead-950/50 px-3 py-2.5 text-sm text-lead-200">
        <FiCalendar size={15} className="shrink-0 text-crimson-400" />
        Atualiza na <span className="font-semibold text-white">{formatReleaseDay(animeData.releaseDay)}</span>
      </div>

      {animeData.favorite && (
        <p className="mt-3 text-center text-[11px] font-semibold tracking-wide text-amber-300/90 uppercase">
          ★ Um dos seus favoritos
        </p>
      )}
    </div>
  );
}
