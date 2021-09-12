require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('[API] Lyx ist derzeit online'));
app.listen(port, () => console.log(`[API] host: http://localhost:${port}`));

const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.queue = new Map();

client.config = {
  prefix: process.env.PREFIX
}

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("[API] Lade Event: " + eventName)
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("[API] Lade command:  " + commandName)
  });
});


client.login(process.env.TOKEN)
