import { CommandInteraction } from "discord.js";

type Ms = number

export async function replyAndDelete(interaction: CommandInteraction, message: string, after: Ms = 5000) {
    await interaction.reply(message); 
    setTimeout(async () => await interaction.deleteReply(), after);
}
