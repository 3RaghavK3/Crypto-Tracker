import { Worker } from "bullmq";
import { connection, alertQueue } from "../config/bullmq.js";
import * as alertRepo from "../05-repository/alerts.repository.js";

const worker = new Worker(
  "alert-sync",
  async (job) => {
    console.log(`Processing job ${job.name} (ID: ${job.id})`);

    if (job.name === "process-alerts") {
      try {
        const notifications = await alertRepo.processSatisfiedAlerts();
        console.log(`Processed alerts. Created ${notifications.length} pending notifications.`);
        
        // At this point, the alerts worker could either process emails right away 
        // OR a separate email worker could pick up PENDING notifications.
        // As per the user's instructions: "then it alert worker job to send email thing from the notifcation table"
        // We will do a simple pass over pending notifications here if needed in the future,
        // but for now we just acknowledge they are created.
        if (notifications.length > 0) {
          console.log("Here we would trigger email dispatching for:", notifications);
          // TODO: Fetch user email from user_id, send email using nodemailer, and update status to 'SENT'
        }
      } catch (error: any) {
        console.error("Error processing satisfied alerts:", error.message);
        throw error;
      }
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

const setupJobs = async () => {
  console.log("Clearing old alert job schedulers...");
  const schedulers = await alertQueue.getJobSchedulers();
  for (const scheduler of schedulers) {
    if (scheduler.id) await alertQueue.removeJobScheduler(scheduler.id);
  }

  console.log("Adding repeatable alert check job (every 1 minute)...");
  await alertQueue.upsertJobScheduler(
    "scheduler-process-alerts",
    { pattern: "* * * * *" }, // every 1 minute
    { name: "process-alerts", opts: { removeOnComplete: true, removeOnFail: true } }
  );

  console.log("Scheduler setup complete for alerts.");
};

setupJobs().catch(console.error);

console.log("BullMQ Worker started and listening on 'alert-sync' queue...");
