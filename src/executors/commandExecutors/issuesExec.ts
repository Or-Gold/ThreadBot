import { ChannelType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { capitalizeFirst } from '../../helpers/stringManipulation'
import { bugChannelId } from '../../config.json'

export default async function issuesExec(interaction: ChatInputCommandInteraction) {
    const bugChannel = await interaction.guild?.channels.fetch(bugChannelId)
    if (!bugChannel) {
        return await interaction.reply("Couldn't fetch bug channel! make sure you've supplied an ID in config.json")
    }

    if (bugChannel?.type === ChannelType.GuildText) {
        const threadLst = await bugChannel.threads.fetchActive();
        const threadMap = await Promise.all(threadLst.threads.map(
            async thread => {
                const threadName = thread.name.length > 50 ? thread.name.slice(0, 50).concat('...') : thread.name
                const starterMessageURL = (await thread.fetchStarterMessage()).url
                return {
                    name: `${capitalizeFirst(threadName)}`,
                    value: `[Issue](${thread.url}), [Message](${starterMessageURL})`
                }
            }))

        const listEmbed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL()?.toString() })
            .setColor(0xef1f1f)
            .setTitle('Issue list')
            .addFields(...threadMap)


        interaction.reply({ embeds: [listEmbed] })
    }
}
