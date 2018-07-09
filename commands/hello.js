module.exports = {
	name: 'hello',
	description: 'Just saying hello!',
	aliases: ['hi', 'sup'],
	guildonly: false,
	execute(message) {
		message.channel.send(`Hello there ${message.author}!`);
	},
};