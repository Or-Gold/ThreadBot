import { CommandInteraction, ThreadChannel } from "discord.js";

export default async function issueClose(interaction: CommandInteraction, thread: ThreadChannel) {
    if (thread.archived) {
        await interaction.reply("This issue is already closed!");
    } else {
        await interaction.reply("Closing issue...")
        await thread.setName("✅-".concat(thread.name));
        await thread.setLocked();
        await thread.setArchived();
    }
}
