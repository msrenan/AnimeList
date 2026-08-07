import type { ReleaseDay } from "../enum"

export type loginResponse = {
    accountId: string,
    token: string
}

export type errorResponse = {
    title: string,
    code: number,
    message: string | Map<string, string>,
    timestamp: Date
}

export type AccountResponse = {
    id: string,
    nick: string,
    email: string
}

export type AnimeResponse = {
    id: string
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

export type AnimeListResponse = {
    id: string,
    name: string,
    ownerId: string,
    animes: AnimeResponse[]
}

