//@ts-check
//@ts-ignore

/**
 * @type {import('../typings.d').Command} 
 */
 module.exports = {
    name: "verify",
    aliases: ["verifymembership", "verify-membership"],
    cooldown: 0,
    globalCooldown: true,
    arguments: [],

    execute: async function({ client, message, args, flags }) { //May also use async execute or run: async, ASYNC IS NECESSARY!
        /*if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("You do not have administrator permissions!")
            return;
        }*/
        const A = client.guilds.cache.get('831637934134263828'); //TEST SERVER [B]
        const B = client.guilds.cache.get('770566120222228480'); //Winge Gaming and Bot Development
        const roleA = A.roles.cache.find(r => r.name === 'Second Test Role'); //Second Test Role
        const roleB = B.roles.cache.find(r => r.id === '818569670155305054'); //Role To Be Tested
        let stepOne = message.author; //stepOne defined the user object for the mentioned user
        let stepTwo = message.guild.member(stepOne); //stepTwo finds the member object used to give the roles in the guild it was used within
        //let stepThree = client.users.cache.get(stepOne) //Unused Code, does not work!
        let stepFour = B.members.fetch(stepOne) //fetch is a promise, everything below uses stepFive (usually written as member within .then!)
            .then(stepFive => {
                let stepSix = B.member(stepFive);
                if(stepSix.roles.cache.has(roleB.id)) {
                    stepTwo.roles.add(roleA)
                    message.reply("successful test")
                    //@ts-ignore
                } else if(!stepSix.roles.cache.has(roleB)) {
                    message.channel.send(`${stepSix} does not have ${roleB.name}`)
                } else if(!message.mentions) {
                    message.channel.send(`No user was mentioned!`)
                } else {
                    message.channel.send(`For some reason, this command has failed. Please check with the developer team!`)
                }
            })
            .then(console.log)
            .then(console.error);
//Little_Winge#7022 and OP-MapleSpace#4981 developed with cooperation
    }
}