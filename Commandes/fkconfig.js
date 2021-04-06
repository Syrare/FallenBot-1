const Discord = require('discord.js');
const fs = require('fs');
const fkconfig = require('../fkconfig.json');
const infos = require('../infos.json');
const expirationTime = 300000; 
const fkChannel = "828253032491647016";
const fkAnnouncementChannel = "484765007427665920";

module.exports.run = async(client, message) => {
    if (message.member.lastMessageChannelID.includes(fkChannel)) {
        
        message.guild.channels.cache.get(fkChannel).overwritePermissions([
            {
                id: message.guild.roles.everyone.id,
               deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL'],
            }
          ]);

    message.delete();
    let defaultEmbed = new Discord.MessageEmbed()
    .setColor(`${fkconfig["color"]}`)
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
    .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
    .setDescription(`
    \n\n:person_frowning: Hôte : ${message.author}
    \n:clock10: Date : ${fkconfig["date"]}
    \n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}
    \n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}
    \n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}
    \n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}
    \n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}
    \n:link: Serveur Discord : ${fkconfig["discord_server?"]}
    \n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}
    \n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}
    \n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)
    `);
    
    let editingEmbed = await message.channel.send(defaultEmbed)
    
    const messageAwait = await message.channel.send("Veuillez patienter pendant l'ajout des réactions...");
    
    await Promise.all(['🕙','⛏️','🌐','🔰','👥','👼','🔗','🔔','📑','🌈','✅','❌'].map(r => messageAwait.react(r)))
    
    await messageAwait.edit(`:clock10: **Définir la date.** Syntaxe : \`jj/mm/aaaa | HHhMM\`\n:pick: **Définir la version de Minecraft.** Exemple de la syntaxe : \`1.16.5\`\n:globe_with_meridians: **Activer ou non la présence de versions crackées.** À définir via la réaction *(boolean)* | Par défaut la présence des versions crackées est désactivée\n:beginner: **Définir le nombre d'équipes.** Exemple de la syntaxe : \`3\`\n:busts_in_silhouette: **Définir le nombre de joueurs par équipe.** Exemple de la syntaxe : \`2\`\n:angel: **Activer ou non la présence d'un Dieu.** À définir via réaction *(boolean)* | Par défaut la présence d'un Dieu est désactivée\n:link: **Définir ou pas un serveur Discord.** À définir via réaction | Par défaut la présence de serveur Discord est désactivée, si elle est activée voici un exemple de la syntaxe : \`https://discord.gg/SmAAFxh\`\n:bell: **Désactiver ou non la mention de potentiels joueurs.** À définir via réaction *(boolean)* | Par défaut la mention de potentiels joueurs est activée\n:bookmark_tabs: **Définir des informations complémentaires.**\n:rainbow: **Changer la couleur de l'intégration (l'_embed_).** À définir via réaction | Par défaut la couleur est vert foncé (\`#137911\`)\n:white_check_mark: **Valider l'intégration (l'_embed_).**\n:x: **Annuler l'organisation de la partie.**\n\n__Exécutez __\`cancel\`__ après une question pour annuler.__`)
    
    const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
    const filterMessage = (m) => m.author.id === message.author.id || m.author.bot;
    
    const collectorReaction = await new Discord.ReactionCollector(messageAwait, filterReaction);
    collectorReaction.on('collect', async reaction => {
        switch(reaction._emoji.name) {

            case '🕙':
                reaction.users.remove(message.author.id)
                const messageQuestionDate = await message.channel.send("Quel est la date de votre Fallen Kingdom ?")
                let firstMessageDate = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageDate) {
                firstMessageDate = `${fkconfig["date"]}`
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                message.channel.send("Annulation... le temps de réponse a expiré.")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, expirationTime);
                } else {
                const date = firstMessageDate.content;
                jj =  (date.charAt(0) + date.charAt(1))
                mm = (date.charAt(3) + date.charAt(4))
                aaaa = (date.charAt(6) + date.charAt(7) + date.charAt(8) + date.charAt(9))
                hHour = (date.charAt(13) + date.charAt(14))
                mMinute = (date.charAt(16) + date.charAt(17))

                if (date === "cancel") {
                message.channel.bulkDelete(2, true)
                } else if ((jj <= 31 && jj >= 01) && (mm <= 12 && mm >= 01) && (aaaa <= 2021 + 1 && aaaa >= 2021) && (hHour <= 23 && hHour >= 00) && (mMinute <= 59 && mMinute >= 00)) {

                fkconfig["date"] = date
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                } else {
                    message.channel.send("Annulation... Ceci n'est une date valide.")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 5000);
                }
            }

            break;

            case '⛏️':
                reaction.users.remove(message.author.id)
                const messageQuestionMinecraftVersion = await message.channel.send("Quel est la version de Minecraft pour jouer à votre Fallen Kingdom ?")
                let firstMessageMinecraftVersion = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime })).first();
                if (!firstMessageMinecraftVersion) {
                    firstMessageMinecraftVersion = `${fkconfig["minecraft_version"]}`
                    fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    message.channel.send("Annulation... le temps de réponse a expiré.")
                    setTimeout(() => {
                        message.channel.bulkDelete(2, true)
                    }, expirationTime);
                    } else {
                const minecraft_version = firstMessageMinecraftVersion.content;

                if (minecraft_version === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else if (minecraft_version === "1.8.3" || minecraft_version === "1.8.4" || minecraft_version === "1.8.5" || minecraft_version === "1.8.6" || minecraft_version === "1.8.7" || minecraft_version === "1.8.8" || minecraft_version === "1.8.9" || minecraft_version === "1.9" || minecraft_version === "1.9.1" || minecraft_version === "1.9.2" || minecraft_version === "1.9.3" || minecraft_version === "1.9.4" || minecraft_version === "1.10" || minecraft_version === "1.10.1" || minecraft_version === "1.10.2" || minecraft_version === "1.11" || minecraft_version === "1.11.1" || minecraft_version === "1.11.2" || minecraft_version === "1.12" || minecraft_version === "1.12.1" || minecraft_version === "1.12.2" || minecraft_version === "1.13" || minecraft_version === "1.13.1" || minecraft_version === "1.13.2" || minecraft_version === "1.14" || minecraft_version === "1.14.1" || minecraft_version === "1.14.2" || minecraft_version === "1.14.3" || minecraft_version === "1.14.4" || minecraft_version === "1.15" || minecraft_version === "1.15.1" || minecraft_version === "1.15.2" || minecraft_version === "1.16" || minecraft_version === "1.16.1" || minecraft_version === "1.16.2" || minecraft_version === "1.16.3" || minecraft_version === "1.16.4" || minecraft_version === "1.16.5") {

                fkconfig["minecraft_version"] = minecraft_version
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                } else {
                    message.channel.send("Annulation... Ceci n'est une version de Minecraft compatible avec le plugin valide.")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 5000);
                }
            }
            break;

            case '🌐':
                reaction.users.remove(message.author.id)

                if (`${fkconfig["online-mode?"]}` === ":x:") {
                fkconfig["online-mode?"] = ":white_check_mark:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                } else {
                fkconfig["online-mode?"] = ":x:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                }
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '🔰':
                reaction.users.remove(message.author.id)
                const messageQuestionTeamsCount = await message.channel.send("Combien y a t-il d'équipes ?")
                let firstMessageTeamsCount = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageTeamsCount) {
                firstMessageTeamsCount = `${fkconfig["teams_count"]}`
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                message.channel.send("Annulation... le temps de réponse a expiré.")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, expirationTime);
                } else {
                const teams_count = firstMessageTeamsCount.content;

                if (teams_count === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else if (teams_count >= 2 && teams_count < 50) {

                fkconfig["teams_count"] = teams_count
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                } else {
                    message.channel.send("Annulation... Ceci n'est pas un nombre d'équipes valide.")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 5000);
                }
            }
            break;

            case '👥':
                reaction.users.remove(message.author.id)
                const messageQuestionTeamSize = await message.channel.send("Combien y a t-il de joueurs par équipe ?")
                let firstMessageTeamSize = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageTeamSize) {
                firstMessageTeamSize = `${fkconfig["team_size"]}`
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                message.channel.send("Annulation... le temps de réponse a expiré.")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, expirationTime);
                } else {
                const team_size = firstMessageTeamSize.content;

                if (team_size === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else if (team_size >= 1 && team_size <= 50) {
                fkconfig["team_size"] = team_size
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                } else {
                    message.channel.send("Annulation... Ceci n'est pas un nombre de joueurs par équipe valide.")
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 5000);
                }
            }
            break;

            case '👼':
                reaction.users.remove(message.author.id)

                if (`${fkconfig["god?"]}` === ":x:") {
                fkconfig["god?"] = ":white_check_mark:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                } else {
                fkconfig["god?"] = ":x:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                }
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '🔗':
                reaction.users.remove(message.author.id)

                if (`${fkconfig["discord_server?"]}` === ":x:") {
                    const messageQuestionDiscordServer = await message.channel.send("Quel est le lien du serveur Discord pour le Fallen Kingdom ?\n:warning: Les serveurs Discord avec du contenu innaproprié sont interdits : <#760937246907433044> :warning:")
                    let firstMessageDiscordServer = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                    if (!firstMessageDiscordServer) {
                    firstMessageDiscordServer = `${fkconfig["discord_server?"]}`
                    fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    message.channel.send("Annulation... le temps de réponse a expiré.")
                    setTimeout(() => {
                        message.channel.bulkDelete(2, true)
                    }, expirationTime);
                    } else {
                    const discord_server = firstMessageDiscordServer.content;
                    if (discord_server === "cancel") {
                        message.channel.bulkDelete(2, true)
                        } else if (discord_server.includes("https://discord.gg/")) {
                fkconfig["discord_server?"] = discord_server
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                message.channel.bulkDelete(2, true)
                        } else {
                            message.channel.send("Annulation... Ceci n'est pas un lien Discord valide.")
                            setTimeout(() => {
                                message.channel.bulkDelete(3, true)
                            }, 5000);
                        }
            }
        } else {
            fkconfig["discord_server?"] = ":x:"
            fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
            }
            defaultEmbed = new Discord.MessageEmbed()
            .setColor(`${fkconfig["color"]}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
            .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
            .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)

                editingEmbed.edit(defaultEmbed)

            break;

            case '🔔':
                reaction.users.remove(message.author.id)

                if (`${fkconfig["notifs-fk?"]}` === ":white_check_mark:") {
                fkconfig["notifs-fk?"] = ":x:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                } else {
                fkconfig["notifs-fk?"] = ":white_check_mark:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                }
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '📑':
                reaction.users.remove(message.author.id)
                const messageQuestionInfos = await message.channel.send("Quels sont vos informations complémtentaires ?")
                let firstMessageInfos = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageInfos) {
                firstMessageInfos = `${fkconfig["infos"]}`
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                message.channel.send("Annulation... le temps de réponse a expiré.")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, expirationTime);
                } else {
                const infos = firstMessageInfos.content;

                if (infos === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else {

                fkconfig["infos"] = infos
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                }
            }
            break;

            case '🌈':
                reaction.users.remove(message.author.id)


                switch(`${fkconfig["color"]}`) {
                    case '#137911': // Si la couleur par défaut
                        fkconfig["color"] = "#000000" // Passer au noir
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#000000': // Si la couleur noire
                        fkconfig["color"] = "#fffefe" // Passer au blanc
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#fffefe': // Si la couleur blanche
                        fkconfig["color"] = "#ff8c00" // Passer au orange
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#ff8c00': // Si la couleur orange
                        fkconfig["color"] = "#0000ff" // Passer au bleu
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#0000ff': // Si la couleur bleue
                        fkconfig["color"] = "#ff0000" // Passer au rouge
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#ff0000': // Si la couleur rouge
                        fkconfig["color"] = "#8b4513" // Passer au marron
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#8b4513': // Si la couleur marron
                        fkconfig["color"] = "#800080" // Passer au violet
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#800080': // Si la couleur violette
                        fkconfig["color"] = "#00ff00" // Passer au vert
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#00ff00': // Si la couleur verte
                        fkconfig["color"] = "#ffff00" // Passer au jaune
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                    case '#ffff00': // Si la couleur jaune
                        fkconfig["color"] = "#137911" // Passer à la couleur par défaut
                        fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                    break;
                }

                defaultEmbed = new Discord.MessageEmbed()
                .setColor(`${fkconfig["color"]}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}\n\n\n        → [Signaler un bug](https://github.com/IkaRio198/FallenBot/issues/new)`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '✅':
                reaction.users.remove(message.author.id)
                const messageFkSendConfirmation = await message.channel.send(`**:warning: ATTENTION :warning:**\nVous êtes sur le point d'envoyer votre annonce dans le salon <#${fkAnnouncementChannel}>. Êtes-vous sûr de vouloir envoyer votre annonce ? Si oui, exécutez \`confirm\`, si non, exécutez \`cancel\`.`)
                let firstMessageConfirmation = (await message.channel.awaitMessages(filterMessage, {max: 1, time: expirationTime})).first();
                if (!firstMessageConfirmation) {
                message.channel.send("Annulation... le temps de réponse a expiré.")
                setTimeout(() => {
                    message.channel.bulkDelete(2, true)
                }, expirationTime);
                } else {
                const confirmation = firstMessageConfirmation.content;

                if (confirmation === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else if (confirmation === "confirm") {
                        infos["latestUserID"] = message.author.id; // Comme c'est le bot qui envoie la commande $fksend, c'est FallenBot l'auteur de celui-ci donc on sauvegarde le vrai auteur pour fksend.js
                        infos["latestUserUsername"] = message.author.username;
                        infos["latestUserTag"] = message.author.tag;
                        infos["latestUserAvatar"] = message.author.displayAvatarURL();
                        fs.writeFileSync('./infos.json', JSON.stringify(infos))
                        message.channel.send(`$fksend`)
                        message.author.send(new Discord.MessageEmbed()
                        .setColor('#137911')
                        .setTitle("FallenBot")
                        .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
                        .setDescription(`Nous vous remercions d'avoir utilisé [FallenBot](https://github.com/IkaRio198/FallenBot) !\n       → N'hésitez pas à nous laisser un avis dans <#353483147582636032> !`)
                        )
                        setTimeout(() => {
                            message.channel.bulkDelete(5, true)
                        }, 1000);
                } else {
                    message.channel.send(`Annulation... \`${message.author.lastMessage}\` n'est pas une réponse attendue. Veuillez réessayer avec une des deux réponses proposées précedemment.`);
                    setTimeout(() => {
                        message.channel.bulkDelete(3, true)
                    }, 5000);
                }
            }
            break;

            case '❌':
                reaction.users.remove(message.author.id)
                message.channel.bulkDelete(2, true)
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
                  message.guild.channels.cache.get(fkChannel).updateOverwrite(message.author.id, { VIEW_CHANNEL: null });
            break;
        }
    })
} else {
    message.delete();
    message.author.send(new Discord.MessageEmbed()
    .setColor('#AF1111')
    .setTitle("FallenBot - Erreur")
    .setURL('https://github.com/Etrenak/FallenKingdom/wiki/FallenBot')
    .setDescription(`Les commandes doivent être exécutées exclusivement dans le salon <#${fkChannel}> !`)
    );
};
};

    
module.exports.help = {
    name: "fkconfig"
};