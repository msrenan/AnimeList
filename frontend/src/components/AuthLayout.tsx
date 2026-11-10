import type { ReactNode } from "react";
import { FiCalendar, FiList, FiStar, FiTrendingUp } from "react-icons/fi";
import { MdLocalMovies } from "react-icons/md";

const FEATURES = [
  {
    icon: FiList,
    title: "Listas personalizadas",
    description: "Separe seus animes por humor, gênero ou maratona.",
  },
  {
    icon: FiCalendar,
    title: "Acompanhe os lançamentos",
    description: "Saiba em qual dia da semana cada anime atualiza.",
  },
  {
    icon: FiStar,
    title: "Favoritos em destaque",
    description: "Tenha seus títulos preferidos sempre à mão.",
  },
  {
    icon: FiTrendingUp,
    title: "Progresso organizado",
    description: "Temporada, episódio e status de cada anime.",
  },
];

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-crimson-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[520px] w-[520px] rounded-full bg-crimson-800/10 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-lead-700/80 bg-lead-900/70 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:grid-cols-[1.05fr_1fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-lead-700/70 bg-gradient-to-br from-lead-900 via-lead-900 to-crimson-950/40 p-10 lg:flex">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-crimson-500 to-crimson-800 text-white shadow-[0_12px_32px_-12px_rgba(225,29,72,0.9)]">
                <MdLocalMovies size={22} />
              </span>
              <span className="font-display text-xl font-bold text-white">
                Anime<span className="text-crimson-400">List</span>
              </span>
            </div>

            <h1 className="mt-14 font-display text-4xl leading-[1.15] font-bold tracking-tight text-white text-balance">
              Sua coleção de animes,{" "}
              <span className="bg-gradient-to-r from-crimson-300 to-crimson-500 bg-clip-text text-transparent">
                finalmente organizada.
              </span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-lead-300">
              Acompanhe temporadas, episódios e lançamentos em um só lugar — sem
              planilhas e sem perder o fio da meada.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson-600/15 text-crimson-300">
                  <Icon size={16} />
                </span>
                <p className="mt-2.5 text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-lead-400">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute -right-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-crimson-500/10" />
          <div className="pointer-events-none absolute -right-16 top-1/2 h-52 w-52 -translate-y-1/2 animate-float rounded-full border border-crimson-500/10" />
        </aside>

        <main className="relative bg-lead-900/80 px-5 py-8 sm:px-9 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
