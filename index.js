const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require ('fs');
const { TOKEN } = require('./token.js')

client.login(TOKEN);

client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande détecter.");

    commandes.forEach((f) => {
        
        let commande = require(`./Commandes/${f}`);
        console.log(`Le fichier de commande : ${f} a été chargé avec succès.`);

        client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`Il y a ${f.length} events en cours de chargement.`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });
});