const Discord = require("discord.js");
const fs = require("fs");

module.exports = (client, message) => {
  
    if(!message.content.startsWith("$")) return;

            const args = message.content.slice("$".length).trim().split(/ +/g);
        const commande = args.shift();
    
        const cmd = client.commands.get(commande);
    
        if(!cmd) return;
    
        cmd.run(client, message, args);
};