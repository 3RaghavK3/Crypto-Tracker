import { coinGeckoApi } from "../config/coingecko.js";
import pool from "../config/db.js";

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

export const bulkUpsertCoins = async (coins: any[]) => {
    if (coins.length === 0) return;

    const values = [];
    const params = [];
    let paramIndex = 1;

    for (const coin of coins) {
        values.push(`($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, NOW())`);
        params.push(
            coin.id,
            coin.symbol,
            coin.name,
            coin.image,
            coin.current_price,
            coin.market_cap ? Math.round(Number(coin.market_cap)) : null,
            coin.market_cap_rank,
            coin.total_volume ? Math.round(Number(coin.total_volume)) : null,
            coin.circulating_supply,
            coin.price_change_percentage_1h_in_currency,
            coin.price_change_percentage_24h_in_currency,
            coin.price_change_percentage_7d_in_currency,
            coin.sparkline_in_7d ? JSON.stringify(coin.sparkline_in_7d) : null
        );
    }

    const query = `
        INSERT INTO coins (
            coin_id, symbol, name, image_url, current_price, market_cap, market_cap_rank,
            total_volume, circulating_supply, price_change_1h, price_change_24h, price_change_7d,
            sparkline_7d, last_synced_at
        ) VALUES ${values.join(", ")}
        ON CONFLICT (coin_id) DO UPDATE SET
            symbol = EXCLUDED.symbol,
            name = EXCLUDED.name,
            image_url = EXCLUDED.image_url,
            current_price = EXCLUDED.current_price,
            market_cap = EXCLUDED.market_cap,
            market_cap_rank = EXCLUDED.market_cap_rank,
            total_volume = EXCLUDED.total_volume,
            circulating_supply = EXCLUDED.circulating_supply,
            price_change_1h = EXCLUDED.price_change_1h,
            price_change_24h = EXCLUDED.price_change_24h,
            price_change_7d = EXCLUDED.price_change_7d,
            sparkline_7d = EXCLUDED.sparkline_7d,
            last_synced_at = EXCLUDED.last_synced_at;
    `;

    await pool.query(query, params);
};

export const upsertGlobalData = async (globalData: any) => {
    const data = globalData.data;
    if (!data) return;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        await client.query("DELETE FROM global_market_stats");

        const query = `
            INSERT INTO global_market_stats (
                id, total_market_cap, total_volume_24h, market_cap_change_percentage_24h,
                active_cryptocurrencies, last_synced_at
            ) VALUES (
                1, $1, $2, $3, $4, NOW()
            )
        `;

        const params = [
            data.total_market_cap?.usd || 0,
            data.total_volume?.usd || 0,
            data.market_cap_change_percentage_24h_usd || 0,
            data.active_cryptocurrencies || 0
        ];

        await client.query(query, params);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
};

export const syncTrendingCoins = async (trendingData: any) => {
    const coins = trendingData.coins;
    if (!coins || coins.length === 0) return;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        await client.query("DELETE FROM trending_coins");

        const values = [];
        const params = [];
        let paramIndex = 1;
        let trendRank = 1;

        for (const coinObj of coins) {
            const item = coinObj.item;
            values.push(`($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, NOW())`);
            params.push(item.id, trendRank++, item.score || 0);
        }

        const insertTrendingQuery = `
            INSERT INTO trending_coins (coin_id, trend_rank, score, last_synced_at)
            VALUES ${values.join(", ")}
        `;

        await client.query(insertTrendingQuery, params);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
};