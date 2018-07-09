module.exports = {
	name: 'nextop',
	description: 'Time until next operation.',
	execute(message) {
		const day = new Date();
		const d = day.getDay();
		const h = day.getHours();
		const m = day.getMinutes();
		switch (d) {
		case 0:
		case 1:
		case 2:
			if (h < 24) {
				var daysLeft = (3 - d);
				var hoursLeft = h;
				if (h < 20) {
					hoursLeft = (19 - h);
				}
				else {
					daysLeft = daysLeft - 1;
					hoursLeft = (43 - h);
				}
				var minLeft = (59 - m);
				message.channel.send(`Next Operation: Wednesday Wars!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Wednesday at 8PM EST/EDT.`);
			}
			break;
		case 3:
			if (h < 20) {
				daysLeft = (3 - d);
				hoursLeft = (19 - h);
				minLeft = (59 - m);
				message.channel.send(`Next Operation: Wednesday Wars!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Wednesday at 8PM EST/EDT.`);
			}
			if (h >= 20 && h <= 23) {
				message.channel.send('Wednesday Wars is live RIGHT NOW!  Get in the server!');
			}
			if (h > 23) {
				daysLeft = (5 - d);
				hoursLeft = (19 - h);
				minLeft = (59 - m);
				message.channel.send(`Next Operation: Training Ops.  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Wednesday at 8PM EST/EDT.`);
			}
			break;
		case 4:
			if (h < 24) {
				daysLeft = (5 - d);
				hoursLeft = (23 - h);
				minLeft = (59 - m);
				message.channel.send(`Next Operation: Training Ops.  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Friday at 8PM EST/EDT.`);
			}
			break;
		case 5:
			if (h < 20) {
				daysLeft = (5 - d);
				hoursLeft = (19 - h);
				minLeft = (59 - m);
				message.channel.send(`Next Operation: Training Ops.  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Friday at 8PM EST/EDT.`);
			}
			if (h >= 20 && h <= 23) {
				message.channel.send('Training Ops is live RIGHT NOW!  Get in the server!');
			}
			if (h > 23) {
				daysLeft = (6 - d);
				hoursLeft = (19 - h);
				minLeft = (59 - m);
				message.channel.send(`Next Operation: Saturday Night Ops!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Saturday at 9PM EST/EDT.`);
			}
			break;
		case 6:
			if (h < 20) {
				daysLeft = (6 - d);
				hoursLeft = (20 - h);
				minLeft = (59 - m);
				message.channel.send(`Next Operation: Saturday Night Ops!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Saturday at 9PM EST/EDT.`);
			}
			else if (h >= 20 && h < 21) {
				minLeft = (59 - m);
				message.channel.send(`Role Selection for Saturday Night Ops has begun.  Mission goes live in ${minLeft} minutes.  For signup information type !signup.`);
			}
			else if (h >= 21) {
				message.channel.send('Saturday Night Ops is live RIGHT NOW!  Get in the server!');
			}
			break;
		}
	},
};