import nats from "node-nats-streaming";
import { TicketCreatePublisher } from "./events/ticket-created-publisher";

console.clear();
const client = nats.connect("ticketing", "abc", {
    url: "http://localhost:4222",
});

client.on("connect", async (...message) => {
    console.log("Publisher connected to NATS");
    // const data = {
    //     id: "123",
    //     title: "Ankur",
    //     price: 23
    // }
    // client.publish("ticket:created", JSON.stringify(data), (...res) => {
    //     console.log(res, "Data submitted");
    // })
    const publish = new TicketCreatePublisher(client);
    await publish.publish({
        id: "asdfasdf",
        price: 1,
        title: "ankur",
        userId: "sdfasd"
    });
});
