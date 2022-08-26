import {
	ChannelType,
	EmbedBuilder,
	Message,
	ThreadAutoArchiveDuration,
} from 'discord.js';
import ThreadBot from 'src/ThreadBot';
import { bugChannelId } from '../../config.json';
import { BUG_REPORT_MESSAGE } from '../../helpers/constants';

export default async function bugReportExec(
	client: ThreadBot,
	interaction: Message
) {
	if (interaction.author.bot) {
		return;
	}
	const channel = interaction.channel;
	if (channel.type !== ChannelType.DM && channel.id === bugChannelId) {
		// Disallow image-only reports.
		if (!interaction.content) {
			await interaction
				.reply(
					"Please describe your issue with text! Images alone aren't always enough to understand and debug the issue."
				)
				.then((msg) => setTimeout(() => msg.delete(), 5000))
				.catch((err) =>
					console.log('There was an error deleting the reply', err)
				);
			await interaction.delete();
		} else {
			const name =
				interaction.content.length < 90
					? interaction.content
					: interaction.content.slice(0, 90).concat('...');
			const thread = await interaction.startThread({ name: name });
			if (thread) {
				await thread.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);
				const messageEmbed = new EmbedBuilder()
					.setTitle('Issue bug report #[placeholder]')
					.setColor(0xef1f1f)
					.addFields([{ name: 'Welcome!', value: BUG_REPORT_MESSAGE }]);

				await thread.send({ embeds: [messageEmbed] });
			}
		}
	}
}
