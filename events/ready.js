module.exports = async (client) => {
  client.user.setActivity(`${client.guilds.cache.size} Server | !help | By LoKy`);
  //client.user.setActivity(`Wartungsarbeiten, es kann zu bugs kommen`);
  console.log(`[API] EINGELOGGT ALS: ${client.user.username}`);
};