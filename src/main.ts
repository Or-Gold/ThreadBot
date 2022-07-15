import ThreadBot from "./ThreadBot";
import { token, bugChannel, clientId } from "./config.json"
import commandListener from "./listeners/commandListener";
import eventListener from "./listeners/eventListener";

const client = new ThreadBot(token, clientId, bugChannel);
eventListener(client);
commandListener(client);
client.init();
