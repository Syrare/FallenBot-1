const Discord = require('discord.js');
const fs = require('fs');
const fkconfig = require('../fkconfig.json');
const infos = require('../infos.json');
const fkChannel = "828253032491647016"; // ID de #créez-votre-fk
const fkAnnouncementChannel = "484765007427665920"; // ID de #orga-fk-annonces

module.exports.run = async(client, message) => {
    if (message.author.id != "827879220214366268") {
        message.delete()
        message.author.send(new Discord.MessageEmbed()
    .setColor('#AF1111')
    .setTitle("FallenBot - Erreur")
    .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
    .setDescription(`Vous ne pouvez pas exécuté cette commande.`));
    } else { 


        if (`${fkconfig["notifs-fk?"]}` === ":white_check_mark:") {
            infos["fkAnnouncmentSent"] = infos["fkAnnouncmentSent"] + 1;
            fs.writeFileSync('./infos.json', JSON.stringify(infos));

        client.channels.cache.get(fkAnnouncementChannel).send(new Discord.MessageEmbed()
        .setColor(`${fkconfig["color"]}`)
        .setAuthor(`${infos["latestUserTag"]}`, `${infos["latestUserAvatar"]}`)
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
        \n→ N'hésite pas à envoyer un message privé à <@${infos["latestUserID"]}> pour obtenir plus de détails !
        \n\n<@&530837337597411338>
        \n\n:tools: Vous aussi, vous voulez créer votre **propre** annonce pour **votre** Fallen Kingdom ?
        \n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)`)
        .setFooter(`Ceci est l'annonce n°${infos["fkAnnouncmentSent"]} envoyée par FallenBot !`)
        );
        client.channels.cache.get(fkAnnouncementChannel).send("<@&530837337597411338>"/*← ID du rôle @Notif FK*/).then(msg => msg.delete({timeout: 500}));

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

        message.guild.channels.cache.get(fkChannel).overwritePermissions([
            {
                id: message.guild.roles.everyone.id,
               allow: ['VIEW_CHANNEL'],
            }
          ]);
          message.guild.channels.cache.get(fkChannel).updateOverwrite(infos["latestUserID"], { VIEW_CHANNEL: null });
          infos["latestUserID"] = "";
          infos["latestUserUsername"] = "";
          infos["latestUserTag"] = "";
          infos["latestUserAvatar"] = "";
          fs.writeFileSync('./infos.json', JSON.stringify(infos))
        } else {
            infos["fkAnnouncmentSent"] = infos["fkAnnouncmentSent"] + 1;
            fs.writeFileSync('./infos.json', JSON.stringify(infos));

            client.channels.cache.get(fkAnnouncementChannel).send(new Discord.MessageEmbed()
            .setColor(`${fkconfig["color"]}`)
            .setAuthor(`${infos["latestUserTag"]}`, `${infos["latestUserAvatar"]}`)
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
            \n→ N'hésite pas à envoyer un message privé à <@${infos["latestUserID"]}> pour obtenir plus de détails !
            \n\n:tools: Vous aussi, vous voulez créer votre **propre** annonce pour **votre** Fallen Kingdom ?
            \n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)`)
            .setFooter(`Ceci est l'annonce n°${infos["fkAnnouncmentSent"]} envoyée par FallenBot !`)
            );
    
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

            message.guild.channels.cache.get(fkChannel).overwritePermissions([
                {
                    id: message.guild.roles.everyone.id,
                   allow: ['VIEW_CHANNEL'],
                }
              ]);
              message.guild.channels.cache.get(fkChannel).updateOverwrite(infos["latestUserID"], { VIEW_CHANNEL: null });
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