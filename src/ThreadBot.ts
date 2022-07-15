import { Client, Collection } from "discord.js";
import CommandObject from './types/CommandObject'
import { CLIENT_INTENTS } from "./helpers/constants"
import commandListener from "./listeners/commandListener";
import eventListener from "./listeners/eventListener";
import { token } from "./config.json"

export default class ThreadBot extends Client {
    commands: Collection<string, CommandObject>;

    constructor() {
        super({ intents: CLIENT_INTENTS })
        this.commands = new Collection();
    }

    init() {
        eventListener(this);
        commandListener(this);
        this.login(token);
    }
}

const client = new ThreadBot();
client.init();
