import { CommandInteraction, ThreadChannel } from "discord.js";

export default async function issueRename(interaction: CommandInteraction, thread: ThreadChannel) {
    if (thread.archived) {
        return await interaction.reply("Cannot rename - thread is archived.");
    }
    const new_name = interaction.options.getString('name');
    if (!new_name) {
        await interaction.reply("There was a problem fetching the name.")
    } else {
        await interaction.reply("Renaming...")
        await thread.setName(new_name);
    }
}
