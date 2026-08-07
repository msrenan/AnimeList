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

export async function getAccountLists(id: string, query?: string) {
    try {
        if (query) {
            const response = await api.get(`/account/${id}/lists`, {params: {
                search: query
            }});
            return response.data;
        } else {
            const response = await api.get(`/account/${id}/lists`);
            return response.data;
        }
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

export async function createAccountList(id: string, data: AnimeListData) {
    try {
        const response = await api.post(`/account/${id}/lists`, data);
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

export async function editAccountById(id: string, data: EditAccountData) {
    try {
        const response = await api.put(`/account/${id}`, data);
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

export async function deleteAccountById(id: string) {
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
