const Discord = require('discord.js');
const fs = require('fs');
const fkconfig = require('../fkconfig.json');

module.exports.run = (client, message) => {
    if (message.member.lastMessageChannelID.includes("828253032491647016")) {
    message.delete()

        if (`${fkconfig["notifs-fk?"]}` === ":white_check_mark:") {

        client.channels.cache.get("484765007427665920").send(new Discord.MessageEmbed()
        .setColor(`${fkconfig["color"]}`)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
        .setDescription(`
        \n\n:person_frowning: Hôte : **${message.author}**
        \n:clock10: Date : **${fkconfig["date"]}**
        \n:pick: Version de Minecraft : **${fkconfig["minecraft_version"]}**
        \n:globe_with_meridians: Version crackée (\`online-mode\`) : **${fkconfig["online-mode?"]}**
        \n:beginner: Nombre d\'équipes : **${fkconfig["teams_count"]}**
        \n:busts_in_silhouette: Nombre de joueurs par équipe : **${fkconfig["team_size"]}**
        \n:angel: Présence d\'un Dieu : **${fkconfig["god?"]}**
        \n:link: Serveur Discord : **${fkconfig["discord_server?"]}**
        \n:page_facing_up: Informations complémentaires : **${fkconfig["infos"]}**
        \n→ N'hésite pas à envoyer un message privé à ${message.author} pour obtenir plus de détails !
        \n\n<@&530837337597411338>
        \n\n:tools: Vous aussi, vous voulez créer votre **propre** annonce pour **votre** Fallen Kingdom ?
        \n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)
        `))
        message.channel.send("<@&530837337597411338>")
        message.delete()

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

        message.guild.channels.cache.get('828231320358486026').overwritePermissions([
            {
                id: message.guild.roles.everyone.id,
               allow: ['VIEW_CHANNEL'],
            }
          ]);
        } else {

            client.channels.cache.get("484765007427665920").send(new Discord.MessageEmbed()
            .setColor(`${fkconfig["color"]}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
            .setDescription(`
            \n\n:person_frowning: Hôte : **${message.author}**
            \n:clock10: Date : **${fkconfig["date"]}**
            \n:pick: Version de Minecraft : **${fkconfig["minecraft_version"]}**
            \n:globe_with_meridians: Version crackée (\`online-mode\`) : **${fkconfig["online-mode?"]}**
            \n:beginner: Nombre d\'équipes : **${fkconfig["teams_count"]}**
            \n:busts_in_silhouette: Nombre de joueurs par équipe : **${fkconfig["team_size"]}**
            \n:angel: Présence d\'un Dieu : **${fkconfig["god?"]}**
            \n:link: Serveur Discord : **${fkconfig["discord_server?"]}**
            \n:page_facing_up: Informations complémentaires : **${fkconfig["infos"]}**
            \n→ N'hésite pas à envoyer un message privé à ${message.author} pour obtenir plus de détails !
            \n\n:tools: Vous aussi, vous voulez créer votre **propre** annonce pour **votre** Fallen Kingdom ?
            \n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)
            `));
    
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

            message.guild.channels.cache.get('828253032491647016').overwritePermissions([
                {
                    id: message.guild.roles.everyone.id,
                   allow: ['VIEW_CHANNEL'],
                }
              ]);
              message.guild.channels.cache.get('828253032491647016').updateOverwrite(message.author.id, { VIEW_CHANNEL: null });
        }
    } else {
        message.delete()
        message.author.send(new Discord.MessageEmbed()
        .setColor('#AF1111')
        .setTitle("FallenBot - Erreur")
        .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
        .setDescription(`Les commandes doivent être exécutées exclusivement dans le salon <#828253032491647016> !`)
        )
    };
    }

module.exports.help = {
    name: "fksend"
}