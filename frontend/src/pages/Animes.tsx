import { useContext, useEffect, useMemo, useState } from "react";
import { FiFilm, FiPlus, FiStar, FiCheckCircle, FiClock, FiPlayCircle } from "react-icons/fi";
import {
  accountContext,
  animeContext,
  searchContext,
  type AnimeContext,
  type SearchContext,
} from "../types/context";
import AnimeCard from "../components/AnimeCard";
import { useAnimes } from "../hooks/useAnimes";
import { useList } from "../hooks/useList";
import type { AnimeResponse } from "../types/api/Response";
import type { AnimeData, EditAnimeData } from "../types/api/Request";
import { FilterOptions } from "../types/enum";
import SearchBar from "../components/SearchBar";
import AnimeCreationForm from "../components/AnimeCreationForm";
import AnimeEditionForm from "../components/AnimeEditionForm";
import DeleteAnimeModal from "../components/DeleteAnimeModal";
import EmptyState from "../components/ui/EmptyState";

const FILTERS: {
  label: string;
  value?: FilterOptions;
  icon: typeof FiStar;
}[] = [
  { label: "Todos", icon: FiFilm },
  { label: "Favoritos", value: FilterOptions.Favoritos, icon: FiStar },
  { label: "Assistindo", value: FilterOptions.Assistindo, icon: FiPlayCircle },
  { label: "Assistidos", value: FilterOptions.Assistidos, icon: FiCheckCircle },
  { label: "Começar", value: FilterOptions.Comecar, icon: FiClock },
];

export default function Animes() {
  const { accountId } = useContext(accountContext);
  const {
    animes,
    isLoading,
    fetchAnimes,
    addAnime,
    editAnime,
    deleteAnime,
    animeSearch,
    animeFilter,
  } = useAnimes();
  const { addAnimeToList } = useList(accountId);

  const [showAnimeCreation, setShowAnimeCreation] = useState(false);
  const [editAnimeView, setEditAnimeView] = useState(false);
  const [editAnimeInfo, setEditAnimeInfo] = useState<AnimeResponse>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAnimeInfo, setDeleteAnimeInfo] = useState<AnimeResponse>();
  const [activeFilter, setActiveFilter] = useState<FilterOptions | undefined>();
  const [searchKey, setSearchKey] = useState(0);

  useEffect(() => {
    void fetchAnimes();
  }, [fetchAnimes]);

  const animeContextValue = useMemo<AnimeContext>(
    () => ({
      setAnimeForm: setShowAnimeCreation,
      setAddAnime: async (newAnime: AnimeData) => {
        const result = await addAnime(newAnime);
        if (result && activeFilter) void animeFilter(activeFilter);
        return result;
      },
      setDirty: async (id: string, changedData: EditAnimeData) => {
        const result = await editAnime(id, changedData);
        if (result && activeFilter) void animeFilter(activeFilter);
        return result;
      },
      setShowDeleteModal: (view, anime) => {
        setShowDeleteModal(view);
        if (anime) setDeleteAnimeInfo(anime);
      },
      setDeleteAnime: (confirm, id) => {
        setShowDeleteModal(false);
        if (confirm && id) void deleteAnime(id);
      },
      setAddAnimeToList: (animeId, listId) => {
        void addAnimeToList(listId, animeId);
      },
      setEditForm: (view, anime) => {
        setEditAnimeView(view);
        if (anime) setEditAnimeInfo(anime);
      },
    }),
    [addAnime, editAnime, deleteAnime, addAnimeToList, activeFilter, animeFilter],
  );

  const searchContextValue = useMemo<SearchContext>(
    () => ({
      setQuery: (query) => {
        if (query.trim()) {
          setActiveFilter(undefined);
          void animeSearch(query);
        } else if (activeFilter) {
          void animeFilter(activeFilter);
        } else {
          void fetchAnimes();
        }
      },
    }),
    [activeFilter, animeSearch, animeFilter, fetchAnimes],
  );

  const changeFilter = (filter?: FilterOptions) => {
    setActiveFilter(filter);
    setSearchKey((current) => current + 1);
    void animeFilter(filter);
  };

  const sendEditedAnime = async (id: string, edited: EditAnimeData) => {
    const result = await editAnime(id, edited);
    if (result && activeFilter) await animeFilter(activeFilter);
    return result;
  };

  const total = animes?.length ?? 0;

  return (
    <animeContext.Provider value={animeContextValue}>
      <searchContext.Provider value={searchContextValue}>
        <div className="space-y-5">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-crimson-400 uppercase">
                Coleção
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
                Seus animes
              </h1>
              <p className="mt-2 text-sm text-lead-400">
                {isLoading
                  ? "Atualizando sua coleção..."
                  : `${total} anime${total === 1 ? "" : "s"} na sua estante.`}
              </p>
            </div>

            <button
              type="button"
              className="btn-primary w-full sm:w-auto"
              onClick={() => setShowAnimeCreation(true)}
            >
              <FiPlus size={17} />
              Novo anime
            </button>
          </header>

          <div className="panel space-y-4 p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <SearchBar key={searchKey} />
              <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map(({ label, value, icon: Icon }) => {
                  const active = activeFilter === value;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => changeFilter(value)}
                      className={`chip ${active ? "chip-active" : ""}`}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {animes === undefined ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton h-[270px] rounded-2xl border border-lead-700/40"
                />
              ))}
            </div>
          ) : animes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {animes.map((anime) => (
                <AnimeCard key={anime.id} animeData={anime} Ikey={anime.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiFilm}
              title="Nenhum anime encontrado"
              description={
                activeFilter
                  ? "Não há animes com esse filtro. Tente outro status ou limpe a busca."
                  : "Sua coleção está vazia. Adicione um anime para começar."
              }
              action={
                activeFilter ? (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => changeFilter(undefined)}
                  >
                    Limpar filtro
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setShowAnimeCreation(true)}
                  >
                    <FiPlus size={16} />
                    Adicionar anime
                  </button>
                )
              }
            />
          )}
        </div>

        {showAnimeCreation && <AnimeCreationForm />}

        {editAnimeView && editAnimeInfo && (
          <AnimeEditionForm
            animeData={editAnimeInfo}
            setEditForm={(view, anime) => {
              setEditAnimeView(view);
              if (anime) setEditAnimeInfo(anime);
            }}
            setEditAnime={sendEditedAnime}
          />
        )}

        {showDeleteModal && deleteAnimeInfo && (
          <DeleteAnimeModal anime={deleteAnimeInfo} />
        )}
      </searchContext.Provider>
    </animeContext.Provider>
  );
}
