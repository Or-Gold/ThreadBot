import { CommandInteraction, ThreadChannel } from "discord.js";

export default async function issueReopen(interaction: CommandInteraction, thread: ThreadChannel) {
    if (!thread.archived) {
        await interaction.reply("This issue is not closed!");
    } else {
        await interaction.reply("Reopening issue...")
        await thread.setName(thread.name.substring(2, thread.name.length));
        await thread.setLocked(false);
        await thread.setArchived(false);
    }
}
