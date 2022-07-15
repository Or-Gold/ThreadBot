import { Message, TextChannel } from "discord.js";
import { bugChannel } from "../../config.json"

const BUG_REPORT_MESSAGE =
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

export default async function bugReportExec(interaction: Message) {
    if (interaction.author.bot) {
        return;
    }
    const channel = interaction.channel
    const name = (interaction.content.length < 100) ? interaction.content : interaction.content.slice(0, 100).concat('...')
    if (channel.isText() && (channel as TextChannel).name == bugChannel) {
        const thread = await interaction.startThread({ name: name })
        if (thread) {
            thread.send(BUG_REPORT_MESSAGE)
        }
    }
}
