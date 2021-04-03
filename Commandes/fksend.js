const Discord = require('discord.js');
const fs = require('fs');
const fkconfig = require('../fkconfig.json');

module.exports.run = (client, message) => {

        if (`${fkconfig["notifs-fk?"]}` === ":white_check_mark:") {

        client.channels.cache.get("484765007427665920").send(new Discord.MessageEmbed()
        .setColor('#137911')
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
        .setDescription(`
        \n\n:person_frowning: Hôte : ${message.author}
        \n:clock10: Date : ${fkconfig["date"]}
        \n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}
        \n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}
        \n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}
        \n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}
        \n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}
        \n:link: Serveur Discord : ${fkconfig["discord_server?"]}
        \n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}
        \n\n<@&530837337597411338>
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
        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
        } else {

            client.channels.cache.get("484765007427665920").send(new Discord.MessageEmbed()
            .setColor('#137911')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
            .setDescription(`
            \n\n:person_frowning: Hôte : ${message.author}
            \n:clock10: Date : ${fkconfig["date"]}
            \n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}
            \n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}
            \n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}
            \n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}
            \n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}
            \n:link: Serveur Discord : ${fkconfig["discord_server?"]}
            \n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}
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
            fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
        }
    }

module.exports.help = {
    name: "fksend"
}