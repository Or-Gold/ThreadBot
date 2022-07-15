import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import fs from "fs"
import { token, clientId } from "../config.json"
import CommandObject from "./CommandObject";

const commands = [];

const commandDirs = fs.readdirSync('./src/commands');

for (const dir of commandDirs) {
    const commandFiles = fs
        .readdirSync(`./src/commands/${dir}`)
        .filter((file: string) => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const command: CommandObject = require(`../commands/${dir}/${file}`);
        commands.push(command.data.toJSON());
    }
}
console.log(commands);
const rest = new REST({ version: '10' }).setToken(token);
rest.put(Routes.applicationCommands(clientId), { body: commands }).
    then(() => console.log("Successfully registered application slash commands!")).
    catch(err => console.log(err));

