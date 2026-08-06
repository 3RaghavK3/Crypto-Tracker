import * as coinsService from "../04-services/coingecko.service.js";
import { upsertDetail, getMarketsFromDb } from "../05-repository/coins.repository.js";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const bootstrap = async () => {
    console.log("Starting CoinGecko details bootstrap process (CX_2)...");

    try {
        console.log("Fetching Top 100 coins from local database...");
        const top100 = await getMarketsFromDb(1, 100, "market_cap_desc");

        if (!top100 || top100.length === 0) {
            console.log("No coins found in database. Please run bootstrap-markets first.");
            process.exit(1);
        }

        console.log(`Found ${top100.length} coins. Fetching metadata for each...`);
        for (let i = 0; i < top100.length; i++) {
            const coinId = top100[i].coin_id; // the db column is coin_id
            try {
                console.log(`Fetching metadata for ${coinId} (${i + 1}/${top100.length})...`);
                const detail = await coinsService.getCoinDetail(coinId);
                await upsertDetail(coinId, detail);
                await delay(2500); 
            } catch (err: any) {
                console.error(`Rate limited (429) or error for ${coinId}: ${err.message}`);
                console.log("Waiting 60 seconds for API cooldown...");
                await delay(60000); 
            }
        }
        console.log("Finished populating details for Top 100 coins.");
    } catch (error) {
        console.error("Error during details bootstrap process:", error);
    }

    console.log("Details bootstrap process finished successfully.");
    process.exit(0);
};

bootstrap();
