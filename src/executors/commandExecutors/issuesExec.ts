import {
	ChannelType,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from 'discord.js';

import ThreadBot from 'src/ThreadBot';
import { bugChannelId } from '../../config.json';
import { capitalizeFirst } from '../../helpers/stringManipulation';

export default async function issuesExec(
	interaction: ChatInputCommandInteraction,
	client: ThreadBot
) {
	if (interaction.channel?.type !== ChannelType.GuildText) {
		await interaction.reply(
			"This interaction wasn't sent from a valid text channel."
		);
		return;
	}
	await interaction.deferReply();
	const issueMap = await buildIssueMap(client);
	const listEmbed = new EmbedBuilder()
		.setAuthor({
			name: interaction.user.username,
			iconURL: interaction.user.avatarURL()?.toString(),
		})
		.setColor(0xef1f1f)
		.setTitle('Issue list')
		.addFields(...issueMap);

	await interaction.channel.send({ embeds: [listEmbed] });
	await interaction.deleteReply();
}

async function buildIssueMap(client: ThreadBot) {
	const bugChannel = await client.channels.fetch(bugChannelId);
	if (!bugChannel || bugChannel.type !== ChannelType.GuildText) {
		console.log('An error occured while fetching and accessing the channel!');
		return;
	}
	const issues = (await bugChannel.threads.fetchActive()).threads;
	return await Promise.all(
		issues.map(async (thread) => {
			const starterMessage = await thread.fetchStarterMessage();
			if (!starterMessage) {
				throw Error("Couldn't fetch starter message for the issue.");
			}
			return {
				name: `${capitalizeFirst(thread.name)}`,
				value: `[Issue](${thread.url}), [Message](${starterMessage.url})`,
			};
		})
	);
}
