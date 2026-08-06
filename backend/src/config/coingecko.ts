import "dotenv/config";
import axios from "axios";

export const coinGeckoMarketApi = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    headers: {
        "x-cg-demo-api-key": process.env.CX_1,
    },
});

export const coinGeckoDetailApi = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    headers: {
        "x-cg-demo-api-key": process.env.CX_2,
    },
});