import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import issuesExec from "../../executors/commandExecutors/issuesExec";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('issues')
        .setDescription('Lists all the open issues'),

    async execute(interaction: ChatInputCommandInteraction) {
       await issuesExec(interaction) 
    }
}
