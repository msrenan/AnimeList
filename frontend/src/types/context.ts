import { createContext } from "react";
import type { AnimeResponse } from "./api/Response";
import type { ReleaseDay } from "./enum";
import type { AnimeData, EditAnimeData } from "./api/Request";

export interface LoginContext {
    isLoggedIn: (state: boolean) => void;
    storeId: (id: string) => void;
}

export const loginContext = createContext<LoginContext>({
    isLoggedIn: () => {},
    storeId: () => {}
});

export interface AccountContext {
    accountId: string;
}

export const accountContext = createContext<AccountContext>({
    accountId: ""
});

export interface AnimeContext {
    setAnimes: (list: AnimeResponse[]) => void;
    setLoading: (state: boolean) => void;
    setAddAnime: (newAnime: AnimeData) => void;
    setAnimeForm: (state: boolean) => void;
    setDirty: (id: string, changedData: EditAnimeData) => void;
    setEditForm: (view: boolean, anime?: AnimeResponse) => void;
    setEditAnime: (id: string, editedAnime: EditAnimeData) => void;
    setShowDeleteModal: (view: boolean, anime?: AnimeResponse) => void;
    setDeleteAnime: (confirm: boolean, id?: string) => void;
}

export const animeContext = createContext<AnimeContext>({
    setAnimes: () => {},
    setLoading: () => {},
    setAddAnime: () => {},
    setAnimeForm: () => {},
    setDirty: () => {},
    setEditForm: () => {},
    setEditAnime: () => {},
    setShowDeleteModal: () => {},
    setDeleteAnime: () => {}
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

