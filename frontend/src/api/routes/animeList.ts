import axios from "axios";
import api from "../axios.ts";
import type { errorResponse } from "../../types/api/Response.ts";
import type { EditAnimeListData } from "../../types/api/Request.ts";

export async function getList(id: string) {
    try {
        const response = await api.get(`/list/${id}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying get list data!");
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

export async function addAnimeToListById(id: string, animeId: string) {
    try {
        const response = await api.patch(`/list/${id}/add/id/${animeId}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying add anime to list by id!");
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

export async function removeAnimeOfListById(id: string, animeId: string) {
    try {
        const response = await api.patch(`/list/${id}/remove/id/${animeId}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to remove anime of list by id!");
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

export async function addAnimeToListByTitle(id: string, animeTitle: string) {
    try {
        const response = await api.patch(`/list/${id}/add/title/${animeTitle}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying add anime to list by id!");
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

export async function removeAnimeOfListByTitle(id: string, animeTitle: string) {
    try {
        const response = await api.patch(`/list/${id}/remove/title/${animeTitle}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to remove anime of list by title!");
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

export async function editAnimeList(id: string, newName: string) {
    try {
        const body: EditAnimeListData = {
            name: newName
        }

        const response = await api.put(`/list/${id}`, body);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to edit anime list!");
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

export async function deleteAnimeList(id: string) {
    try {
        const response = await api.delete(`/list/${id}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to delete anime list!");
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
