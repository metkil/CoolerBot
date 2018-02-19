module.exports = {
	name: 'hello',
	description: 'Hello!',
	execute(message) {
		message.channel.send(`Hello there ${message.author}!`);
	},
};