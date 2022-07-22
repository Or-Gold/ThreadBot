import { CommandInteraction, MessageEmbed, ThreadChannel } from "discord.js";
import { isValidHttpUrl } from "../../helpers/stringManipulation";
import { bugChannel } from "../../config.json"

export default async function issueExec(interaction: CommandInteraction) {
    const thread = interaction.channel;

    if (!thread?.isThread() || !(thread?.parent?.name === bugChannel)) {
        return await interaction.reply(`Issue commands are only avilable from Threads created in ${bugChannel}`);
    }

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
        case 'repeated': {
            await issueRepeated(interaction, thread);
            break;
        }
    }
}

async function issueClose(interaction: CommandInteraction, thread: ThreadChannel) {
    if (thread.name.startsWith("✅")) {
        await interaction.reply("This issue is already closed!");
        await thread.setArchived();
    } else {
        await interaction.reply("Closing issue... (Notice! you can only close an issue once every 10 minutes)");
        await thread.setName("✅".concat(thread.name));
        await thread.setArchived();
    }
}

async function issueReopen(interaction: CommandInteraction, thread: ThreadChannel) {
    if (!thread.name.startsWith("✅")) {
        await interaction.reply("This issue is not closed!");
    } else {
        await interaction.reply("Reopening issue...");
        await thread.setName(thread.name.substring(1, thread.name.length));
        await thread.setArchived(false);
    }
}

async function issueRename(interaction: CommandInteraction, thread: ThreadChannel) {
    if (thread.name.startsWith("✅")) {
        await interaction.reply("Cannot rename - thread is archived. Reopen the issue with \`/issue reopen\` if you require further assistence.");
        await thread.setArchived();
    } else {
        const new_name = interaction.options.getString('name');
        if (!new_name) {
            await interaction.reply("There was a problem fetching the name.")
        } else {
            await interaction.reply("Renaming...")
            await thread.setName(new_name);
        }
    }
}

async function issueGithub(interaction: CommandInteraction, _thread: ThreadChannel) {
    // TODO: create github issue from a discord thread issue.
    await interaction.reply("Not implemented!")
}

async function issueRepeated(interaction: CommandInteraction, thread: ThreadChannel) {
    if (thread.name.startsWith("✅")) {
        await interaction.reply("This issue is already closed!");
        await thread.setArchived();
    } else {
        const prev = interaction.options.getString('original', true)
        if (!isValidHttpUrl(prev)) {
            return await interaction.reply("The URL provided is not valid! please provide a valid URL that links to the previous issue.")

        }

        const original_issue = new MessageEmbed()
            .setColor('#ef1f1f')
            .setTitle('Previous issue')
            .setURL(prev)

        await thread.send({embeds: [original_issue]});
        await interaction.reply("Closing repeated issue... (Notice! you can only close an issue once every 10 minutes)");
        await thread.setName("✅+🔁".concat(thread.name));
        await thread.setArchived();
    }
}
