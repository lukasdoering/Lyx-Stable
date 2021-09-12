const discord = require("discord.js");

module.exports = {
    info: {
        name: "leave",
        description: "Ich verlasse deinen Sprachkanal",
        usage: "[leave]",
        aliases: ["l"],
    },

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription("Goodbye!")
        .setColor("YELLOW")
        .setFooter(`${message.author.username}`)
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("Du musst dich in einem Sprachkanal befinden");

        await voiceChannel.leave();
        await message.channel.send(embed);
    }
}