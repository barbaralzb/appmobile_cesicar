import axios from "axios";
import { AuthApi, ServerUrl } from "../utils";

export const login = async (username, password) => {
    const config = {
        headers: {
            Accept: 'application/ld+json'
        },
    }
    return await axios.post(
        ServerUrl + AuthApi,
        { username, password },
        config
    );
}