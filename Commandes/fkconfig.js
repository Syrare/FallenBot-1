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
    \n:pick: Version de Minecraft : Exemple de syntaxe recommandée : \`1.16.5\`
    \n:globe_with_meridians: Version crackée (\`online-mode\`) : À définir via réaction *(boolean)* | Par défaut la présence des versions crackées est désactivée
    \n:beginner: Nombre d\'équipes : Exemple de syntaxe recommandée : \`3 VS 3\`
    \n:busts_in_silhouette: Nombre de joueurs par équipe : Exemple de syntaxe recommandée : \`2\`
    \n:angel: Présence d\'un Dieu : À définir via réaction *(boolean)* | Par défaut la présence d\'un Dieu est désactivée
    \n:link: Serveur Discord : À définir via réaction | Par défaut la présence de serveur Discord est désactivée, si elle est activée voici la syntaxe recommandée : \`https://discord.com/invite/xxxxxxx\`
    \n:bell: Notifier les potentiels joueurs : À définir via réaction *(boolean)* | Par défaut la mention de potentiels joueurs est activée
    \n:page_facing_up: Informations complémentaires :
    \n<@&827914773672624138>
    `);
    
    let editingEmbed = await message.channel.send(defaultEmbed)
    
    const messageAwait = await message.channel.send("Veuillez patienter pendant l'ajout des réactions...");
    
    await Promise.all(['🕙','⛏️','🌐','🔰','👥','👼','🔗','🔔','📑'].map(r => messageAwait.react(r)))
    
    await messageAwait.edit(`:clock10: Définir la date\n:pick: Définir la version de Minecraft\n:globe_with_meridians: Activer ou non la présence de versions crackées\n:beginner: Définir le nombre d'équipes\n:busts_in_silhouette: Définir le nombre de joueurs par équipe\n:angel: Activer ou non la présence d'un Dieu\n:link: Définir ou pas un serveur Discord\n:bell: Désactiver ou non la mention de potentiels joueurs\n:bookmark_tabs: Définir des informations complémentaires`)
    
    const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
    const filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;
    
    const collectorReaction = await new Discord.ReactionCollector(messageAwait, filterReaction);
    collectorReaction.on('collect', async reaction => {
        switch(reaction._emoji.name) {
            case '🕙':
                reaction.users.remove(message.author.id)
                const messageQuestionDate = await message.channel.send("Quel est la date de votre Fallen Kingdom ?")
                const date = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                fkconfig["date"] = date
                fs.writeFileSync('./fkconfig.json', JSON.stringify(fkconfig))
    
                defaultEmbed = new Discord.MessageEmbed()
                .setColor('#137911')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Fallen Kingdom organisé par ${message.author.username}`)
                .setDescription(`\n\n\n:person_frowning: Hôte : ${message.author}\n\n:clock10: Date : ${fkconfig["date"]}\n\n:pick: Version de Minecraft : Exemple de syntaxe recommandée : \`1.16.5\`\n\n:globe_with_meridians: Version crackée (\`online-mode\`) : À définir via réaction *(boolean)* | Par défaut la présence des versions crackées est désactivée\n\n:beginner: Nombre d\'équipes : Exemple de syntaxe recommandée : \`3 VS 3\`\n\n:busts_in_silhouette: Nombre de joueurs par équipe : Exemple de syntaxe recommandée : \`2\`\n\n:angel: Présence d\'un Dieu : À définir via réaction *(boolean)* | Par défaut la présence d\'un Dieu est désactivée\n\n:link: Serveur Discord : À définir via réaction | Par défaut la présence de serveur Discord est désactivée, si elle est activée voici la syntaxe recommandée : \`https://discord.com/invite/xxxxxxx\`\n\n:bell: Notifier les potentiels joueurs : À définir via réaction *(boolean)* | Par défaut la mention de potentiels joueurs est activée\n\n:page_facing_up: Informations complémentaires :\n\n<@&827914773672624138>`)
    
                    editingEmbed.edit(defaultEmbed)
                    message.channel.bulkDelete(2, true)
            break;
        }
    })
};

    
module.exports.help = {
    name: "fkconfig"
};