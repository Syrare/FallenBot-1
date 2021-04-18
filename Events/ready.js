const Discord = require("discord.js");
const exec = require('child_process').exec;
const fs = require('fs');
const fetch = require('node-fetch');
const { VERSION } = require("../version");
const config = require('../config.json');

module.exports = async(client) => {

  client.user.setStatus("online");
  client.user.setActivity(`organiser des Fallen Kingdom | ${VERSION}`);

  const url_latest_version = "https://api.github.com/repos/IkaRio198/FallenBot/releases/latest";

  let latest_version
    try {
      latest_version = await fetch(url_latest_version).then(ver => ver.json())
    } catch (error) {
      console.log(error)
  }

  if (VERSION != latest_version.tag_name)
    console.warn(`Attention: Vous disposez d'un version obsolète (${VERSION}). Une nouvelle version est disponible (${latest_version.tag_name}).\nPour la télécharger, vous devez procéder à une réinstallation du bot.\n    → https://github.com/Etrenak/FallenKingdom/wiki/FallenBot`);

};