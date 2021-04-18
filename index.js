const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require ('fs');
const token = require('./token.json');


if (token["fallenbot_token"] === "PLACEZ LE TOKEN ICI") {
    console.warn("Attention: Le token n'a pas été défini ! Pour obtenir de l'aide → https://github.com/Etrenak/FallenKingdom/wiki/FallenBot")
} else {
client.login(token["fallenbot_token"])
    .catch(error => {
        console.error(`Erreur: Token invalide\n${error}`);
        process.exit(1);
    });
}

client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
    if (error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande détecter.");

    commandes.forEach((f) => {
        
        let commande = require(`./Commandes/${f}`);
        console.log(`Le fichier de commande : ${f} a été chargé avec succès.`);

        client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if (error) console.log(error);
    console.log(`Il y a ${f.length} events en cours de chargement.`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });
});