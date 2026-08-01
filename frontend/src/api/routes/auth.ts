import axios from "axios";
import api from "../axios.ts";
import type { LoginData, RegisterData } from "../../types/api/Request.ts";
import type { errorResponse } from "../../types/api/Response.ts";

export async function authLogin(data: LoginData) {
    try {
        const response = await api.post("/auth/login", data);
        return response.data
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to login!");
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

export async function authRegister(data: RegisterData) {
    try {
        const response = await api.post("/auth/register", data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError<errorResponse>(e)) {
            console.log("Error while trying to register!");
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

export async function authCheck() {
    try {
        await api.get("/auth/check");
        return true;
    } catch {
        return false;
    }
}