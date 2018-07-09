const { prefix } = require("../config.json");

module.exports = {
  name: "help",
  description: "Help with CoolerBot.",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 2,
  execute(message, args) {
    const { commands } = message.client;
    const data = [];

    if (!args.length) {
      data.push("Here's a list of all my commands:");
      data.push(commands.map(command => command.name).join(", "));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      );
    } else {
      if (!commands.has(args[0])) {
        return message.reply("That's not a valid command!");
      }

      const command = commands.get(args[0]);

      data.push(`**Name:** ${command.name}`);

      if (command.description)
        data.push(`**Description:** ${command.description}`);
      if (command.aliases)
        data.push(`**Aliases:** ${command.aliases.join(", ")}`);
      if (command.usage)
        data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

      data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
    }

    message.channel.send(data, { split: true });
  }
};
