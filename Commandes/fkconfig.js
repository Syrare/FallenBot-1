const Discord = require('discord.js');
const fs = require('fs');
const fkconfig = require('../fkconfig.json');

module.exports.run = async(client, message) => {
    message.delete();
    let defaultEmbed = new Discord.MessageEmbed()
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
    \n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}
    \n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}
    `);
    
    let editingEmbed = await message.channel.send(defaultEmbed)
    
    const messageAwait = await message.channel.send("Veuillez patienter pendant l'ajout des réactions...");
    
    await Promise.all(['🕙','⛏️','🌐','🔰','👥','👼','🔗','🔔','📑','✅','❌'].map(r => messageAwait.react(r)))
    
    await messageAwait.edit(`:clock10: **Définir la date.** Syntaxe recommandée : \`jj/mm/aaaa | HHhMM\`\n:pick: **Définir la version de Minecraft.** Exemple de syntaxe recommandée : \`1.16.5\`\n:globe_with_meridians: **Activer ou non la présence de versions crackées.** À définir via la réaction *(boolean)* | Par défaut la présence des versions crackées est désactivée\n:beginner: **Définir le nombre d'équipes.** Exemple de syntaxe recommandée : \`3 VS 3\`\n:busts_in_silhouette: **Définir le nombre de joueurs par équipe.** Exemple de syntaxe recommandée : \`2\`\n:angel: **Activer ou non la présence d'un Dieu.** À définir via réaction *(boolean)* | Par défaut la présence d'un Dieu est désactivée\n:link: **Définir ou pas un serveur Discord.** À définir via réaction | Par défaut la présence de serveur Discord est désactivée, si elle est activée voici la syntaxe recommandée : \`https://discord.com/invite/xxxxxxx\`\n:bell: **Désactiver ou non la mention de potentiels joueurs.** À définir via réaction *(boolean)* | Par défaut la mention de potentiels joueurs est activée\n:bookmark_tabs: **Définir des informations complémentaires.**\n:white_check_mark: **Valider l'intégration (l'_embed_).**\n:x: **Annuler l'organisation de la partie.**\n\n__Executez __\`cancel\`__ après une question pour annuler.__`)
    
    const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
    const filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;
    
    const collectorReaction = await new Discord.ReactionCollector(messageAwait, filterReaction);
    collectorReaction.on('collect', async reaction => {
        switch(reaction._emoji.name) {

            case '🕙':
                reaction.users.remove(message.author.id)
                const messageQuestionDate = await message.channel.send("Quel est la date de votre Fallen Kingdom ?")
                const date = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 120000})).first().content;

                if (date === "cancel") {
                message.channel.bulkDelete(2, true)
                } else {

                fkconfig["date"] = date
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                }
            break;

            case '⛏️':
                reaction.users.remove(message.author.id)
                const messageQuestionMinecraftVersion = await message.channel.send("Quel est la version de Minecraft pour jouer à votre Fallen Kingdom ?")
                const minecraft_version = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 120000})).first().content;

                if (minecraft_version === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else {

                fkconfig["minecraft_version"] = minecraft_version
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
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
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '🔰':
                reaction.users.remove(message.author.id)
                const messageQuestionTeamsCount = await message.channel.send("Combien y a t-il d'équipes ?")
                const teams_count = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 120000})).first().content;

                if (teams_count === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else {

                fkconfig["teams_count"] = teams_count
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                }
            break;

            case '👥':
                reaction.users.remove(message.author.id)
                const messageQuestionTeamSize = await message.channel.send("Combien y a t-il de joueurs par équipe ?")
                const team_size = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 120000})).first().content;

                if (team_size === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else {

                fkconfig["team_size"] = team_size
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
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
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '🔗':
                reaction.users.remove(message.author.id)

                if (`${fkconfig["discord_server?"]}` === ":x:") {
                    const messageQuestionDiscordServer = await message.channel.send("Quel est le lien du serveur Discord pour le Fallen Kingdom ?\n:warning: Les serveurs Discord avec du ceontenu innaproprié sont interdits : <#760937246907433044> :warning:")
                    const discord_server = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 120000})).first().content;
                    if (discord_server === "cancel") {
                        message.channel.bulkDelete(2, true)
                        } else if (discord_server.includes("https://discord.gg/")) {
                fkconfig["discord_server?"] = discord_server
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                message.channel.bulkDelete(2, true)
                        } else {
                            message.channel.send("Annulation... Ceci n'est pas un lien valide.")
                            setTimeout(() => {
                                message.channel.bulkDelete(3, true)
                            }, 5000);
                        }
                } else {
                fkconfig["discord_server?"] = ":x:"
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
                }
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
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
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
            break;

            case '📑':
                reaction.users.remove(message.author.id)
                const messageQuestionInfos = await message.channel.send("Quels sont vos informations complémtentaires ?")
                const infos = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 120000})).first().content;

                if (infos === "cancel") {
                    message.channel.bulkDelete(2, true)
                    } else {

                fkconfig["infos"] = infos
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : ${fkconfig["minecraft_version"]}\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : ${fkconfig["online-mode?"]}\n\n:beginner: Nombre d\'équipes : ${fkconfig["teams_count"]}\n\n:busts_in_silhouette: Nombre de joueurs par équipe : ${fkconfig["team_size"]}\n\n:angel: Présence d\'un Dieu : ${fkconfig["god?"]}\n\n:link: Serveur Discord : ${fkconfig["discord_server?"]}\n\n:bell: Notifier les potentiels joueurs : ${fkconfig["notifs-fk?"]}\n\n:page_facing_up: Informations complémentaires : ${fkconfig["infos"]}`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
                }
            break;

            case '✅':
                reaction.users.remove(message.author.id)
                message.channel.bulkDelete(2, true)
                message.channel.send("Votre configuration a été sauvegardée avec succès. Exécutez la commande `/fksend` pour envoyer une annonce à votre Fallen Kingdom dans le salon <#484765007427665920>")
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
            break;
        }
    })
};

    
module.exports.help = {
    name: "fkconfig"
};