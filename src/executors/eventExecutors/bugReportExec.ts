import { Message } from "discord.js";
import { bugChannel } from "../../config.json"
import { BUG_REPORT_MESSAGE } from "../../helpers/constants"


export default async function bugReportExec(interaction: Message) {
    if (interaction.author.bot) {
        return;
    }

    const channel = interaction.channel
    if (channel.type !== 'DM' && channel.name === bugChannel) {

        if (!interaction.content) {
            await interaction.reply("Please describe your issue with text! Images alone aren't always enough to understand and debug the issue.")
                .then(msg =>
                    setTimeout(() => msg.delete(), 5000))
                .catch(err => console.log("There was an error deleting the reply", err));
            await interaction.delete();

        } else {
            const name = (interaction.content.length < 100) ? interaction.content : interaction.content.slice(0, 100).concat('...')
            const thread = await interaction.startThread({ name: name })
            if (thread) {
                thread.send(BUG_REPORT_MESSAGE)
            }
        }

    }
}
