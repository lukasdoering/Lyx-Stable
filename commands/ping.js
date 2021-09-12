const discord = require('discord.js');
module.exports = {
    info: {
        name: "ping",
        description: "Ping anzeigen",
        usage: "[ping]",
        aliases: ["pg"],
    },

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription(`Pong - ${client.ws.ping}ms`)
        .setColor("BLUE")
        .setFooter(`Erwünscht von: ${message.author.username}`)

        message.channel.send(embed)
    },
}