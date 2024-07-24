import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    abstract onMessage(data: T["data"], msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setDurableName(this.queueGroupName)
            .setAckWait(this.ackWait);
    }

    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on("message", (msg: Message) => {
            console.log(`This is message ${msg.getSubject()} / ${msg.getSequence()}`);
            const parsedData = this.parseData(msg);
            this.onMessage(parsedData, msg)
        })
    }

    parseData(message: Message) {
        const messageData = message.getData()
        return typeof messageData === "string" ? JSON.parse(messageData) : JSON.parse(messageData.toString("utf8"))
    }
}