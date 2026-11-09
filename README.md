### What is BullMQ
BullMQ is message queue for to handle the requests in FIFO ( First In First Out )

### Why we need BullMQ
On the platform multiple events occur so to queue it without creating cluster.
example : Order request by end user where the order is placed now want to queue the notification for our order through mail and notifying user about the product delivery status after product is delivered as well.

Even on youtube
Multiple videos are uploaded
X user uploads a video which is being processed
Y user has to wait until the video by X is processed

Where is the queue of videos ?
In our Redis's memory there is a data structure that holds the queue.
The producer is in NodeJs which helps u write the payload for queue.
Worker is our NodeJS process that helps process the video and upload it to the server as per queue.

### What if one of the payload fails to process or gets corrupted and cannot be processed.
We have a concept called Dead Letter Queue in which the payload which gave us the error is transferred to the error queue and then later after some retries there also if it fails then we just send it in as an error by our Notification queue as our queue had a error while processing.

### BullMQ feature ?
BullMQ has a feature called retry where we can retry as many times we want that our RAM usage.
BullMQ failed event can be helpful for our DLQ handling.

### How does the queue works ?
In simple example as you can see the producer.js queues our job into the redis with the shared identifier ('email-queue')
worker.js dequeues it from redis ('email-queue') and executes the job , redis resources like unique id and data is grabbed from redis db

### Why we need the worker ?
To dequeue and execute from our redis queue and provide without blocking main api and do the heavy lifting.
Added -> waiting -> active -> executed is the event of each job in the queue

### Example for critical places to add use the BullMQ

<img width="793" height="1338" alt="BullMQ" src="https://github.com/user-attachments/assets/c5c1b2c4-a012-4247-b4da-dc8c3e1a3df7" />
