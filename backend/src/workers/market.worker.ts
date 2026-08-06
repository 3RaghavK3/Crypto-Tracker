import { Worker } from "bullmq";
import { connection, marketQueue } from "../config/bullmq.js";
import * as coingeckoService from "../04-services/coingecko.service.js";
import { bulkUpsertCoins, upsertGlobalData, syncTrendingCoins } from "../05-repository/coins.repository.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function syncPages(startPage: number, endPage: number) {
    let page = startPage;

    while (page <= endPage) {
        try {
            console.log(`Fetching page ${page}...`);
            const coins = await coingeckoService.getMarkets(
                "usd",
                "market_cap_desc",
                250,
                page,
                true,
                "1h,24h,7d,14d,30d,200d,1y"
            );

            if (!coins || coins.length === 0) {
                console.log(`Page ${page} returned empty. Terminating loop.`);
                break;
            }

            console.log(`Fetched ${coins.length} coins on page ${page}. Upserting...`);
            await bulkUpsertCoins(coins);



            page++;
            if (page <= endPage) {
                await delay(1000);
            }
        } catch (error: any) {
            console.error(`Error fetching page ${page}:`, error.message);
            if (error.response?.status === 429) {
                console.log("Rate limited! Cooldown for 5 seconds...");
                await delay(5000);
            } else {
                throw error;
            }
        }
    }
}

const worker = new Worker(
    "market-sync",
    async (job) => {
        console.log(`Processing job ${job.name} (ID: ${job.id})`);

        switch (job.name) {
            case "sync-top250":
                await syncPages(1, 1);
                break;
            case "sync-251-500":
                await syncPages(2, 2);
                break;
            case "sync-501-2000":
                await syncPages(3, 8);
                break;
            case "sync-2001-5000":
                await syncPages(9, 20);
                break;
            case "sync-5001-plus":
                await syncPages(21, Infinity);
                break;
            case "sync-global-trending":
                await syncGlobalAndTrending();
                break;
            default:
                console.warn(`Unknown job name: ${job.name}`);
        }
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.name} completed successfully.`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job?.name} failed with error:`, err);
});

async function syncGlobalAndTrending() {
    try {
        console.log("Syncing global data...");
        const globalData = await coingeckoService.getGlobalData();
        await upsertGlobalData(globalData);
        console.log("Global data synced successfully.");
        
        console.log("Syncing trending coins...");
        const trendingData = await coingeckoService.getTrendingCoins();
        await syncTrendingCoins(trendingData);
        console.log("Trending coins synced successfully.");
    } catch (error: any) {
        console.error("Error syncing global or trending data:", error.message);
    }
}

const setupJobs = async () => {
    console.log("Clearing old job schedulers...");
    const schedulers = await marketQueue.getJobSchedulers();
    for (const scheduler of schedulers) {
        if (scheduler.id) await marketQueue.removeJobScheduler(scheduler.id);
    }

    console.log("Adding repeatable jobs...");

    await marketQueue.upsertJobScheduler("scheduler-top250", { every: 150000 }, { name: "sync-top250" });
    await marketQueue.upsertJobScheduler("scheduler-251-500", { pattern: "*/5 * * * *" }, { name: "sync-251-500" });
    await marketQueue.upsertJobScheduler("scheduler-501-2000", { pattern: "*/15 * * * *" }, { name: "sync-501-2000" });
    await marketQueue.upsertJobScheduler("scheduler-2001-5000", { pattern: "0 * * * *" }, { name: "sync-2001-5000" });
    await marketQueue.upsertJobScheduler("scheduler-5001-plus", { pattern: "0 */3 * * *" }, { name: "sync-5001-plus" });
    await marketQueue.upsertJobScheduler("scheduler-global-trending", { pattern: "*/30 * * * *" }, { name: "sync-global-trending" });

    console.log("Scheduler setup complete.");

    console.log("Adding initial sync for global and trending data to queue...");
    await marketQueue.add("sync-global-trending", {}, { removeOnComplete: true, removeOnFail: true });
};

setupJobs().catch(console.error);

console.log("BullMQ Worker started and listening on 'market-sync' queue...");
