import { Queue } from "bullmq";
import { Redis } from "ioredis";
import "dotenv/config";

const connection = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

export const marketQueue = new Queue("market-sync", {
    connection,
});

export const alertQueue = new Queue("alert-sync", {
    connection,
});

export { connection };
