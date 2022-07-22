import { CommandInteraction, MessageEmbed } from "discord.js";
import { capitalizeFirst } from '../../helpers/stringManipulation'

export default async function issuesExec(interaction: CommandInteraction) {
    const parent_channel = interaction.channel;
    if (parent_channel?.type === 'GUILD_TEXT') {
        const threadLst = await parent_channel.threads.fetchActive();
        const threadMap = await Promise.all(threadLst.threads.map(
            async thread => {
                const threadName = thread.name.length > 20 ? thread.name.slice(0, 20).concat('...') : thread.name
                return {
                    name: `${capitalizeFirst(threadName)}`,
                    value: `[Issue](${(await thread.fetchStarterMessage()).url})`
                }
            }))
        console.log(threadMap);

        const listEmbed = new MessageEmbed()
            .setColor('#ef1f1f')
            .setTitle('Issue list')
            .addFields(...threadMap)

        interaction.reply({ embeds: [listEmbed] })
    }
}
