import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import issuesExec from "../../executors/commandExecutors/issuesExec";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('issues')
        .setDescription('Lists all the open issues'),

    execute(interaction: CommandInteraction) {
       issuesExec(interaction) 
    }
}
