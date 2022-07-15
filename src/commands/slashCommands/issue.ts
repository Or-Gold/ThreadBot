import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import issueExec from "../../executors/commandExecutors/issue/issueExec"

module.exports = {
    data: new SlashCommandBuilder()
            .setName('issue')
            .setDescription('Commands for creating and managing issues in discord')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('close')
                    .setDescription('Close an issue / archive a thread'))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('reopen')
                    .setDescription('Reopen a closed issue'))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('rename')
                    .setDescription('Rename an open issue')
                    .addStringOption((option) => {
                        return option
                            .setName('name')
                            .setDescription('The new name for the issue')
                            .setRequired(true);
                    })
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('github')
                    .setDescription('Add an issue to the github repo')),

    async execute(interaction: CommandInteraction) {
        await issueExec(interaction);
    }
}
