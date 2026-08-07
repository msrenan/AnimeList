import axios from "axios";
import api from "../axios.ts";
import { type errorResponse } from "../../types/api/Response.ts";
import type { AnimeData, EditAnimeData } from "../../types/api/Request.ts";
import type { FilterOptions } from "../../types/enum.ts";

export async function getAnimes() {
    try {
        const response = await api.get("/anime");
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while fetching animes!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}

export async function searchAnimes(query: string) {
    try {
        const response = await api.get("/anime", {
            params: {
                search: query
            }
        });
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while fetching animes!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}

export async function getAnimesByFilter(filter: FilterOptions) {
    try {
        const response = await api.get("/anime", {
            params: {
                filter: filter
            }
        });
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while fetching animes!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}

export async function getAnimeById(id: string) {
    try {
        const response = await api.get(`/anime/id/${id}`);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while fetching anime by Id!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}

export async function createAnime(anime: AnimeData) {
    try {
        const response = await api.post(`/anime`, anime);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to create anime!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}

export async function editAnimeById(id: string, data: EditAnimeData) {
    try {
        const response = await api.put(`/anime/id/${id}`, data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to edit Anime by Id!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}

export async function deleteAnimeById(id: string) {
    try {
        const response = await api.delete(`/anime/id/${id}`);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while fetching anime by Id!");
            if (e.response) {
                console.log(`Status: ${e.response.status}`);
                console.log(`Body: ${JSON.stringify(e.response.data)}`)
            } else if (e.request) {
                console.log(`Server did not answered: ${e.request}`)
            }
        } else {
            console.log("Unexpected error: ", e)
        }
    }
}