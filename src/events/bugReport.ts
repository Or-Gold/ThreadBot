import { Message, TextChannel } from "discord.js";
import bugReportExec from "../executors/eventExecutors/bugReportExec"

module.exports = {
    name: 'messageCreate',
    async execute(interaction: Message) {
        bugReportExec(interaction);
    }
}
