//@ts-check
//@ts-ignore

/**
 * @type {import('../typings.d').Command} 
 */
 module.exports = {
    name: "ban",
    cooldown: 0,
    globalCooldown: true,
    arguments: [],

    execute: async function({ client, message, args, flags }) {
        const Bans = require('../../schemas/bans.js');
        const guild1 = client.guilds.cache.get(''); //Enter any ID here
        const guild2 = client.guilds.cache.get(''); //Enter any ID here
        //const guild3 = client.guilds.cache.get('');
        //const guild4 = client.guilds.cache.get('');
        const bannedUser = message.mentions.users.first();
        if(message.member.hasPermission('ADMINISTRATOR')) {
            if(!bannedUser) {
                message.channel.send(`No user was mentioned for the ban`)
            } else if(!args.slice(1).join(" ")) { //Check if reason provided
                message.channel.send("You did not provide a reason");
                return;
            } else {
                guild1.members.ban(bannedUser); //Ban users
                guild2.members.ban(bannedUser);
                Bans.findOne( //MongoDB save the ban data.
                    { Guild: message.guild.id, User: bannedUser.id },
                    async (err, data) => {
                        if (err) console.log(err);
                        if (!data) {
                          let newBans = new Bans({
                            User: bannedUser.id,
                            Guild: [
                                {
                                    Initial_Guild: message.guild.id,
                                    Guild_One: guild1.id,
                                    Guild_Two: guild2.id,
                                },
                            ],
                            Bans: [
                              {
                                Moderator: message.author.id,
                                Reason: args.slice(1).join(" "),
                              },
                            ],
                          });
                          newBans.save();
                          message.channel.send(
                            `${bannedUser.tag} has been banned with the reason of ${args
                              .slice(1)
                              .join(" ")}.`
                          );
                        } else {
                          data.Bans.unshift({
                            Moderator: message.author.id,
                            Reason: args.slice(1).join(" "),
                          });
                          data.save();
                          message.channel.send(
                            `${bannedUser.tag} has been banned with the reason of ${args
                              .slice(1)
                              .join(" ")}.`
                              );
                            }
                          }
                        );
                      }
                    };
                }
            }
