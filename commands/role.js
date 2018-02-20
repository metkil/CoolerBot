module.exports = {
    name: "role",
    description: "",
    aliases: [],
    usage: "<role1> [role2] [role3]",
    cooldown: 3,
    execute(message, args){
        var roles = args.join(" ").split(",");

        //Get rid of all the empty spaces if there are any
        roles = roles.map(function(role){
            return role.trim()
        }).filter(function(role){
            return role; //Filter out empty strings
        });

        if (roles.length == 0){
            message.channel.send(`${message.author} You didn't specify any roles.`);
            return;
        }

        message.react("👍");
        //@TODO Put the roles in the google docs sheet.
        //Just remember to limit it to 3 roles
    }
}
