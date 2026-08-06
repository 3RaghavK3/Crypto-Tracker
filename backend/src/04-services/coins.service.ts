import * as coinsRepository from "../05-repository/coins.repository.js";
import * as coingeckoService from "./coingecko.service.js";

export const getMarketsFromDb = async (page: number, perPage: number, orderBy: string) => {
    return await coinsRepository.getMarketsFromDb(page, perPage, orderBy);
};

export const getCoinDetailFromDb = async (coinId: string) => {
    let dbData = await coinsRepository.getCoinDetailFromDb(coinId);

    if (dbData && dbData.description == null) {
        try {
            console.log(`Lazy loading metadata for ${coinId} via CX_2 API...`);
            const apiData = await coingeckoService.getCoinDetail(coinId);
            
            dbData = {
                ...dbData,
                description: apiData.description?.en || null,
                categories: apiData.categories || [],
                hashing_algorithm: apiData.hashing_algorithm,
                block_time_in_minutes: apiData.block_time_in_minutes,
                genesis_date: apiData.genesis_date,
                country_origin: apiData.country_origin,
                homepage: apiData.links?.homepage || [],
                blockchain_sites: apiData.links?.blockchain_site || [],
                official_forum_urls: apiData.links?.official_forum_url || [],
                chat_urls: apiData.links?.chat_url || [],
                announcement_urls: apiData.links?.announcement_url || [],
                whitepaper: apiData.links?.whitepaper || null,
                twitter_username: apiData.links?.twitter_screen_name || null,
                facebook_username: apiData.links?.facebook_username || null,
                telegram_channel_identifier: apiData.links?.telegram_channel_identifier || null,
                subreddit_url: apiData.links?.subreddit_url || null,
                github_repositories: apiData.links?.repos_url?.github || [],
                bitbucket_repositories: apiData.links?.repos_url?.bitbucket || [],
                platforms: apiData.platforms,
                detail_platforms: apiData.detail_platforms,
                sentiment_votes_up_percentage: apiData.sentiment_votes_up_percentage,
                sentiment_votes_down_percentage: apiData.sentiment_votes_down_percentage,
                watchlist_portfolio_users: apiData.watchlist_portfolio_users,
                developer_data: apiData.developer_data,
                community_data: apiData.community_data,
                detail_last_updated: apiData.last_updated
            };

            coinsRepository.upsertCoinDetail(coinId, apiData).catch((err) => {
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