const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "To show this message",
        usage: "[command]",
        aliases: ["commands", "help me", "pls help"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Commands von "+client.user.username, "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
        .setColor("BLUE")
        .setDescription(allcmds)
        .setFooter(`Für mehr Infos ${client.config.prefix}help [command]`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")
            let commandinfo = new MessageEmbed()
            .setTitle("Command: "+command.info.name+" info")
            .setColor("YELLOW")
            .setDescription(`
Name: ${command.info.name}
Beschreibung: ${command.info.description}
Nutzung: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Aliase: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}