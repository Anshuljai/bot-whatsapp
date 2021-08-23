const simple = require('../whatsapp/simple')
const { buttonresponse } = require('./buttonrespon')
const { listresponse } = require('./listresponse')
const { WAConnection: _WAConnection, MessageType, compressImage } = require("@adiwajshing/baileys")
const WAConnection = simple.WAConnection(_WAConnection)
const util = require('util')
const syntaxErr = require('syntax-error')
const moment = require("moment-timezone")
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require('child_process')
const axios = require('axios')
const fs = require('fs')
process.on('uncaughtException', console.log)
////////////////////----------////////////////////
const { getRandom, isUrl, getBuffer, getGroupAdmins } = require('../lib/function')
const { convertSticker } = require('../lib/sticker')
const { uploadImages, uploadFile } = require('../lib/uploadimages')
const { color } = require('../lib/color')
const webptomp4 = require('../lib/webptomp4')
const game = require('../lib/game')
const { 
        tiktokdl, play, youtube,
        stiker, stickertoimage, stickerWM,
        caseeval, starts,
        pinterestSearch, pinterestdl,
        suit,
        uploadImage
}  = require('./plugins/index')
const { pinterest } = require('../scraper/index')   
///////////////////----------////////////////////
let multipref = true;
let self = false;
let noprefix = false
var ownerNumber = ['62895331406727@s.whatsapp.net']
//====[Game]====
let tebakgambar = [];
gamewaktu = 60
//==============//////

module.exports = client = async (client, message) => {
	try {
	if (!message.hasNewMessage) return
    if (!message.messages) return
    if (message.key && message.key.remoteJid == 'status@broadcast') return
    message = message.messages.all()[0]
	simple.smsg(client, message)
    if (!message.message) return
    message.message = (Object.keys(message.message)[0] === 'ephemeralMessage') ? message.message.ephemeralMessage.message: message.message
    if (self) {
    if (!message.key.fromMe) return;
    }
    const content = JSON.stringify(message.message)
    const from = message.key.remoteJid
    const type = Object.keys(message.message)[0]
    const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
    const quoted = type == 'extendedTextMessage' && message.message.extendedTextMessage.contextInfo != null ? message.message.extendedTextMessage.contextInfo.quotedMessage || []: []
    const typeQuoted = Object.keys(quoted)[0]
    const body = message.message.conversation || message.message[type].caption || message.message[type].text || ""
    let userMsg = (type === 'conversation' && message.message.conversation) ? message.message.conversation: (type == 'imageMessage') && message.message.imageMessage.caption ? message.message.imageMessage.caption: (type == 'videoMessage') && message.message.videoMessage.caption ? message.message.videoMessage.caption: (type == 'extendedTextMessage') && message.message.extendedTextMessage.text ? message.message.extendedTextMessage.text: ''
    if (multipref) {
      var prefix = /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_•\/\\Â©^<+]/.test(userMsg) ? userMsg.match(/^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_+•\/\\Â©^<+]/gi)[0]: '-'
    } else {
      if (noprefix) {
        prefix = ""
      }
    }
    chats = (type === 'conversation') ? message.message.conversation: (type === 'extendedTextMessage') ? message.message.extendedTextMessage.text: ''
    budy = (type === 'conversation' && message.message.conversation.startsWith(prefix)) ? message.message.conversation: (type == 'imageMessage') && message.message.imageMessage.caption.startsWith(prefix) ? message.message.imageMessage.caption: (type == 'videoMessage') && message.message.videoMessage.caption.startsWith(prefix) ? message.message.videoMessage.caption: (type == 'extendedTextMessage') && message.message.extendedTextMessage.text.startsWith(prefix) ? message.message.extendedTextMessage.text: ''
    if (prefix != "") {
          if (!body.startsWith(prefix)) {
            cmd = false
            comm = ""
          } else {
            cmd = true
            comm = body.slice(1).trim().split(" ").shift().toLowerCase()
          }
        } else {
          cmd = false
          comm = body.trim().split(" ").shift().toLowerCase()
        }
        const isGroup = from.endsWith('@g.us')
        const botNumber = client.user.jid
        const sender = message.key.fromMe ? client.user.jid : isGroup ? message.participant : message.key.remoteJid
        const command = comm
        const isCmd = body.startsWith(prefix)
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
        const conts = message.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: sender.replace(/@.+/, '') }
        const pushname = message.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.jid : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const isOwner = ownerNumber.includes(sender)
        const isOwnerGroup = isGroup ? groupMetadata.owner : ''
        const isGroupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = isGroup ? yui.getGroupAdmins(botNumber) : ''

        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
    		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

      if (isCmd && !isGroup) {console.log(color('[ CMD ]'), color(moment(message.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))}
      if (isCmd && isGroup) {console.log(color('[ CMD ]'), color(moment(message.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))}

      //====[GAME]====
       // GAME 
        const getWin = (userId) => {
              let position = false
              Object.keys(_win).forEach((i) => {
              if (_win[i].jid === userId) {
              position = i
       }
        })
              if (position !== false) {
              return _win[position].win
            }
        }
             // Game
              game.cekWaktuTG(client, tebakgambar)
              if (game.isTebakGambar(from, tebakgambar)) {
              if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))){
                await client.sendText(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakgambar)}\n\nIngin bermain lagi? kirim *${prefix}tebakgambar*`, message)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            }
        }

        switch(command) {
        case 'sticker':
        case 'stiker':
        case 'stikergif':
        case 'stickergif':
        case 's':
              stiker(client, from, message, convertSticker, ffmpeg, fs, sender, isMedia, isQuotedImage, isQuotedVideo, args, pushname, exec) 
              break   
        case 'swm':
              stickerWM(client, message, from, convertSticker, isQuotedSticker, q)
              break 		
        case 'toimg':
        case 'stickertoimage':
              stickertoimage(client, from, message, exec, fs, pushname, isQuotedSticker, webptomp4)
              break
        	case '>':
             if(!isOwner) return
                let _syntax = ''
                let _return
                let _text = `;(async () => {${(/^=/.test(command) ? 'return ' : '') + q}})()`
                try {
                    _return = await eval(_text)
                }catch(e) {
                    let err = await syntaxErr(_text)
                    if (err) _syntax = err + '\n\n'
                     _return = e
                }finally {
                    client.reply(from, _syntax + util.format(_return), message)
                }
            break
        //====[Downloader Menu]====
        case 'ytmp4':
        case 'ytmp3':
        case 'ytdl':
              youtube(client, axios, message, from, q, isUrl, getBuffer, fs)
            break
        case 'tiktok':
              tiktokdl(client, from, message, sender, q, getBuffer, isUrl)
              break
        case 'play': 
              play(client, message, from, fs, q, isUrl, getBuffer, pushname)
              break
        case 'pinterest':
              pinterestSearch(client, message, from, q, fs, pinterest, getBuffer, isUrl) 
              break
        case 'pinterestdl':
              pinterestdl(client, message, from, axios, q, isUrl)
              break
        case 'uploadimages': 
              uploadImage(message, from, client, uploadImages, isQuotedImage)
              break
        //====[Game Menu]====
        case 'tebakgambar':
            if (game.isTebakGambar(from, tebakgambar)) return client.reply(from, `Selesaikan Permainan yang lama dulu`, message)
              let ngasu = (await axios.get(`http://zekais-api.herokuapp.com/tebakgambar`)).data
              petunjuk = ngasu.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
              client.sendFile(from, ngasu.soal, 'tebakgambar.jpeg', `Silahkan jawab soal berikut ini\n\nPetunjuk : _${petunjuk}_\nWaktu : ${gamewaktu}s`)
              anih = ngasu.jawaban.toLowerCase()
              game.addgambar(from, anih, gamewaktu, tebakgambar)
              break
        case 'suit':
              suit(client, message, from, q, pushname)
              break
        case 'start':
              starts(client, from, message, compressImage, fs)
        break
        }
        /////////////////////=========================/////////////////////
        if (message.mtype === 'buttonsResponseMessage') {
          let buttonId = message.msg.selectedButtonId
          console.log(color('[BUTTONS]'), color(moment(message.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${buttonId}`))
            buttonresponse(client, message, from, MessageType)
        }
        if (message.mtype === 'listResponseMessage') {
            listresponse(client, message, from, prefix)
        }

	} catch(err) {
		console.log(err)
	}
}