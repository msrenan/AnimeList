import { FaPlus } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import { accountContext, listsContext, searchContext, type ListsContext, type SearchContext } from "../types/context";
import { useList } from "../hooks/useList";
import { useContext, useEffect, useState } from "react";
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response";
import Loading from "../components/Loading";
import ListCard from "../components/ListCard";
import ListCreationForm from "../components/ListCreationForm";
import type { AnimeListData, EditAnimeData, EditAnimeListData } from "../types/api/Request";
import AnimeEditionForm from "../components/AnimeEditionForm";
import DeleteListModal from "../components/DeleteListModal";

export default function Lists() {

    const { accountId } = useContext(accountContext);


    const { lists, isLoading, searchLists, deleteList, fetchLists, editList,
        createList, removeAnimeOfList, editAnimeInList, addAnimeToList } = useList(accountId);

    const [showCreateListForm, setShowCreateListForm] = useState<boolean>(false);
    const [editAnimeForm, setEditAnimeForm] = useState<{view: boolean, info?: AnimeResponse}>({view: false});
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [deleteInfo, setDeleteInfo] = useState<AnimeListResponse>();

    const SearchContextValue: SearchContext = {
        setQuery: (query: string) => {
            console.log("Query: ", query);
            searchLists(query);
        }
    }

    const ListsContextValue: ListsContext = {
        setAddList: (view: boolean, list?: AnimeListData) => {
            setShowCreateListForm(view);
            if (list) {
                createList(list);
            }
        },
        setRemoveAnimeFromList: (listId: string, animeId: string) => {
            console.log(`removing ${animeId} from ${listId}`);
            removeAnimeOfList(listId, animeId);
        },
        setEditForm: (view: boolean, anime?: AnimeResponse) => {
            if (anime) {
                setEditAnimeForm({view, info: anime})
            } else {
                setEditAnimeForm({view})
            }
        },
        setAddAnimeToList: (animeId: string, listId: string) => {
            addAnimeToList(listId, animeId);
        },
        setDeleteList: (view: boolean, list?: AnimeListResponse, listId?: string) => {
            setShowConfirmModal(view);
            if (list && list != undefined) setDeleteInfo(list);
            else if (listId && listId != undefined) deleteList(listId);
        },
        setEditedListData: (id: string, changes: EditAnimeListData) => {
            editList(id, changes);
        }
    }

    const sendEditedAnime = (id: string, edited: EditAnimeData) => {
        editAnimeInList(id, edited);
    }

    const setupEditForm = (view: boolean, initData?: AnimeResponse) => {
        if (initData) {
            setEditAnimeForm({view, info: initData})
        } else {
            setEditAnimeForm({view})
        }
    }

    useEffect(() => {
        if (!accountId) return;
        fetchLists();
    }, [accountId])

    return(
        <>
            <searchContext.Provider value={SearchContextValue}>
            <listsContext.Provider value={ListsContextValue}>
                <div className="w-full h-[85vh] flex flex-col py-5 overflow-hidden">
                    <div className="h-[80px] w-full shrink-0">
                        <div className="flex items-center">
                            <SearchBar />
                            <div className="w-full flex items-center justify-end">
                                <button className="genericButton"
                                onClick={() => setShowCreateListForm(true)}
                                >
                                    <p className="font-bold text-[20px] text-lead-200">Nova Lista</p>
                                    <div>
                                        <FaPlus size={20} />
                                    </div>
                                    
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col items-center gap-3
                    overflow-y-scroll py-2">
                        {!isLoading && lists.length > 0 ? (
                            lists.map((list: AnimeListResponse) => (
                                <ListCard listData={list} alwaysActive={false} />
                            ))
                        ) : !isLoading && lists.length == 0 ? (
                            <h2 className="font-bold text-[36px] text-lead-600">Nenhuma lista encontrada.</h2>
                        ) : (
                            <Loading size={32}/>
                        )}
                    </div>
                </div>

                {showCreateListForm && (
                    <ListCreationForm />
                )}

                {editAnimeForm.view && editAnimeForm.info && (
                    <AnimeEditionForm animeData={editAnimeForm.info} setEditForm={setupEditForm} setEditAnime={sendEditedAnime}/>
                )}

                {showConfirmModal && deleteInfo && (
                    <DeleteListModal list={deleteInfo}/>
                )}
            </listsContext.Provider>
            </searchContext.Provider>
        </>
    );

}
