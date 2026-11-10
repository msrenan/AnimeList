import type { AnimeResponse } from "../types/api/Response";

export type StatusTone = "success" | "info" | "warning" | "danger" | "muted";

export function getAnimeStatus(anime: AnimeResponse): { label: string; tone: StatusTone } {
  if (anime.isFinished && !anime.waitingForNextSeason) {
    return { label: "Finalizado", tone: "success" };
  }

  if (!anime.isFinished && anime.waitingForNextSeason) {
    return { label: `Aguardando T${anime.season + 1}`, tone: "warning" };
  }

  return { label: "Em exibição", tone: "info" };
}

export function getTrackingStatus(anime: AnimeResponse): { label: string; tone: StatusTone } {
  if (anime.needToWatch && !anime.watched) {
    return { label: "Começar", tone: "danger" };
  }

  if (!anime.needToWatch && anime.watched) {
    return { label: "Assistido", tone: "success" };
  }

  if (anime.needToWatch && anime.watched) {
    return { label: "Rever", tone: "warning" };
  }

  return { label: "Assistindo", tone: "info" };
}

const DAY_LABELS: Record<string, string> = {
  SEGUNDA: "Segunda",
  TERÇA: "Terça",
  QUARTA: "Quarta",
  QUINTA: "Quinta",
  SEXTA: "Sexta",
  SABADO: "Sábado",
  DOMINGO: "Domingo",
};

export function formatReleaseDay(day?: string | null) {
  if (!day) return "Não definido";
  return DAY_LABELS[day] ?? day;
}

const GRADIENTS = [
  "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)",
  "linear-gradient(135deg, #f97316 0%, #be123c 100%)",
  "linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)",
  "linear-gradient(135deg, #10b981 0%, #0e7490 100%)",
  "linear-gradient(135deg, #a855f7 0%, #db2777 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
];

export function gradientFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997;
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export function initials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  info: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  danger: "border-crimson-500/25 bg-crimson-500/10 text-crimson-300",
  muted: "border-lead-600/60 bg-lead-800/60 text-lead-300",
};

export function toneClass(tone: StatusTone) {
  return TONE_CLASSES[tone];
}
