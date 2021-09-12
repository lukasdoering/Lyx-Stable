const { MessageEmbed } = require("discord.js")


module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(text)
    await channel.send(embed)
}