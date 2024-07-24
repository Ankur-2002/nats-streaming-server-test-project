import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

const clientID = randomBytes(5).toString("hex");
console.clear();
const client = nats.connect("ticketing", clientID, {
    url: "http://localhost:4222",
});

client.on("connect", () => {
    console.log("Listener connected");

    client.on("close", () => {
        console.log("CLIENT CLSOED");
        process.exit();
    });
    const ticketCreated = new TicketCreatedListener(client);
    ticketCreated.listen()
});

process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());






