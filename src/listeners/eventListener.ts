import fs from "fs";
import ThreadBot from "src/ThreadBot";

export default function eventListener(client: ThreadBot) {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

