import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, Collection } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Include if you need access to message content
  ],
});

import fs from "node:fs";
import path from "path";
const linksPath = path.join(process.cwd(), "resources", "links_dict.json");
const linksData = JSON.parse(fs.readFileSync(linksPath, "utf8"));

client.once("ready", () => {
  console.log("Ready!");
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync(path.join(process.cwd(), "commands"))
  .filter((file) => file.endsWith(".js"));

// Using dynamic import to load command modules
for (const file of commandFiles) {
  import(`./commands/${file}`).then((commandModule) => {
    client.commands.set(commandModule.name, commandModule);
  });
}

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!") || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (command) {
    try {
      await command.execute(message, args);
      return;
    } catch (error) {
      console.error(error);
      message.reply("There was an error trying to execute that command!");
      return;
    }
  }

  if (Object.hasOwnProperty.call(linksData, commandName)) {
    message.channel.send(linksData[commandName]);
    return;
  }
});

client.login('MTIxODg2NTkxNTYzOTIzODY2Ng.GlPk5M.8-eGn7NOSkTfw9_SGiHd77VFjFr4b-RH0T-3lI');
