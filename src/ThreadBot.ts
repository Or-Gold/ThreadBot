import { Client, Collection } from "discord.js";
import CommandObject from './helpers/CommandObject'
import { CLIENT_INTENTS } from "./helpers/constants"

export default class ThreadBot extends Client {
    commands: Collection<string, CommandObject>;
    clientId: string;
    bugChannel: string;

    constructor(token: string, clientId: string, bugChannel: string) {
        super({ intents: CLIENT_INTENTS })
        this.commands = new Collection();
        this.token = token;
        this.clientId = clientId;
        this.bugChannel = bugChannel;
    }

    init() {
        if (this.token) {
            this.login(this.token);
        } else {
            console.log("There was no token provided. Can't initialize bot.")
        }
    }
}

class NoTokenError extends Error {

}
