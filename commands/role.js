var self = module.exports = {
    name: "role",
    description: "",
    aliases: [],
    usage: "<role1> [role2] [role3]",
    cooldown: 0,
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

        self.queueSheetUpdate({
            username: message.author.username,
            roles: roles.slice(0, Math.min(3, roles.length))
        });
    },


    queuedObjects: [],
    lastTry: 0,
    interval: 5000,
    timeoutId: null,

    queueSheetUpdate(obj){
        self.queuedObjects.push(obj);
        self.tryUpdate();
    },

    tryUpdate(){
        var now = Date.now();

        if (now - self.lastTry > self.interval){
            self.lastTry = now;
            self.updateSheet(self.queuedObjects);
            self.queuedObjects = [];
        }else{
            if (module.exports.timeOutId){
                clearTimeout(self.timeOutId);
            }
            self.timeOutId = setTimeout(self.tryUpdate, self.interval);
            self.lastTry = now;
        }
    },

    updateSheet(objects){
        //@TODO Put the roles in the google docs sheet.
    }
}


