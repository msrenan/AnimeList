import axios from "axios";
import api from "../axios.ts";
import type { errorResponse } from "../../types/api/Response.ts";
import type { AnimeListData, EditAccountData } from "../../types/api/Request.ts";

export async function getAccount(id: string) {
    try {
        const response = await api.get(`/account/${id}`);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to fetch account data!");
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

export async function getAccountLists(id: string) {
    try {
        const response = await api.get(`/account/${id}/lists`);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to fetch account lists!");
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

export async function createAccountList(id: string, name:string, animeIds: string[]) {
    try {

        const body: AnimeListData = {
            name,
            animeIds
        }

        const response = await api.post(`/account/${id}/lists`, body);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to create anime list!");
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

export async function editAccount(id: string, newNick: string) {
    try {
        const body: EditAccountData = {
            nickname: newNick
        };
        const response = await api.put(`/account/${id}`, body);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to edit Account!");
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

export async function deleteAccont(id: string) {
    try {
        const response = await api.delete(`/account/${id}`);
        return response.data;
    }  catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to delete account!");
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
