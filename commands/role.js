module.exports = {
    name: "role",
    description: "",
    aliases: [],
    usage: "<role1> [role2] [role3]",
    cooldown: 3,
    execute(message, args){
        var entireArgs = args.join(" ");
        var roles = entireArgs.split(",");

        //Get rid of all the empty spaces if there are any
        roles.map(function(role){
            role.trim()
        });
        roles = roles.filter(function(role){
            return role; //Filter out empty strings
        });
        //I have no idea why chaining map and filter didn't work even though it should

        if (roles.length == 0){
            message.channel.send(`${message.author} You didn't specify any roles.`);
            return;
        }

        message.react("👍");
        //@TODO Put the roles in the google docs sheet.
        //Just remember to limit it to 3 roles
    }
}
