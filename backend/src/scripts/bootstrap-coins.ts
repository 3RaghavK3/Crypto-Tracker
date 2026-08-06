import * as coinsService from "../04-services/coingecko.service.js";
import { bulkUpsertCoins } from "../05-repository/coins.repository.js";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const bootstrap = async () => {
    let page = 1;
    let hasMore = true;

    console.log("Starting CoinGecko bootstrap process...");

    while (hasMore) {
        try {
            console.log(`Fetching page ${page}...`);
            const coins = await coinsService.getMarkets(
                "usd",
                "market_cap_desc",
                250,
                page,
                true,
                "1h,24h,7d"
            );

            if (!coins || coins.length === 0) {
                console.log("Empty page returned. Bootstrap complete!");
                hasMore = false;
                break;
            }

            console.log(`Fetched ${coins.length} coins. Upserting into database...`);
            await bulkUpsertCoins(coins);

            console.log(`Page ${page} successfully upserted.`);
            page++;

            // Wait 1000ms to stay within 100 requests / minute rate limit
            await delay(1000);
        } catch (error) {
            console.error(`Error fetching or upserting page ${page}:`, error);
            // Wait longer before retrying on error
            await delay(5000);
        }
    }

    console.log("Bootstrap process finished successfully.");
    process.exit(0);
};

bootstrap();
