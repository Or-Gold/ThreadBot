import { CommandInteraction } from "discord.js";
import { bugChannel } from "../../../config.json"
import issueClose from "./issueClose";
import issueGithub from "./issueGithub";
import issueRename from "./issueRename";
import issueReopen from "./issueReopen";

export default async function issueExec(interaction: CommandInteraction) {
    const thread = interaction.channel;
    if (!thread || !thread.isThread() || !thread.parent) {
        await interaction.reply("This command can only be executed from a valid thread!");
    } else if (thread.parent.name !== bugChannel) {
        await interaction.reply(`This command can only be executed in valid issues (threads created in ${bugChannel})`)
    } else {
        switch (interaction.options.getSubcommand()) {
            case 'close': {
                await issueClose(interaction, thread);
                break;
            }

            case 'reopen': {
                await issueReopen(interaction, thread);
                break;
            }

            case 'rename': {
                await issueRename(interaction, thread);
                break;
            }

            case 'github': {
                await issueGithub(interaction, thread);
                break;
            }
        }
    }
}
