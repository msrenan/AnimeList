import type { ReleaseDay } from "../enum"

export type LoginData = {
    login: string,
    password: string
}

export type RegisterData = {
    nickname: string,
    email: string,
    password: string
}

export type AnimeData = {
    title: string,
    season: number,
    episode: number,
    releaseDay: ReleaseDay,
    isFinished: boolean,
    watched: boolean,
    favorite: boolean,
    waitingForNextSeason: boolean,
    needToWatch: boolean
}

export type AnimeListData = {
    name: string,
    animeIds?: string[]
}

export type EditAccountData = {
    nickname?: string
 }

export type EditAnimeData = {
    title?: string,
    season?: number,
    episode?: number,
    releaseDay?: ReleaseDay,
    isFinished?: boolean,
    watched?: boolean,
    favorite?: boolean,
    waitingForNextSeason?: boolean,
    needToWatch?: boolean
}

export type EditAnimeListData = {
    name?: string
}

export type UpdateAnimeData = {
    season?: number,
    episode?: number,
    isFinished?: boolean,
    waiting?: boolean
}