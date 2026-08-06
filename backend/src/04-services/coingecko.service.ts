import * as coinsRepository from "../05-repository/coingecko.repository.js";

export const getMarkets = async (
    vsCurrency: string,
    order: string,
    perPage: number,
    page: number,
    sparkline: boolean,
    priceChangePercentage: string
) => {
    return await coinsRepository.getMarkets(
        vsCurrency,
        order,
        perPage,
        page,
        sparkline,
        priceChangePercentage
    );
};

export const getCoinDetail = async (coinId: string) => {
    return await coinsRepository.getCoinDetail(coinId);
};

export const getGlobalData = async () => {
    return await coinsRepository.getGlobalData();
};

export const getTrendingCoins = async () => {
    return await coinsRepository.getTrendingCoins();
};

export const search = async (query: string) => {
    return await coinsRepository.search(query);
};
