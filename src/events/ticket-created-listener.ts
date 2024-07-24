import { Stan, Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-events";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated
    queueGroupName: string = "payments-service";
    constructor(client: Stan) {
        super(client)
    };

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log(`Event data: ${JSON.stringify(data)}`);
        msg.ack();
    }
}