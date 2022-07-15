import { Intents } from "discord.js"

export const CLIENT_INTENTS: number[] = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
];

export const BUG_REPORT_MESSAGE =
    "\
    Hi! Welcome to bug reports.\n\
    This thread was created so we'd be able to track your \
    issue more reliabley. If you've got any more information on the \
    particular bug you've experienced, you're welcomed to share it \
    right here.\n\
    The WynnBuilder team will make sure to look into the issue \
    and fix it as soon as possible.\n\
    Once the issue is resolved, either you a staff member will close the \
    issue using the /close command.\
    "
