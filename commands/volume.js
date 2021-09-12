const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "Lautstärke anpassen",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Du musst dich in einem Sprachkanal befinden!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Es wird nichts gespielt!", message.channel);
    if (!args[0])return message.channel.send(`Aktuelle Lautstärke: **${serverQueue.volume}%**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('0-150!',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Ich setzte die Lautstärke auf: **${args[0]/1}/100**`)
    .setAuthor("Server Lautstärken Manager", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};