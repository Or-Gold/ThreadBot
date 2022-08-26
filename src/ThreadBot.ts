import { Client, Collection, TextChannel, ThreadChannel } from 'discord.js';
import CommandObject from './types/CommandObject';
import { CLIENT_INTENTS } from './helpers/constants';
import commandListener from './listeners/commandListener';
import eventListener from './listeners/eventListener';
import { token, gitInfo } from './config.json';
import { Octokit } from 'octokit';

export default class ThreadBot extends Client {
	commands: Collection<string, CommandObject>;
	octoClient: Octokit;

	constructor() {
		super({ intents: CLIENT_INTENTS });
		this.commands = new Collection();
		this.octoClient = new Octokit({
			auth: gitInfo.personalToken,
			userAgent: 'ThreadBot/v0.0.1',
		});
	}

	init() {
		eventListener(this);
		commandListener(this);
		this.login(token);
	}
}

const client = new ThreadBot();
client.init();
