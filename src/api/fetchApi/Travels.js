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

export const getTravelsByDestinationApi = async (toCesi) => {
    const config = {
        headers: {
            Accept: 'application/ld+json'
        },
    }

    const params = {
        toCesi: toCesi
    }

    return await axios.get(
        ServerUrl + TravelsApi,
        params,
        config
    );
}