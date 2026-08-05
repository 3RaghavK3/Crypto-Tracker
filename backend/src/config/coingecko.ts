import axios from "axios";

export const coinGeckoApi = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    headers: {
        "x-cg-demo-api-key": process.env.CX_1,
    },
});