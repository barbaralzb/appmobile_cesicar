import axios from "axios";
import { AuthApi, MeApi, ServerUrl } from "../utils";

export const login = async (username, password) => {
    const config = {
        headers: {
            // Accept: 'application/ld+json'
            'Content-Type': 'application/json',
        },
    }
    return await axios.post(
        ServerUrl + AuthApi,
        { username, password },
        config
    );
}

export const authApi = async (token) => {
    const config = {
        headers: {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return await axios.get(
        ServerUrl + MeApi,
        config
    );
}