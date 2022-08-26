import fs from 'fs';
import ThreadBot from 'src/ThreadBot';

export default function commandListener(client: ThreadBot) {
	fetchCommands(client);
	console.log('Listening to commands!');

	client.on('interactionCreate', async (interaction) => {
		if (
			!interaction.isChatInputCommand() &&
			!interaction.isContextMenuCommand() &&
			!interaction.isMessageContextMenuCommand() &&
			!interaction.isUserContextMenuCommand()
		) {
			return;
		}

		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			if (interaction.replied) {
				await interaction.editReply(
					'There was an error while executing this command!'
				);
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}
	});
}

function fetchCommands(client: ThreadBot) {
	const commandDirs = fs.readdirSync('./src/commands');

	for (const dir of commandDirs) {
		const commandFiles = fs
			.readdirSync(`./src/commands/${dir}`)
			.filter((file: string) => file.endsWith('.ts'));

		for (const file of commandFiles) {
			const command = require(`../commands/${dir}/${file}`);
			client.commands.set(command.data.name, command);
		}
	}

	console.log(client.commands);
}
