import { Message } from "discord.js";
import ThreadBot from "src/ThreadBot";
import bugReportExec from "../executors/eventExecutors/bugReportExec"

module.exports = {
    name: 'messageCreate',
    async execute(client: ThreadBot, interaction: Message) {
        await bugReportExec(client, interaction);
    }
}
