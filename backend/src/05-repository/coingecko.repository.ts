import { coinGeckoMarketApi } from "../config/coingecko.js";

export const getMarkets = async (
    vsCurrency: string,
    order: string,
    perPage: number,
    page: number,
    sparkline: boolean,
    priceChangePercentage: string
) => {
    const response = await coinGeckoMarketApi.get("/coins/markets", {
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
    const response = await coinGeckoMarketApi.get(`/coins/${coinId}`);
    return response.data;
};

export const getGlobalData = async () => {
    const response = await coinGeckoMarketApi.get("/global");
    return response.data;
};

export const getTrendingCoins = async () => {
    const response = await coinGeckoMarketApi.get("/search/trending");
    return response.data;
};

export const search = async (query: string) => {
    const response = await coinGeckoMarketApi.get("/search", {
        params: {
            query,
        },
    });

    return response.data;
};
