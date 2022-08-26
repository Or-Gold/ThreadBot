import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import ThreadBot from "src/ThreadBot";
import issuesExec from "../../executors/commandExecutors/issuesExec";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('issues')
        .setDescription('Lists all the open issues'),

    async execute(interaction: ChatInputCommandInteraction, client: ThreadBot) {
        await issuesExec(interaction, client)
    }
}
