import { Queue } from "bullmq";

// Create a new queue and label is a shared identifier
const notificationQueue = new Queue('email-queue',
        {
        connection : {
            host : "127.0.0.1",
            port : 6379,
        }
    }
);

// A function that is helper function to create and push a notification job into redis via notificationQueue.add()
async function init(){
    const res = await notificationQueue.add('email to piyush',
        {
            email : "rohit.dev",
            subject : "Welcome",
            body : "Hey welcome"
        }
    )
    console.log("Job added to queue",res.id);
}

// The producers puts the job into redis and get back a unique job id (res.id)
// Actual execution happens in worker.js
init();