import { useContext, useEffect, useState } from "react";
import { accountContext, animeContext, type AnimeContext } from "../types/context";
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


export default function Animes() {

    const {accountId} = useContext(accountContext);

    const { fetchAnimes, animes, isLoading, setIsLoading,
        addAnime, editAnime, deleteAnime} = useAnimes();

    const [showAnimes, setShowAnimes] = useState<AnimeResponse[]>([]);
    const [showAnimeCreation, setShowAnimeCreation] = useState<boolean>(false);
    const [editAnimeView, setEditAnimeView] = useState<boolean>(false);
    const [editAnimeInfo, setEditAnimeInfo] = useState<AnimeResponse>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteAnimeInfo, setDeleteAnimeInfo] = useState<AnimeResponse>();

    const AnimeContextValue: AnimeContext = {
        setAnimes: (list: AnimeResponse[]) => {
            console.log(`ANIMES (SUPER): ${JSON.stringify(animes)}`);
            setShowAnimes(list);
        },
        setLoading: (state: boolean) => {
            setIsLoading(state)
        },
        setAnimeForm: (state: boolean) => {
            setShowAnimeCreation(state);
        },
        setAddAnime: (newAnime: AnimeData) => {
            addAnime(newAnime);
        },
        setDirty: (id: string, changedData: EditAnimeData) => {
            editAnime(id, changedData);
        },
        setEditForm: (view: boolean, anime?: AnimeResponse) => {
            setEditAnimeView(view);
            if (anime) setEditAnimeInfo(anime);
        },
        setEditAnime: (id: string, editedAnime: EditAnimeData) => {
            editAnime(id, editedAnime);
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
        }
    }

    useEffect(() => {
        fetchAnimes();
    }, [])
    
    useEffect(() => {
        console.log(`Id: ${accountId}`)
    }, [accountId])

    useEffect(() => {
        const updateShowAnimes = () => {
            if (animes) setShowAnimes(animes);
        }
        console.log(`animes have been updated: ${JSON.stringify(animes)}`);
        updateShowAnimes();
    }, [animes])

    // Fazer funcionalidade o botão de criar anime.
    // Fazer funcionalidade da searchBar (incluindo rota e request com parametro)
    return(
        <>
            <animeContext.Provider value={AnimeContextValue}>
            <div className="w-full h-full flex flex-col py-5">
                <div className="h-[80px] w-full shrink-none">
                    <div className="flex items-center">
                        <SearchBar />
                        <div className="w-full flex items-center justify-end">
                            <button className="genericButton"
                                    
                                    onClick={() => setShowAnimeCreation(true)}>
                                <p className="font-bold text-[20px] text-lead-200">Adicionar Anime</p>
                                <div>
                                    <FaPlus size={20} />
                                </div>
                                
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-wrap items-center justify-center gap-3">
                    {!isLoading ? (
                        showAnimes.map((anime: AnimeResponse) => (
                            <AnimeCard animeData={anime} Ikey={anime.id}/>
                        ))
                    ) : (
                        <Loading size={32}/>
                    )}
                </div>
            </div>

            {showAnimeCreation && (
                <AnimeCreationForm />
            )}

            {editAnimeView && editAnimeInfo && (
                <AnimeEditionForm animeData={editAnimeInfo}/>
            )}

            {showDeleteModal && deleteAnimeInfo && (
                <DeleteAnimeModal anime={deleteAnimeInfo}/>
            )}
            
            </animeContext.Provider>
        </>
    );

}