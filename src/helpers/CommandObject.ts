import { ContextMenuCommandBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, ContextMenuInteraction } from "discord.js";

export default interface CommandObject {
    data: SlashCommandBuilder | ContextMenuCommandBuilder;
    execute(interaction: CommandInteraction | ContextMenuInteraction): Promise<any>;
}
