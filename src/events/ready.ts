import ThreadBot from 'src/ThreadBot';

module.exports = {
	name: 'ready',
	once: true,
	async execute(client: ThreadBot) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
};
