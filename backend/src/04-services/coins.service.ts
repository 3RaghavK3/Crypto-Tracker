import * as coinsRepository from "../05-repository/coins.repository.js";

export const getMarketsFromDb = async (page: number, perPage: number, orderBy: string) => {
    return await coinsRepository.getMarketsFromDb(page, perPage, orderBy);
};

export const getCoinDetailFromDb = async (coinId: string) => {
    return await coinsRepository.getCoinDetailFromDb(coinId);
};

export const getGlobalDataFromDb = async () => {
    return await coinsRepository.getGlobalDataFromDb();
};

export const getTrendingCoinsFromDb = async () => {
    return await coinsRepository.getTrendingCoinsFromDb();
};