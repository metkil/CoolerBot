const Discord = require("discord.js");
const client = new Discord.Client();
const config = require ("./cb_config.json");
const sql = require("sqlite");
const talkedRecently = new Set();

let google = require("googleapis");
let pkey = require("./gauth.json"); //if using google api, provide your own gauth.json

let jwtClient = new google.auth.JWT (
  pkey.client_email,
  null,
  pkey.private_key,
  ["https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/calendar"]);
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Google Auth successfully connnected.");
  }
});

let spreadsheetId = "Your spreadsheet id";
let range = "L2:P36";
let sheets = google.sheets("v4");
let signupActive = false;
let uidList = [];
let rolecount = 1;

sql.open("./tcsPerm.sqlite");

client.login(config.token);

client.on("ready", () => {
  if (client.user.username != `${config.botName}`) {
    client.user.setUsername(`${config.botName}`);
    console.log (`Changed username to ${config.botName}`);}
  client.user.setGame(`on ${config.verison}.  !help`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

client.on("message", (message) => {

  //checks if user is silenced
  sql.get(`SELECT * FROM tcsPerms WHERE userID = "${message.author.id}"`).then(sCheck => {
    if (!sCheck) {
      sql.run("INSERT INTO tcsPerms (userID, display, isTrust, isAdvT, isSil) VALUES (?,?,?,?,?)", [message.author.id, message.author.username, 0, 0, 0]);
    }
    else if (sCheck.isSil == 1) {
      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author}`))
        .catch(console.error);
    }
    return;
  });

  /*
  //auto lol for Halliday
  if (message.author.id == 107544395879825408) {
    message.channel.send("lol");
  }
  */

  /*
  //Science purging the weebs
  if (message.content.search(/anime/i) >-1)
    if (message.author.bot)
      return;
    else {
      message.channel.send("Anime belongs in the trash. https://www.youtube.com/watch?v=IUhIY4GcL2w");
    }
  */

  //do nothing if no prefix or command by bot
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (talkedRecently.has(message.author.id))
    return;

  //user command cooldown, 2.5 seconds between commands
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);

  const cArgs = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = cArgs.shift().toLowerCase();

  if (command == "vdv") {
    message.channel.send("https://www.youtube.com/watch?v=0rAHrHd2lcw");
  }

  if (command === "about") {
    message.channel.send(`Hello my name is ${config.botName}.  I was created by ${config.author} to provide a better Discord experience for the members of The Cooler Server.  I am currently running on ${config.verison}.  Please bare with me as I am still in the early stages of development.  I'll have more features to show off in the future!  If you need any help understanding what to do with me, just type !help into the chat.`);
    return;
  }

  if (command === "hello") {
    message.channel.send(`Hello there ${message.author}!`);
    return;
  }

  if (command === "nextop") {
    const day = new Date();
    const d = day.getDay();
    const h = day.getHours();
    const m = day.getMinutes();
    switch (d) {
    case 0:
    case 1:
    case 2:
      if (h < 24) {
        var daysLeft = (3-d);
        var hoursLeft = h;
        if (h < 20) {
          hoursLeft = (19-h);
        }
        else {
          daysLeft = daysLeft - 1;
          hoursLeft = (43-h);
        }
        var minLeft = (59-m);
        message.channel.send(`Next Operation: Wednesday Wars!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Wednesday at 8PM EST/EDT.`);
      }
      break;
    case 3:
      if (h < 20) {
        daysLeft = (3-d);
        hoursLeft = (19-h);
        minLeft = (59-m);
        message.channel.send(`Next Operation: Wednesday Wars!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Wednesday at 8PM EST/EDT.`);
      }
      if (h >= 20 && h <= 23) {
        message.channel.send("Wednesday Wars is live RIGHT NOW!  Get in the server!");
      }
      if (h > 23) {
        daysLeft = (5-d);
        hoursLeft = (19-h);
        minLeft = (59-m);
        message.channel.send(`Next Operation: Training Ops.  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Wednesday at 8PM EST/EDT.`);
      }
      break;
    case 4:
      if (h < 24) {
        daysLeft = (5-d);
        hoursLeft = (23-h);
        minLeft = (59-m);
        message.channel.send(`Next Operation: Training Ops.  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Friday at 8PM EST/EDT.`);
      }
      break;
    case 5:
      if (h < 20) {
        daysLeft = (5-d);
        hoursLeft = (19-h);
        minLeft = (59-m);
        message.channel.send(`Next Operation: Training Ops.  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Friday at 8PM EST/EDT.`);
      }
      if (h >= 20 && h <= 23) {
        message.channel.send("Training Ops is live RIGHT NOW!  Get in the server!");
      }
      if (h > 23) {
        daysLeft = (6-d);
        hoursLeft = (19-h);
        minLeft = (59-m);
        message.channel.send(`Next Operation: Saturday Night Ops!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Saturday at 9PM EST/EDT.`);
      }
      break;
    case 6:
      if (h < 20) {
        daysLeft = (6-d);
        hoursLeft = (20-h);
        minLeft = (59-m);
        message.channel.send(`Next Operation: Saturday Night Ops!  Starts in ${daysLeft} days, ${hoursLeft} hours, and ${minLeft} minutes. Every Saturday at 9PM EST/EDT.`);
      }
      else if (h >=20 && h < 21) {
        minLeft = (59-m);
        message.channel.send(`Role Selection for Saturday Night Ops has begun.  Mission goes live in ${minLeft} minutes.  For signup information type !signup.`);
      }
      else if (h >= 21) {
        message.channel.send("Saturday Night Ops is live RIGHT NOW!  Get in the server!");
      }
      break;
    }
    return;
  }

  if (command === "roster") {
    message.channel.send("https://docs.google.com/spreadsheets/d/1ObWkVSrXvUjron4Q9hK6Fy_sYWE1b-w135A7CPGfwBs");
    return;
  }

  if (command === "signup") {
    message.channel.send("You can sign up for events here: http://www.thecoolerserver.com/events");
    return;
  }

  if (command === "silence") {
    if(message.member.roles.has(config.adminID) || message.member.roles.has(config.modID) || message.member.id == config.ownerID) {
      let member = message.mentions.members.first();
      const args = message.content.split(/\s+/g);
      if (args.length == 1) {
        message.channel.send("Undefined time and user.  Please mention the user to be silence and an amount of time in minutes.");
      }
      else if (args.length == 2) {
        message.channel.send("Undefined time.  Please include an amount of time in minutes.");
      }
      else {
        sql.run(`UPDATE tcsPerms SET isSil = 1 WHERE userID = ${member.id}`);
        setTimeout(() => {
          sql.run(`UPDATE tcsPerms SET isSil = 0 WHERE userID = ${member.id}`);}, args[2]*60000);
      }
    }
    else {
      message.channel.send("This command is only for administrators and moderators.");
    }
    return;
  }

  if (command === "unsilence") {
    if(message.member.roles.has(config.adminID) || message.member.roles.has(config.modID) || message.member.id == config.ownerID) {
      let member = message.mentions.members.first();
      const args = message.content.split(/\s+/g);
      if (args.length == 1) {
        message.channel.send("Undefined user.  Please mention the user to be silence and an amount of time in minutes.");
      }
      else {
        sql.run(`UPDATE tcsPerms SET isSil = 0 WHERE userID = ${member.id}`);
      }
    }
    else {
      message.channel.send("This command is only for administrators and moderators.");
    }
    return;
  }

  if (command === "startsignup") {
    if(message.member.roles.has(config.adminID) || message.member.roles.has(config.modID) || message.member.id == config.ownerID) {
      signupActive = true;
      message.channel.send("@everyone Roster signup for tonight's operation is now live!  Please use the !role command to submit your desired roles to the roster. https://docs.google.com/spreadsheets/d/1ObWkVSrXvUjron4Q9hK6Fy_sYWE1b-w135A7CPGfwBs");
      setTimeout(() => {
        signupActive = false;
      }, 5400000);
    }
    return;
  }

  if (command === "stopsignup") {
    if(message.member.roles.has(config.adminID) || message.member.roles.has(config.modID) || message.member.id == config.ownerID) {
      signupActive = false;
      message.channel.send("Sign up for tonight's operation has concluded.  Please refer to the roster for your assigned postition and role.  Good luck and have fun.");
      uidList.length = 0;
      rolecount = 0;
    }
    return;
  }

  if (command === "role") {
    let input = message.content.replace(/,/g, "");
    const args = input.split(/\s+/g);
    let user = message.member.displayName;
    var values = [
      [rolecount, user, args[1], args[2], args[3]]
    ];
    var body = {
      values : values
    };
    if (signupActive) {
      sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: "L1:M35"
      }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          //let aconvert = result.values.toString();
          //if (aconvert.includes(user)) {
            //message.react("👎");
          if (uidList.indexOf(message.member.id) != -1) {
            message.react("👎");
          } else {
            sheets.spreadsheets.values.append({
              auth: jwtClient,
              spreadsheetId: spreadsheetId,
              range: range,
              valueInputOption: 'RAW',
              resource: body
            }, function(err, result) {
              if (err) {
                console.log(err);
              } else {
                message.react("👍");
                uidList.push(message.member.id);
                rolecount++;
              }
            });
          }
        }
      });
    }
    return;
  }

  if (command === "react") {
    message.react("👍");
    return;
  }

  if (command === "dosh") {
    message.channel.send("https://www.youtube.com/watch?v=ULeDlxa3gyc");
    return;
  }  

  /*if (command === "ssdev") {
    if (signupActive) {
      signupActive = false;
      uidList.length = 0;
    }
    else {
      signupActive = true;
    }
  }

  if (command === "nndev") {
    message.channel.send (`UID: ${message.member.id}, Discord Username: ${message.author.username}, Server Nickname: ${message.member.displayName}`);
  }*/

  if (command === "help") {
    const args = message.content.split(/\s+/g);
    if (message.member.roles.has(config.adminID) || message.member.roles.has(config.modID) || message.member.id == config.ownerID) {
      if (args.length == 1) {
        message.channel.send("Available Commands: !about, !hello, !nextop, !roster, !signup, !role, !silence, !startsignup, !stopsignup. \n \n For more information on a specific command, type !help <command>");
      } else {
        if (args[1] == "!help") {
          message.channel.send("You just asked for help with the help command.  You must be a certain kind of special.  Well, since you are here, the help commands allows users to better understand the purpose of the command and how to use it properly.  Now buzz off.");
        }
        else if (args [1] == "!about") {
          message.channel.send("Gives you more information about me!");
        }
        else if (args [1] == "!hello") {
          message.channel.send("Just saying hello.");
        }
        else if (args [1] == "!nextop") {
          message.channel.send("Informs you of when the next operation is scheduled to take place.");
        }
        else if (args [1] == "!roster") {
          message.channel.send("Provides a link to the command roster used in Saturday Night Ops.");
        }
        else if (args [1] == "!signup") {
          message.channel.send("Provides a link to the TCS Events page to signup.");
        }
        else if (args [1] == "!role") {
          message.channel.send("Used to submit your roles to the roster.  Only works after an admin or moderator has issued the !startsignup command.  Usage: !role <role 1>, <role 2>, <role 3>.");
        }
        else if (args [1] == "!silence") {
          message.channel.send("Makes a user unable to send messages to the server.  Usage: !silence @user <time in minutes>");
        }
        else if (args [1] == "!silence") {
          message.channel.send("Unsilences a previously silenced user.  Usage: !unsilence @user");
        }
        else if (args [1] == "!startsignup") {
          message.channel.send("Used to start the roster signup process.  Allows users to use the !role command.");
        }
        else if (args [1] == "!stopsignup") {
          message.channel.send("Stops the roster signup process and disables the !role command.");
        }
      }
    } else {
      if (args.length == 1) {
        message.channel.send("Available Commands: !about, !hello, !nextop, !roster, !signup, \n \n For more information on a specific command, type !help <command>");
      }
      else {
        if (args[1] == "!help") {
          message.channel.send("You just asked for help with the help command.  You must be a certain kind of special.  Well, since you are here, the help commands allows users to better understand the purpose of the command and how to use it properly.  Now buzz off.");
        }
        else if (args [1] == "!about") {
          message.channel.send("Gives you more information about me!");
        }
        else if (args [1] == "!hello") {
          message.channel.send("Just saying hello.");
        }
        else if (args [1] == "!nextop") {
          message.channel.send("Informs you of when the next operation is scheduled to take place.");
        }
        else if (args [1] == "!roster") {
          message.channel.send("Provides a link to the command roster used in Saturday Night Ops.");
        }
        else if (args [1] == "!signup") {
          message.channel.send("Provides a link to the TCS Events page to signup.");
        }
        else if (args [1] == "!role") {
          message.channel.send("Used to submit your roles to the roster.  Only works after an admin or moderator has issued the !startsignup command. Usage: !role <role 1>, <role 2>, <role 3>.");
        }
      }
    }
  }
});
