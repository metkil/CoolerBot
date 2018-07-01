module.exports = {
	name: 'hello',
	description: 'Hello!',
	execute(message) {
		message.channel.send('YOU CAN\'T SILENCE ME!!');
	},

	// Code to silence goes here.  Discord permissions instead of SQLLite perhaps?
};