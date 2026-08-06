import * as coinsService from "../04-services/coingecko.service.js";
import { bulkUpsertCoins } from "../05-repository/coins.repository.js";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const bootstrap = async () => {
    let page = 1;
    let hasMore = true;

    console.log("Starting CoinGecko markets bootstrap process (CX_1)...");

    while (hasMore) {
        try {
            console.log(`Fetching page ${page}...`);
            const coins = await coinsService.getMarkets(
                "usd",
                "market_cap_desc",
                250,
                page,
                true,
                "1h,24h,7d,14d,30d,200d,1y"
            );

            if (!coins || coins.length === 0) {
                console.log("Empty page returned. Market bootstrap complete!");
                hasMore = false;
                break;
            }

            console.log(`Fetched ${coins.length} coins. Upserting into database...`);
            await bulkUpsertCoins(coins);

            console.log(`Page ${page} successfully upserted.`);
            page++;

            await delay(1000);
        } catch (error: any) {
            console.error(`Rate limited (429) or error on page ${page}: ${error.message}`);
            console.log("Waiting 60 seconds for API cooldown...");
            await delay(60000);
        }
    }

    console.log("Market bootstrap process finished successfully.");
    process.exit(0);
};

bootstrap();
