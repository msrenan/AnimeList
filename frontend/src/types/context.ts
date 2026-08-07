import { createContext } from "react";
import type { ReleaseDay } from "./enum";
import type { AnimeData, AnimeListData, EditAnimeData, EditAnimeListData } from "./api/Request";
import type { AccountResponse, AnimeListResponse, AnimeResponse } from "./api/Response";

export interface LoginContext {
    isLoggedIn: (state: boolean) => void;
    storeId: (id: string) => void;
}

export const loginContext = createContext<LoginContext>({
    isLoggedIn: () => {},
    storeId: () => {}
});

export interface AccountContext {
    account: AccountResponse | undefined,
    accountId: string;
    logout: () => void;
    accountUpdated: () => void;
}

export const accountContext = createContext<AccountContext>({
    account: undefined,
    accountId: "",
    logout: () => {},
    accountUpdated: () => {}
});

export interface AnimeContext {
    setAddAnime: (newAnime: AnimeData) => void;
    setAnimeForm: (state: boolean) => void;
    setDirty: (id: string, changedData: EditAnimeData) => void;
    setShowDeleteModal: (view: boolean, anime?: AnimeResponse) => void;
    setDeleteAnime: (confirm: boolean, id?: string) => void;
    setAddAnimeToList: (animeId: string, listId: string) => void;
    setEditForm: (view: boolean, anime?: AnimeResponse) => void;
}

export const animeContext = createContext<AnimeContext>({
    setAddAnime: () => {},
    setAnimeForm: () => {},
    setDirty: () => {},
    setShowDeleteModal: () => {},
    setDeleteAnime: () => {},
    setAddAnimeToList: () => {},
    setEditForm: () => {}
})

export interface AnimeFormContext {
    setReleaseDay: (day: ReleaseDay) => void;
    setStatus: (status: string) => void;
    setTracking: (tracking: string) => void;
}

export const animeFormContext = createContext<AnimeFormContext>({
    setReleaseDay: () => {},
    setStatus: () => {},
    setTracking: () => {}
});

export interface AnimeCardContext {
    setMenuView: (view: boolean) => void;
    view: boolean;
    setMenuOption: (option: 'edit' | 'addToList', listId?: string) => void;
};

export const animeCardContext = createContext<AnimeCardContext>({
    setMenuView: () => {},
    view: false,
    setMenuOption: () => {}
});

export interface SearchContext {
    setQuery: (query: string) => void;
}

export const searchContext = createContext<SearchContext>({
    setQuery: () => {}
})

export interface ListsContext {
    setAddList: (view: boolean, list?:AnimeListData) => void;
    setRemoveAnimeFromList: (listId: string, animeId: string) => void;
    setEditForm: (view: boolean, anime?: AnimeResponse) => void;
    setDeleteList: (view: boolean, list?: AnimeListResponse, listId?: string) => void;
    setAddAnimeToList: (animeId: string, listId: string) => void;
    setEditedListData: (id: string, changes: EditAnimeListData) => void;
}

export const listsContext = createContext<ListsContext>({
    setAddList: () => {},
    setRemoveAnimeFromList: () => {},
    setEditForm: () => { },
    setDeleteList:  () => {},
    setAddAnimeToList:  () => {},
    setEditedListData: () => {}
})

export interface ListCardContext {
    setMenuView: (view: boolean) => void;
    view: boolean;
    setMenuOption: (option: 'editAnime' | 'remove' | 'editList' | 'delete' | 'add', animeId? :string) => void;
};

export const listCardContext = createContext<ListCardContext>({
    setMenuView: () => {},
    view: false,
    setMenuOption: () => {}
});

