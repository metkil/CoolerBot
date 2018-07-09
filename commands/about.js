const { botName, verison, author } = require("../config.json");

module.exports = {
  name: "hello",
  description: "Just saying hello!",
  aliases: ["hi", "sup"],
  guildonly: false,
  execute(message) {
    message.channel.send(
      `Hello my name is ${botName}.  I was created by ${author} to provide a better Discord experience for the members of The Cooler Server.  I am currently running on ${verison}.  Please bare with me as I am still in the early stages of development.  I'll have more features to show off in the future!  If you need any help understanding what to do with me, just type !help into the chat.`
    );
  }
};
