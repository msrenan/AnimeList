import { useContext, useEffect, useState } from "react";
import { accountContext, animeContext, searchContext, type AnimeContext, type SearchContext } from "../types/context";
import AnimeCard from "../components/AnimeCard";
import { useAnimes } from "../hooks/useAnimes";
import type { AnimeResponse } from "../types/api/Response";
import SearchBar from "../components/SearchBar";
import { FaPlus } from "react-icons/fa";
import Loading from "../components/Loading";
import AnimeCreationForm from "../components/AnimeCreationForm";
import type { AnimeData, EditAnimeData } from "../types/api/Request";
import AnimeEditionForm from "../components/AnimeEditionForm";
import DeleteAnimeModal from "../components/DeleteAnimeModal";
import { useList } from "../hooks/useList";


export default function Animes() {

    const {accountId} = useContext(accountContext);

    const { fetchAnimes, animes, isLoading,
        addAnime, editAnime, deleteAnime, animeSearch} = useAnimes();

    const { addAnimeToList } = useList(accountId);

    const [showAnimeCreation, setShowAnimeCreation] = useState<boolean>(false);
    const [editAnimeView, setEditAnimeView] = useState<boolean>(false);
    const [editAnimeInfo, setEditAnimeInfo] = useState<AnimeResponse>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteAnimeInfo, setDeleteAnimeInfo] = useState<AnimeResponse>();

    const AnimeContextValue: AnimeContext = {
        setAnimeForm: (state: boolean) => {
            setShowAnimeCreation(state);
        },
        setAddAnime: (newAnime: AnimeData) => {
            addAnime(newAnime);
        },
        setDirty: (id: string, changedData: EditAnimeData) => {
            editAnime(id, changedData);
        },
        setShowDeleteModal: (view: boolean, anime?: AnimeResponse) => {
            setShowDeleteModal(view);
            if (anime) setDeleteAnimeInfo(anime);
        },
        setDeleteAnime: (confirm: boolean, id?: string) => {
            setShowDeleteModal(false);
            if (confirm && id) {
                deleteAnime(id);
            }
        },
        setAddAnimeToList: (animeId: string, listId: string) => {
            addAnimeToList(listId, animeId);
        },
        setEditForm: (view: boolean, anime?: AnimeResponse) => {
            setEditAnimeView(view);
            if (anime) setEditAnimeInfo(anime);
        }
    }

    const SearchContextValue: SearchContext = {
        setQuery: (query: string) => {
            animeSearch(query)
        }
    }

    const sendEditedAnime = (id: string, edited: EditAnimeData) => {
        editAnime(id, edited);
    }

    const setupEditForm = (view: boolean, initData?: AnimeResponse) => {
        setEditAnimeView(view);
        if (initData) setEditAnimeInfo(initData);
    }

    useEffect(() => {
        fetchAnimes();
    }, [])

    return(
        <>
            <animeContext.Provider value={AnimeContextValue}>
            <searchContext.Provider value={SearchContextValue}>
            <div className="w-full h-[85vh] flex flex-col py-5 overflow-hidden">
                <div className="h-[80px] w-full shrink-none">
                    <div className="flex items-center">
                        <SearchBar />
                        <div className="w-full flex items-center justify-end">
                            <p className="text-lead-600 text-[20px] mr-6">
                                Total: {animes && animes.length} anime(s)!
                            </p>
                            <button className="genericButton"
                                    
                                    onClick={() => setShowAnimeCreation(true)}>
                                <p className="font-bold text-[20px] text-lead-200">Novo Anime</p>
                                <div>
                                    <FaPlus size={20} />
                                </div>
                                
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-wrap items-center justify-center gap-3 overflow-y-scroll">
                    {!isLoading && animes && animes.length > 0 ? (
                        animes.map((anime: AnimeResponse) => (
                            <AnimeCard animeData={anime} Ikey={anime.id}/>
                        ))
                    ) : !isLoading && animes && animes.length == 0 ? (
                        <h2 className="font-bold text-[36px] text-lead-600">Nenhum anime encontrado.</h2>
                    ) : (
                        <Loading size={32}/>
                    )}
                </div>
            </div>

            {showAnimeCreation && (
                <AnimeCreationForm />
            )}

            {editAnimeView && editAnimeInfo && (
                <AnimeEditionForm animeData={editAnimeInfo} setEditAnime={sendEditedAnime} setEditForm={setupEditForm}/>
            )}

            {showDeleteModal && deleteAnimeInfo && (
                <DeleteAnimeModal anime={deleteAnimeInfo}/>
            )}
            
            </searchContext.Provider>
            </animeContext.Provider>
        </>
    );

}