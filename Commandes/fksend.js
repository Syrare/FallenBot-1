const Discord = require('discord.js');
const fs = require('fs');
const fkconfig = require('../fkconfig.json');
const infos = require('../infos.json');
const config = require('../config.json');

module.exports.run = async(client, message) => {
    message.delete();
    let messageAuthor = message.guild.member(infos["latestUserID"]);

    if (message.author.id != client.user.id) {
        message.author.send(new Discord.MessageEmbed()
        .setColor('#AF1111')
        .setTitle("FallenBot - Erreur")
        .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
        .setDescription(`Une erreur s'est produite. Cette commande ne doit pas être exécutée.\n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)`)
        );
    } else {
        messageAuthor.send(new Discord.MessageEmbed()
        .setColor('#137911')
        .setTitle("FallenBot")
        .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
        .setDescription(`Nous vous remercions d'avoir utilisé [FallenBot](https://github.com/IkaRio198/FallenBot) !\n       → N'hésitez pas à nous laisser un avis dans <#353483147582636032> !`)
        );
        infos["fkAnnouncementSent"] = infos["fkAnnouncementSent"] + 1;
        fs.writeFileSync('./infos.json', JSON.stringify(infos));
        const fkFinalEmbed = new Discord.MessageEmbed()
        .setColor(fkconfig["color"])
        .setAuthor(infos["latestUserTag"], infos["latestUserAvatar"])
        .setTitle(`Fallen Kingdom organisé par ${infos["latestUserUsername"]}`)
        .setDescription(`
        \n\n:person_frowning: Hôte : **<@${infos["latestUserID"]}>**
        \n:clock10: Date : **${fkconfig["date"]}**
        \n:pick: Version de Minecraft : **${fkconfig["minecraft_version"]}**
        \n:globe_with_meridians: Version crackée (\`online-mode\`) : **${fkconfig["online-mode?"]}**
        \n:beginner: Nombre d\'équipes : **${fkconfig["teams_count"]}**
        \n:busts_in_silhouette: Nombre de joueurs par équipe : **${fkconfig["team_size"]}**
        \n:angel: Présence d\'un Dieu : **${fkconfig["god?"]}**
        \n:link: Serveur Discord : **${fkconfig["discord_server?"]}**
        \n:page_facing_up: Informations complémentaires : **${fkconfig["infos"]}**
        \n→ N'hésitez pas à envoyer un message privé à <@${infos["latestUserID"]}> pour obtenir plus de détails !
        \n\n:tools: Vous aussi, vous voulez créer votre **propre** annonce pour **votre** Fallen Kingdom ?
        \n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)`)
        .setFooter(`Ceci est l'annonce n°${infos["fkAnnouncementSent"]} envoyée par FallenBot !`)

        if (fkconfig["notifs-fk?"] === ":white_check_mark:") {

        client.channels.cache.get(config["fk-announcement_channel-id"]).send(`<@&${config["notif-fk_role-id"]}>`, { embed: fkFinalEmbed });

        fkconfig["date"] = "Indéfinie";
        fkconfig["minecraft_version"] = "Indéfinie";
        fkconfig["online-mode?"] = ":x:";
        fkconfig["teams_count"] = "Indéfini";
        fkconfig["team_size"] = "Indéfini";
        fkconfig["god?"] = ":x:";
        fkconfig["discord_server?"] = ":x:";
        fkconfig["notifs-fk?"] = ":white_check_mark:";
        fkconfig["infos"] = "Aucune information complémentaire";
        fkconfig["color"] = "#137911";
        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))

        message.guild.channels.cache.get(config["fk-config_channel-id"]).overwritePermissions([
            {
                id: message.guild.roles.everyone.id,
               allow: ['VIEW_CHANNEL'],
            }
          ]);
          message.guild.channels.cache.get(config["fk-config_channel-id"]).updateOverwrite(infos["latestUserID"], { VIEW_CHANNEL: null });
          infos["latestUserID"] = "";
          infos["latestUserUsername"] = "";
          infos["latestUserTag"] = "";
          infos["latestUserAvatar"] = "";
          fs.writeFileSync('./infos.json', JSON.stringify(infos))
        } else {

            client.channels.cache.get(config["fk-announcement_channel-id"]).send(fkFinalEmbed);
    
            fkconfig["date"] = "Indéfinie";
            fkconfig["minecraft_version"] = "Indéfinie";
            fkconfig["online-mode?"] = ":x:";
            fkconfig["teams_count"] = "Indéfini";
            fkconfig["team_size"] = "Indéfini";
            fkconfig["god?"] = ":x:";
            fkconfig["discord_server?"] = ":x:";
            fkconfig["notifs-fk?"] = ":white_check_mark:";
            fkconfig["infos"] = "Aucune information complémentaire";
            fkconfig["color"] = "#137911";
            fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig));

            message.guild.channels.cache.get(config["fk-config_channel-id"]).overwritePermissions([
                {
                    id: message.guild.roles.everyone.id,
                   allow: ['VIEW_CHANNEL'],
                }
              ]);
              message.guild.channels.cache.get(config["fk-config_channel-id"]).updateOverwrite(infos["latestUserID"], { VIEW_CHANNEL: null });
              infos["latestUserID"] = "";
              infos["latestUserUsername"] = "";
              infos["latestUserTag"] = "";
              infos["latestUserAvatar"] = "";
              fs.writeFileSync('./infos.json', JSON.stringify(infos))
        }
  }
}
    

module.exports.help = {
    name: "fksend"
}