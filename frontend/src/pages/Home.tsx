import { useContext, useEffect, useState } from "react";
import { accountContext, listsContext, type ListsContext } from "../types/context";
import { useList } from "../hooks/useList";
import ListCard from "../components/ListCard";
import type { AnimeListResponse, AnimeResponse } from "../types/api/Response";
import { useAnimes } from "../hooks/useAnimes";
import { FilterOptions } from "../types/enum";
import type { EditAnimeData } from "../types/api/Request";
import AnimeEditionForm from "../components/AnimeEditionForm";
import Loading from "../components/Loading";


export default function Home() {

    const {accountId, account} = useContext(accountContext);

    const { lists, fetchLists, editAnimeInList } = useList(accountId);
    const { animeFilter, isLoading } = useAnimes();

    const [watching, setWatching] = useState<AnimeListResponse>();
    const [start, setStart] = useState<AnimeListResponse>();
    const [update, setUpdate] = useState<number>(0);
    const [editAnimeForm, setEditAnimeForm] = useState<{view: boolean, info?: AnimeResponse}>({view: false});
    
    const sendEditedAnime = (id: string, edited: EditAnimeData) => {
        editAnimeInList(id, edited);
        setUpdate(u => u + 1);
    }

    const setupEditForm = (view: boolean, initData?: AnimeResponse) => {
        if (initData) {
            setEditAnimeForm({view, info: initData})
        } else {
            setEditAnimeForm({view})
        }
    }

    const ListsContextValue: ListsContext = {
        setAddList: () => {},
        setRemoveAnimeFromList: () => {},
        setEditForm: (view: boolean, anime?: AnimeResponse) => {
            if (anime) {
                setEditAnimeForm({view, info: anime})
            } else {
                setEditAnimeForm({view})
            }
        },
        setAddAnimeToList: () => {},
        setDeleteList: () => {},
        setEditedListData: () => {}
    }

    useEffect(() => {
        const setWachingList = async () => {
            const watchingAnimes = await animeFilter(FilterOptions.Assistindo);
            if (watchingAnimes) {
                const watchingList: AnimeListResponse = {
                    name: "Assistindo",
                    id: "watching",
                    animes: watchingAnimes,
                    ownerId: accountId
                }

                setWatching(watchingList);
            }
        }

        const setStartList = async () => {
            const startAnimes = await animeFilter(FilterOptions.Comecar);
            if (startAnimes) {
                const startList: AnimeListResponse = {
                    name: "Começar/Rever",
                    id: "start",
                    animes: startAnimes,
                    ownerId: accountId
                }

                setStart(startList);
            }
        }
        console.log("Updating lists!")
        setWachingList();
        setStartList();
        if (account) {
            fetchLists();
        }
    }, [account, update])

    if (isLoading || !accountId) return <Loading size={34} />

    return(
        <>
        <listsContext.Provider value={ListsContextValue}>
            <div className="w-full h-full flex flex-col p-3 gap-4
            overflow-hidden">
                <div className="w-full flex items-center pl-10 shrink-0">
                    <h1 className="font-bold text-[48px] text-lead-300">Olá, <span className="text-crimson-400">{account && account.nick}</span>!</h1>
                </div>
                <div className="flex min-w-full min-h-full overflow-hidden items-center justify-between gap-5">
                    <div className="w-full h-[95vh] overflow-hidden py-2">
                        { lists && (
                            lists.map((list) => {
                                if (list.name.toLowerCase() === 'favoritos') return (
                                    <ListCard listData={list} alwaysActive={true}/>
                                );
                            })
                        )}
                    </div>
                    <div className="w-full h-[95vh] overflow-hidden py-2">
                        {
                            watching && (
                                <ListCard listData={watching} alwaysActive={true}/>
                            )
                        }
                    </div>
                    <div className="w-full h-[95vh] overflow-hidden py-2">
                        {
                            start && (
                                <ListCard listData={start} alwaysActive={true} />
                            )
                        }
                    </div>
                </div>
            </div>

            {editAnimeForm.view && editAnimeForm.info && (
                <AnimeEditionForm animeData={editAnimeForm.info} setEditForm={setupEditForm} setEditAnime={sendEditedAnime}/>
            )}
        </listsContext.Provider>
        </>
    );

}
