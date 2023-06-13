import axios from "axios";
import { ServerUrl, TravelsApi } from "../utils";

export const getTravelsApi = async () => {
    const config = {
        headers: {
            Accept: 'application/ld+json'
        },
    }
    return await axios.get(
        ServerUrl + TravelsApi,
        config
    );
}