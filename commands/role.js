module.exports = {
    name: "role",
    description: "",
    aliases: [],
    usage: "<role1> [role2] [role3]",
    cooldown: 3,
    execute(message, args){
        var entireArgs = args.join(" ");
        var roles = entireArgs.split(",");

        if (roles.length == 1){
            message.channel.send(`${message.author} You didn't specify any roles.`);
            return;
        }

        //Get rid of all the empty spaces if there are any
        roles.map(function(role){
            role.trim()
        });

        //message.channel.send(roles);
        //@TODO Put the roles in the google docs sheet.
        //Just remember to limit it to 3 roles
    }
}
