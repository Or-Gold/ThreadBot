import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import issueExec from "../../executors/commandExecutors/issueExec"

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
                .setDescription('Add an issue to the github repo'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('repeated')
                .setDescription('Mark an issue as repeated and close it')
                .addStringOption(option => {
                    return option
                        .setName('original')
                        .setDescription('A link to the original issue')
                        .setRequired(true)
                })
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await issueExec(interaction);
    }
}
