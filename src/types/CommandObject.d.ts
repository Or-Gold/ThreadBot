import { ContextMenuInteraction, SlashCommandBuilder, ContextMenuCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import ThreadBot from "../ThreadBot";

export default interface CommandObject {
    data: SlashCommandBuilder | ContextMenuCommandBuilder;
    execute(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction): Promise<any>;
}
