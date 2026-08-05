import { coinGeckoApi } from "../config/coingecko.js";

export const getMarkets = async (
    vsCurrency: string,
    order: string,
    perPage: number,
    page: number,
    sparkline: boolean,
    priceChangePercentage: string
) => {
    const response = await coinGeckoApi.get("/coins/markets", {
        params: {
            vs_currency: vsCurrency,
            order,
            per_page: perPage,
            page,
            sparkline,
            price_change_percentage: priceChangePercentage,
        },
    });

    return response.data;
};

export const getCoinDetail = async (coinId: string) => {
    const response = await coinGeckoApi.get(`/coins/${coinId}`);
    return response.data;
};

export const getGlobalData = async () => {
    const response = await coinGeckoApi.get("/global");
    return response.data;
};

export const getTrendingCoins = async () => {
    const response = await coinGeckoApi.get("/search/trending");
    return response.data;
};

export const search = async (query: string) => {
    const response = await coinGeckoApi.get("/search", {
        params: {
            query,
        },
    });

    return response.data;
};