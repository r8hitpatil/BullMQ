import { Worker } from "bullmq";

// delay our response just for simulation
const sendEmail = () => new Promise((res,rej) => setTimeout(() => res(),5 * 1000));

// worker dequeues the jobs from redis ('email-queue') and the payload data is grabbed from Redis , executes the processing logic
const worker = new Worker("email-queue", async(job) => {
        console.log(`Message id : ${job.id}`);
        console.log(`Processing message`);
        console.log(`Sending email to ${job.data.email}`);
        await sendEmail();
        console.log("Email sent");
    },
    {
        connection : {
            host : "127.0.0.1",
            port : 6379,
        }
    }
);