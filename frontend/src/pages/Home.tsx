import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  FiArrowUpRight,
  FiCalendar,
  FiHeart,
  FiList,
  FiPlayCircle,
} from "react-icons/fi";
import { accountContext, listsContext, type ListsContext } from "../types/context";
import { useList } from "../hooks/useList";
import { useAnimes } from "../hooks/useAnimes";
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response";
import ListCard from "../components/ListCard";
import AnimeEditionForm from "../components/AnimeEditionForm";
import Loading from "../components/Loading";
import EmptyState from "../components/ui/EmptyState";
import type { EditAnimeData } from "../types/api/Request";

export default function Home() {
  const navigate = useNavigate();
  const { accountId, account } = useContext(accountContext);

  const { lists, fetchLists, editAnimeInList } = useList(accountId);
  const { animes, fetchAnimes } = useAnimes();

  const [editAnimeForm, setEditAnimeForm] = useState<{
    view: boolean;
    info?: AnimeResponse;
  }>({ view: false });

  const sendEditedAnime = async (id: string, edited: EditAnimeData) => {
    const result = await editAnimeInList(id, edited);
    if (result) await fetchAnimes();
    return result;
  };

  const setupEditForm = (view: boolean, initData?: AnimeResponse) => {
    setEditAnimeForm({ view, info: initData });
  };

  const listsContextValue: ListsContext = {
    setAddList: () => {},
    setRemoveAnimeFromList: () => {},
    setEditForm: (view, anime) => setEditAnimeForm({ view, info: anime }),
    setAddAnimeToList: () => {},
    setDeleteList: () => {},
    setEditedListData: () => {},
  };

  useEffect(() => {
    if (!accountId) return;
    void fetchLists();
    void fetchAnimes();
  }, [accountId, fetchLists, fetchAnimes]);

  const favoriteList = useMemo<AnimeListResponse | undefined>(() => {
    const fromApi = lists.find((list) => list.name.toLowerCase() === "favoritos");
    if (fromApi) return fromApi;
    if (!animes) return undefined;

    return {
      id: "favorites",
      name: "Favoritos",
      ownerId: accountId,
      animes: animes.filter((anime) => anime.favorite),
    };
  }, [lists, animes, accountId]);

  const watchingList = useMemo<AnimeListResponse | undefined>(() => {
    if (!animes) return undefined;

    return {
      id: "watching",
      name: "Assistindo",
      ownerId: accountId,
      animes: animes.filter((anime) => !anime.needToWatch && !anime.watched),
    };
  }, [animes, accountId]);

  const startList = useMemo<AnimeListResponse | undefined>(() => {
    if (!animes) return undefined;

    return {
      id: "start",
      name: "Começar / Rever",
      ownerId: accountId,
      animes: animes.filter((anime) => anime.needToWatch),
    };
  }, [animes, accountId]);

  const stats = useMemo(
    () => [
      {
        label: "Na coleção",
        value: animes?.length ?? 0,
        icon: FiList,
        color: "text-sky-300",
        bg: "bg-sky-500/10",
      },
      {
        label: "Assistindo",
        value: watchingList?.animes.length ?? 0,
        icon: FiPlayCircle,
        color: "text-crimson-300",
        bg: "bg-crimson-500/10",
      },
      {
        label: "Favoritos",
        value: favoriteList?.animes.length ?? 0,
        icon: FiHeart,
        color: "text-amber-300",
        bg: "bg-amber-500/10",
      },
      {
        label: "Listas",
        value: lists.length,
        icon: FiCalendar,
        color: "text-emerald-300",
        bg: "bg-emerald-500/10",
      },
    ],
    [animes, watchingList, favoriteList, lists.length],
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  if (!animes) {
    return <Loading label="Montando sua estante..." />;
  }

  return (
    <listsContext.Provider value={listsContextValue}>
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-lead-700/80 bg-gradient-to-br from-lead-900 via-lead-900 to-crimson-950/40 p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)] sm:p-8">
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-crimson-500/10 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-crimson-400 uppercase">
                Sua estante
              </p>
              <h1 className="mt-2 font-display text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
                {greeting}, <span className="text-crimson-400">{account?.nick ?? "otaku"}</span>!
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-lead-300">
                Você tem <span className="font-semibold text-white">{animes.length}</span>{" "}
                animes na coleção e{" "}
                <span className="font-semibold text-white">
                  {watchingList?.animes.length ?? 0}
                </span>{" "}
                em andamento. Bora atualizar o progresso?
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigate("/anime")}
                className="btn-primary"
              >
                Ver coleção
                <FiArrowUpRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/list")}
                className="btn-secondary"
              >
                Gerenciar listas
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="panel-soft flex items-center gap-3.5 p-4">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}
              >
                <Icon size={19} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl leading-none font-bold text-white">{value}</p>
                <p className="mt-1 truncate text-[11px] font-medium tracking-wide text-lead-400 uppercase">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </section>

        {animes.length === 0 ? (
          <EmptyState
            icon={FiList}
            title="Sua estante ainda está vazia"
            description="Adicione seu primeiro anime para começar a acompanhar temporadas, episódios e lançamentos."
            action={
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate("/anime")}
              >
                Adicionar anime
              </button>
            }
          />
        ) : (
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  Visão rápida
                </h2>
                <p className="mt-1 text-sm text-lead-400">
                  Suas listas mais importantes em um só lugar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/list")}
                className="hidden cursor-pointer text-sm font-semibold text-crimson-300 transition-colors hover:text-crimson-200 sm:block"
              >
                Ver todas as listas
              </button>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {favoriteList && <ListCard listData={favoriteList} alwaysActive />}
              {watchingList && <ListCard listData={watchingList} alwaysActive />}
              {startList && <ListCard listData={startList} alwaysActive />}
            </div>
          </section>
        )}
      </div>

      {editAnimeForm.view && editAnimeForm.info && (
        <AnimeEditionForm
          animeData={editAnimeForm.info}
          setEditForm={setupEditForm}
          setEditAnime={sendEditedAnime}
        />
      )}
    </listsContext.Provider>
  );
}
