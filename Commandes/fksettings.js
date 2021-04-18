const Discord = require('discord.js');
const fs = require('fs');
const expirationTime = 300000; 
const config = require('../config.json');
const infos = require('../infos.json');

module.exports.run = async(client, message) => {
        message.delete();

        if (message.member.hasPermission('ADMINISTRATOR')) {

    let configFile = `Aperçu du fichier de configuration :\n\`\`\`json\n{\n    "fk-config_channel-id":"${config["fk-config_channel-id"]}",\n    "fk-announcement_channel-id":"${config["fk-announcement_channel-id"]}",\n    "notif-fk_role-id":"${config["notif-fk_role-id"]}"\n}\n\`\`\`\n__**Salon de configuration :**__ ${infos["fk-config_channel"]}\n__**Salon des annonces :**__ ${infos["fk-announcement_channel"]}\n__**Rôle des notifications :**__ ${infos["notif-fk_role"]}`;
    
    let editingconfigFile = await message.channel.send(configFile)
    
    const messageAwait = await message.channel.send("Veuillez patienter pendant l'ajout des réactions...");
    
    await Promise.all(['⚙️','📣','🔔','✅','❌'].map(r => messageAwait.react(r)))
    
    await messageAwait.edit(`:gear: **Définir le salon de configuration.**\n:mega: **Définir le salon des annonces.**\n:bell: **Définir le rôle des notifications.**\n:white_check_mark: **Valider et quitter.**\n:x: **Réinitialiser les valeurs.**\n\n__Exécutez __\`cancel\`__ après une demande pour annuler.__`)
    
    const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
    const filterMessage = (m) => m.author.id === message.author.id || m.author.bot;

    const collectorReaction = await new Discord.ReactionCollector(messageAwait, filterReaction);
    collectorReaction.on('collect', async reaction => {
        switch(reaction._emoji.name) {

            case '⚙️':
                reaction.users.remove(message.author.id)
                const messageQuestionConfigChannel = await message.channel.send("Quel est le salon de configuration ?")
                let firstMessageConfigChannel = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageConfigChannel) {
                firstMessageConfigChannel = `${config["fk-config_channel-id"]}`
                fs.writeFileSync('./config.json', JSON.stringify(config))
                message.channel.send("**Annulation... le temps de réponse a expiré.**")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, 5000);
                } else {
                let fkConfig_Channel = firstMessageConfigChannel.content;

                if (fkConfig_Channel === "cancel") {
                message.channel.bulkDelete(2, true)
                } else {
                    let itIsAVerifConfigChannel = null;
                    let fkConfig_ChannelId = "";

                    if (!isNaN(fkConfig_Channel)) {
                    let verifConfigChannel = client.channels.cache.has(fkConfig_Channel);

                    if (verifConfigChannel === true && client.channels.cache.get(fkConfig_Channel).type === "text") {
                    itIsAVerifConfigChannel = true;
                    fkConfig_ChannelId = fkConfig_Channel;
                    fkConfig_Channel = `<#${fkConfig_ChannelId}>`;
                    } else 
                    itIsAVerifConfigChannel = false;
                    }

                    if (isNaN(fkConfig_Channel) && fkConfig_Channel.startsWith("<#") && fkConfig_Channel.endsWith(">")) {
                    fkConfig_ChannelId = fkConfig_Channel.slice(2, -1);
                    if (client.channels.cache.has(fkConfig_ChannelId) === true && client.channels.cache.get(fkConfig_ChannelId).type === "text")
                    itIsAVerifConfigChannel = true;
                    else
                    itIsAVerifConfigChannel = false;
                    }

                    if (itIsAVerifConfigChannel === true) {
                        
                        config["fk-config_channel-id"] = fkConfig_ChannelId;
                        fs.writeFileSync('./config.json', JSON.stringify(config))
                        infos["fk-config_channel"] = fkConfig_Channel
                        fs.writeFileSync('./infos.json', JSON.stringify(infos))
    
                        configFile = `Aperçu du fichier de configuration :\n\`\`\`json\n{\n    "fk-config_channel-id":"${config["fk-config_channel-id"]}",\n    "fk-announcement_channel-id":"${config["fk-announcement_channel-id"]}",\n    "notif-fk_role-id":"${config["notif-fk_role-id"]}"\n}\n\`\`\`\n__**Salon de configuration :**__ ${infos["fk-config_channel"]}\n__**Salon des annonces :**__ ${infos["fk-announcement_channel"]}\n__**Rôle des notifications :**__ ${infos["notif-fk_role"]}`;
    
                            editingconfigFile.edit(configFile)
                            message.channel.bulkDelete(2, true)
                        } else {
                    message.channel.send("**Annulation... Ceci n'est pas un salon valide.**\n:thinking: Qu'est-ce qu'un salon valide ?\n    → <https://github.com/Etrenak/FallenKingdom/wiki/FallenBot>")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 7500);
                        }
                    }
                }

            break;

            case '📣':
                reaction.users.remove(message.author.id)
                const messageQuestionAnnouncementChannel = await message.channel.send("Quel est le salon des annonces ?")
                let firstMessageAnnouncementChannel = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageAnnouncementChannel) {
                firstMessageAnnouncementChannel = `${config["fk-announcement_channel-id"]}`
                fs.writeFileSync('./config.json', JSON.stringify(config))
                message.channel.send("**Annulation... le temps de réponse a expiré.**")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, 5000);
                } else {
                let fkAnnouncement_Channel = firstMessageAnnouncementChannel.content;

                if (fkAnnouncement_Channel === "cancel") {
                message.channel.bulkDelete(2, true)
                } else {
                    let itIsAVerifAnnouncementChannel = null;
                    let fkAnnouncement_ChannelId = "";

                    if (!isNaN(fkAnnouncement_Channel)) {
                    let verifAnnouncementChannel = client.channels.cache.has(fkAnnouncement_Channel);

                    if (verifAnnouncementChannel === true && client.channels.cache.get(fkAnnouncement_Channel).type === "text") {
                    itIsAVerifAnnouncementChannel = true;
                    fkAnnouncement_ChannelId = fkAnnouncement_Channel;
                    fkAnnouncement_Channel = `<#${fkAnnouncement_ChannelId}>`;
                    } else 
                    itIsAVerifAnnouncementChannel = false;
                    }

                    if (isNaN(fkAnnouncement_Channel) && fkAnnouncement_Channel.startsWith("<#") && fkAnnouncement_Channel.endsWith(">")) {
                    fkAnnouncement_ChannelId = fkAnnouncement_Channel.slice(2, -1);
                    if (client.channels.cache.has(fkAnnouncement_ChannelId) === true && client.channels.cache.get(fkAnnouncement_ChannelId).type === "text")
                    itIsAVerifAnnouncementChannel = true;
                    else
                    itIsAVerifAnnouncementChannel = false;
                    }

                    if (itIsAVerifAnnouncementChannel === true) {
                        
                        config["fk-announcement_channel-id"] = fkAnnouncement_ChannelId;
                        fs.writeFileSync('./config.json', JSON.stringify(config))
                        infos["fk-announcement_channel"] = fkAnnouncement_Channel
                        fs.writeFileSync('./infos.json', JSON.stringify(infos))
    
                        configFile = `Aperçu du fichier de configuration :\n\`\`\`json\n{\n    "fk-config_channel-id":"${config["fk-config_channel-id"]}",\n    "fk-announcement_channel-id":"${config["fk-announcement_channel-id"]}",\n    "notif-fk_role-id":"${config["notif-fk_role-id"]}"\n}\n\`\`\`\n__**Salon de configuration :**__ ${infos["fk-config_channel"]}\n__**Salon des annonces :**__ ${infos["fk-announcement_channel"]}\n__**Rôle des notifications :**__ ${infos["notif-fk_role"]}`;
    
                            editingconfigFile.edit(configFile)
                            message.channel.bulkDelete(2, true)
                        } else {
                    message.channel.send("**Annulation... Ceci n'est pas un salon valide.**\n:thinking: Qu'est-ce qu'un salon valide ?\n    → <https://github.com/Etrenak/FallenKingdom/wiki/FallenBot>")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 7500);
                        }
                    }
                }
            break;

            case '🔔':
                reaction.users.remove(message.author.id)
                const messageQuestionNotifRole = await message.channel.send("Quel est le rôle des notifications ?")
                let firstMessageNotifRole = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageNotifRole) {
                firstMessageNotifRole = `${config["notif-fk_role-id"]}`
                fs.writeFileSync('./config.json', JSON.stringify(config))
                message.channel.send("**Annulation... le temps de réponse a expiré.**")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, 5000);
                } else {
                let fkNotif_Role = firstMessageNotifRole.content;

                if (fkNotif_Role === "cancel") {
                message.channel.bulkDelete(2, true)
                } else {
                    let itIsAVerifNotifRole = null;
                    let fkNotif_RoleId = "";

                    if (!isNaN(fkNotif_Role)) {
                    let verifNotifRole = client.guilds.cache.get(message.guild.id).roles.cache.has(fkNotif_Role);

                    if (verifNotifRole === true) {
                    itIsAVerifNotifRole = true;
                    fkNotif_RoleId = fkNotif_Role;
                    fkNotif_Role = `<@&${fkNotif_RoleId}>`;
                    } else 
                    itIsAVerifNotifRole = false;
                    }

                    if (isNaN(fkNotif_Role) && fkNotif_Role.startsWith("<@&") && fkNotif_Role.endsWith(">")) {
                    fkNotif_RoleId = fkNotif_Role.slice(3, -1);
                    if (client.guilds.cache.get(message.guild.id).roles.cache.has(fkNotif_RoleId) === true)
                    itIsAVerifNotifRole = true;
                    else
                    itIsAVerifNotifRole = false;
                    }

                    if (itIsAVerifNotifRole === true) {
                        
                        config["notif-fk_role-id"] = fkNotif_RoleId;
                        fs.writeFileSync('./config.json', JSON.stringify(config))
                        infos["notif-fk_role"] = fkNotif_Role
                        fs.writeFileSync('./infos.json', JSON.stringify(infos))
    
                        configFile = `Aperçu du fichier de configuration :\n\`\`\`json\n{\n    "fk-config_channel-id":"${config["fk-config_channel-id"]}",\n    "fk-announcement_channel-id":"${config["fk-announcement_channel-id"]}",\n    "notif-fk_role-id":"${config["notif-fk_role-id"]}"\n}\n\`\`\`\n__**Salon de configuration :**__ ${infos["fk-config_channel"]}\n__**Salon des annonces :**__ ${infos["fk-announcement_channel"]}\n__**Rôle des notifications :**__ ${infos["notif-fk_role"]}`;
    
                            editingconfigFile.edit(configFile)
                            message.channel.bulkDelete(2, true)
                        } else {
                    message.channel.send("**Annulation... Ceci n'est pas un rôle valide.**\n:thinking: Qu'est-ce qu'un rôle valide ?\n    → <https://github.com/Etrenak/FallenKingdom/wiki/FallenBot>")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 7500);
                        }
                    }
                }
            break;

            case '✅':
                reaction.users.remove(message.author.id)
                    message.channel.bulkDelete(2, true)
            break;

            case '❌':
                reaction.users.remove(message.author.id)
                config["fk-config_channel-id"] = "";
                config["fk-announcement_channel-id"] = "";
                config["notif-fk_role-id"] = "";
                infos["fk-config_channel"] = "Indéfini";
                infos["fk-announcement_channel"] = "Indéfini";
                infos["notif-fk_role"] = "Indéfini";
                fs.writeFileSync('./config.json', JSON.stringify(config))
                fs.writeFileSync('./infos.json', JSON.stringify(infos))

                configFile = `Aperçu du fichier de configuration :\n\`\`\`json\n{\n    "fk-config_channel-id":"${config["fk-config_channel-id"]}",\n    "fk-announcement_channel-id":"${config["fk-announcement_channel-id"]}",\n    "notif-fk_role-id":"${config["notif-fk_role-id"]}"\n}\n\`\`\`\n__**Salon de configuration :**__ ${infos["fk-config_channel"]}\n__**Salon des annonces :**__ ${infos["fk-announcement_channel"]}\n__**Rôle des notifications :**__ ${infos["notif-fk_role"]}`;
                editingconfigFile.edit(configFile)
            break;
        }
    })
        } else {
            message.author.send(new Discord.MessageEmbed()
            .setColor('#AF1111')
            .setTitle("FallenBot - Erreur")
            .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
            .setDescription(`Une erreur s'est produite. La permission d'administrateur est nécessaire pour exécuter cette commande.\n      → [Aide FallenBot](https://github.com/Etrenak/FallenKingdom/wiki/FallenBot)`)
            );
        }
};

    
module.exports.help = {
    name: "fksettings"
};