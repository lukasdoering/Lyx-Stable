const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');


module.exports = {
  info: {
    name: "afk",
    description: "Um 24/7 Wiedergabe zu aktivieren",
    usage: "[afk]",
    aliases: ["24/7"],
  },

  run: async function (client, message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
    if(!message.member.hasPermission('MANAGE_SERVER'))return sendError("Du hast nicht die nötige Berechtigung", message.channel);
    if (!afk[message.guild.id]) afk[message.guild.id] = {
      afk: false,
    };
    var serverQueue = afk[message.guild.id]
    if (serverQueue) {

      serverQueue.afk = !serverQueue.afk;
      message.channel.send({
        embed: {
          color: "GREEN",
          description: `💤  **|**  24/7 **\`${serverQueue.afk === true ? "an" : "aus"}\`**`
        }
      });
      return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
      });
    };
    return sendError("Es wird derzeit nichts abgespielt", message.channel);
  },
};