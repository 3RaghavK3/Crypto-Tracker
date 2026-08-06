import * as coinsRepository from "../05-repository/coins.repository.js";
import * as coingeckoService from "./coingecko.service.js";

export const getMarketsFromDb = async (page: number, perPage: number, orderBy: string) => {
    return await coinsRepository.getMarketsFromDb(page, perPage, orderBy);
};

export const getCoinDetailFromDb = async (coinId: string) => {
    let dbData = await coinsRepository.getCoinDetailFromDb(coinId);

    if (dbData && dbData.detail_last_synced_at == null) {
        try {
            const apiData = await coingeckoService.getCoinDetail(coinId);
            dbData = {
                ...dbData,
                description: apiData.description?.en || null,
                categories: apiData.categories || [],
                homepage: apiData.links?.homepage || [],
                whitepaper: apiData.links?.whitepaper || null,
                twitter_username: apiData.links?.twitter_screen_name || null,
                subreddit_url: apiData.links?.subreddit_url || null,
                github_repositories: apiData.links?.repos_url?.github || [],
                platforms: apiData.platforms,
                sentiment_votes_up_percentage: apiData.sentiment_votes_up_percentage,
                sentiment_votes_down_percentage: apiData.sentiment_votes_down_percentage,
                watchlist_portfolio_users: apiData.watchlist_portfolio_users,
                developer_data: apiData.developer_data,
                community_data: apiData.community_data,
                detail_last_updated: apiData.last_updated
            };

            coinsRepository.upsertDetail(coinId, apiData).catch((err) => {
                console.error(`Failed to async upsert coin detail for ${coinId}:`, err);
            });
        } catch (error: any) {
            console.error(`Failed to fetch coin detail for ${coinId} from CoinGecko:`, error.message);
        }
    }

    return dbData;
};

export const getGlobalDataFromDb = async () => {
    return await coinsRepository.getGlobalDataFromDb();
};

export const getTrendingCoinsFromDb = async () => {
    return await coinsRepository.getTrendingCoinsFromDb();
};
