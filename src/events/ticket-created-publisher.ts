import { Stan } from "node-nats-streaming";
import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-events";


export class TicketCreatePublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;

    constructor(client: Stan) {
        super(client)
    }

}