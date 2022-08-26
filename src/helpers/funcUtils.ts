import { ChannelType, CommandInteraction } from 'discord.js';
import ThreadBot from 'src/ThreadBot';
import { bugChannelId } from '../config.json';

type Ms = number;

export async function replyAndDelete(
	interaction: CommandInteraction,
	message: string,
	after: Ms = 5000
) {
	await interaction.reply(message);
	setTimeout(async () => await interaction.deleteReply(), after);
}
