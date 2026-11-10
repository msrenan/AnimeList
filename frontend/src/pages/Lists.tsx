import { useContext, useEffect, useMemo, useState } from "react";
import { FiList, FiPlus } from "react-icons/fi";
import {
  accountContext,
  listsContext,
  searchContext,
  type ListsContext,
  type SearchContext,
} from "../types/context";
import { useList } from "../hooks/useList";
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response";
import type {
  AnimeListData,
  EditAnimeData,
  EditAnimeListData,
} from "../types/api/Request";
import ListCard from "../components/ListCard";
import ListCreationForm from "../components/ListCreationForm";
import AnimeEditionForm from "../components/AnimeEditionForm";
import DeleteListModal from "../components/DeleteListModal";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/ui/EmptyState";

export default function Lists() {
  const { accountId } = useContext(accountContext);

  const {
    lists,
    isLoading,
    searchLists,
    deleteList,
    fetchLists,
    editList,
    createList,
    removeAnimeOfList,
    editAnimeInList,
    addAnimeToList,
  } = useList(accountId);

  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [editAnimeForm, setEditAnimeForm] = useState<{
    view: boolean;
    info?: AnimeResponse;
  }>({ view: false });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<AnimeListResponse>();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!accountId) return;
    void fetchLists().then(() => setHasLoaded(true));
  }, [accountId, fetchLists]);

  const searchContextValue = useMemo<SearchContext>(
    () => ({
      setQuery: (query) => {
        void searchLists(query);
      },
    }),
    [searchLists],
  );

  const listsContextValue = useMemo<ListsContext>(
    () => ({
      setAddList: (view, list?: AnimeListData) => {
        setShowCreateListForm(view);
        if (list) void createList(list);
      },
      setRemoveAnimeFromList: (listId, animeId) => {
        void removeAnimeOfList(listId, animeId);
      },
      setEditForm: (view, anime) => {
        setEditAnimeForm({ view, info: anime });
      },
      setAddAnimeToList: (animeId, listId) => {
        void addAnimeToList(listId, animeId);
      },
      setDeleteList: (view, list, listId) => {
        setShowConfirmModal(view);
        if (list) setDeleteInfo(list);
        if (!view && listId) void deleteList(listId);
      },
      setEditedListData: (id: string, changes: EditAnimeListData) => {
        void editList(id, changes);
      },
    }),
    [
      createList,
      removeAnimeOfList,
      addAnimeToList,
      deleteList,
      editList,
    ],
  );

  const sendEditedAnime = async (id: string, edited: EditAnimeData) => {
    return editAnimeInList(id, edited);
  };

  const setupEditForm = (view: boolean, initData?: AnimeResponse) => {
    setEditAnimeForm({ view, info: initData });
  };

  return (
    <searchContext.Provider value={searchContextValue}>
      <listsContext.Provider value={listsContextValue}>
        <div className="space-y-5">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-crimson-400 uppercase">
                Organização
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
                Minhas listas
              </h1>
              <p className="mt-2 text-sm text-lead-400">
                {isLoading
                  ? "Atualizando suas listas..."
                  : `${lists.length} lista${lists.length === 1 ? "" : "s"} criada${
                      lists.length === 1 ? "" : "s"
                    }.`}
              </p>
            </div>

            <button
              type="button"
              className="btn-primary w-full sm:w-auto"
              onClick={() => setShowCreateListForm(true)}
            >
              <FiPlus size={17} />
              Nova lista
            </button>
          </header>

          <div className="panel p-3 sm:p-4">
            <SearchBar placeholder="Buscar listas..." />
          </div>

          {!hasLoaded ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton h-28 rounded-3xl" />
              ))}
            </div>
          ) : lists.length > 0 ? (
            <div className="grid items-start gap-4 md:grid-cols-2">
              {lists.map((list) => (
                <ListCard key={list.id} listData={list} alwaysActive={false} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiList}
              title="Nenhuma lista encontrada"
              description="Crie listas para separar seus animes por tema, humor ou momento da maratona."
              action={
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowCreateListForm(true)}
                >
                  <FiPlus size={16} />
                  Criar primeira lista
                </button>
              }
            />
          )}
        </div>

        {showCreateListForm && <ListCreationForm />}

        {editAnimeForm.view && editAnimeForm.info && (
          <AnimeEditionForm
            animeData={editAnimeForm.info}
            setEditForm={setupEditForm}
            setEditAnime={sendEditedAnime}
          />
        )}

        {showConfirmModal && deleteInfo && <DeleteListModal list={deleteInfo} />}
      </listsContext.Provider>
    </searchContext.Provider>
  );
}
