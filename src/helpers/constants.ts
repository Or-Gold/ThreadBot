import { IntentsBitField } from 'discord.js';

export const CLIENT_INTENTS: number[] = [
	IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.GuildMessages,
	IntentsBitField.Flags.GuildMessageReactions,
	IntentsBitField.Flags.MessageContent,
];

export const BUG_REPORT_MESSAGE =
	"\
Hi! Welcome to bug reports.\n\
This thread was created so we'd be able to track your \
issue more reliably. If you've got any more information on the \
particular bug you've experienced, you're welcomed to share it \
right here.\n\
The WynnBuilder team will make sure to look into the issue \
and fix it as soon as possible.\n\
Once the issue is resolved, either you a staff member will close the \
issue using the /issue close command.\
";

export enum GithubIssueCreateStatusCode {
	Created = 201,
	Forbidden = 403,
	ResourceNotFound = 404,
	Gone = 410,
	ValidationFailed = 422,
	ServiceUnavailable = 503,
}
