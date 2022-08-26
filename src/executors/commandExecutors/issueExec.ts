import {
    ThreadChannel,
    EmbedBuilder,
    ChatInputCommandInteraction,
} from 'discord.js';
import { isValidHttpUrl } from '../../helpers/stringManipulation';
import { bugChannelId, gitInfo } from '../../config.json';
import { replyAndDelete } from '../../helpers/funcUtils';
import ThreadBot from 'src/ThreadBot';
import { GithubIssueCreateStatusCode } from '../../helpers/constants';

// TODO: Make sure all replyAndDelete functions don't actually mess with thread archives (too lazy to test rn)
export default async function issueExec(
    interaction: ChatInputCommandInteraction,
    client: ThreadBot
) {
    const thread = interaction.channel;
    if (!thread?.isThread() || !(thread?.parent?.id === bugChannelId)) {
        await replyAndDelete(
            interaction,
            `Issue commands are only avilable from Threads created in <#${bugChannelId}>`
        );
        return;
    }
    switch (interaction.options.getSubcommand()) {
        case 'close':
            await issueClose(interaction, thread);
            break;
        case 'reopen':
            await issueReopen(interaction, thread);
            break;
        case 'rename':
            await issueRename(interaction, thread);
            break;
        case 'github':
            await issueGithub(interaction, client, thread);
            break;
        case 'repeated':
            await issueRepeated(interaction, thread);
            break;
    }
}

async function issueClose(
    interaction: ChatInputCommandInteraction,
    thread: ThreadChannel
) {
    if (thread.name.startsWith('✅')) {
        await replyAndDelete(interaction, 'This issue is already closed!');
        await thread.setArchived();
    } else {
        await interaction.reply(
            'Closing issue... (Notice! you can only close an issue once every 10 minutes)'
        );
        await thread.setName('✅'.concat(thread.name));
        await thread.setArchived();
    }
}

async function issueReopen(
    interaction: ChatInputCommandInteraction,
    thread: ThreadChannel
) {
    if (!thread.name.startsWith('✅')) {
        await replyAndDelete(interaction, 'This issue is not closed!');
    } else {
        await interaction.reply('Reopening issue...');
        // SAFETY: The issue must be a valid closed issue that starts with a ✅
        await thread.setName(thread.name.substring(1, thread.name.length));
        await thread.setArchived(false);
    }
}

async function issueRename(
    interaction: ChatInputCommandInteraction,
    thread: ThreadChannel
) {
    if (thread.name.startsWith('✅')) {
        await replyAndDelete(
            interaction,
            'Cannot rename - thread is archived. Reopen the issue with `/issue reopen` if you require further assistence.'
        );
        await thread.setArchived();
        return;
    }
    const new_name = interaction.options.getString('name', true);
    if (!new_name) {
        await replyAndDelete(interaction, 'There was a problem fetching the name.');
    } else {
        if (new_name.length >= 90) {
            await replyAndDelete(
                interaction,
                'Thread names can only be 90 characters long.'
            );
            return;
        }
        await interaction.reply('Renaming...');
        await thread.setName(new_name);
    }
}

async function issueGithub(
    interaction: ChatInputCommandInteraction,
    client: ThreadBot,
    thread: ThreadChannel
) {
    interaction.deferReply();
    const issueTitle = interaction.options.getString('title', true);
    const issueBody = interaction.options.getString('body', true);
    const { status: statusCode, data: resData } =
        await client.octoClient.rest.issues.create({
            owner: gitInfo.owner,
            repo: gitInfo.repo,
            title: issueTitle,
            body: `This issue was created from discord. [Issue Link](${thread.url}).\n${issueBody}`,
        });
    if (statusCode !== GithubIssueCreateStatusCode.Created) {
        await interaction.editReply(
            `issue creation failed with code ${statusCode}`
        );
    } else {
        await interaction.editReply(
            `Created a new github issue!\n${resData.html_url}`
        );
    }
}

async function issueRepeated(
    interaction: ChatInputCommandInteraction,
    thread: ThreadChannel
) {
    if (thread.name.startsWith('✅')) {
        await replyAndDelete(interaction, 'This issue is already closed!');
        await thread.setArchived();
        return;
    }
    const prev = interaction.options.getString('original', true);
    if (!isValidHttpUrl(prev)) {
        await replyAndDelete(
            interaction,
            'The URL provided is not valid! please provide a valid URL that links to the previous issue.'
        );
        return;
    }
    const original_issue = new EmbedBuilder()
        .setColor('#ef1f1f')
        .setTitle('Previous issue')
        .setURL(prev);
    await thread.send({ embeds: [original_issue] });
    await interaction.reply(
        'Closing repeated issue... (Notice! you can only close an issue once every 10 minutes)'
    );
    await thread.setName('✅+🔁'.concat(thread.name));
    await thread.setArchived();
}
