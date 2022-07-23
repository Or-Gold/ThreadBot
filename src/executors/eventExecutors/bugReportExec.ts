import { ChannelType, EmbedBuilder, Message } from "discord.js";
import { bugChannelId } from "../../config.json"
import { BUG_REPORT_MESSAGE } from "../../helpers/constants"


export default async function bugReportExec(interaction: Message) {
    if (interaction.author.bot) {
        return;
    }
    const channel = interaction.channel
    if (channel.type !== ChannelType.DM && channel.id === bugChannelId) {
        if (!interaction.content) {
            await interaction.reply("Please describe your issue with text! Images alone aren't always enough to understand and debug the issue.")
                .then(msg =>
                    setTimeout(() => msg.delete(), 5000))
                .catch(err => console.log("There was an error deleting the reply", err));
            await interaction.delete();
        } else {
            // Discord only allows 100 character length thread names. since we can potentially add some characters, 
            // we need it to be < 94 characters
            const name = (interaction.content.length < 90) ? interaction.content : interaction.content.slice(0, 90).concat('...');
            const thread = await interaction.startThread({ name: name });
            if (thread) {
                const messageEmbed = new EmbedBuilder()
                    .setTitle("Issue bug report #[placeholder]")
                    .setColor(0xef1f1f)
                    .addFields([{ name: "Welcome!", value: BUG_REPORT_MESSAGE }]);

                thread.send({ embeds: [messageEmbed] });
            }
        }
    }
}
