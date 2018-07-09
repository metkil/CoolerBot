module.exports = {
  name: "links",
  description: "Links to various TCS related websites.",
  aliases: ["link", "amazon", "donate", "steam"],
  guildonly: false,
  execute(message) {
    message.channel.send(`Hello there ${message.author}!`);
  }

  // Code goes here.  Want to use what ever the good looking text fields is called.
};
