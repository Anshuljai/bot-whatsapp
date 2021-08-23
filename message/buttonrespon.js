const { tiktok  } = require('../scraper/index')
const { yta, ytv } = require('../scraper/y2mate')
const { getBuffer } = require('../lib/function')
const { pinterest } = require('../scraper/index')
const fs = require('fs-extra')

const ran = ['1', '2', '3', '4']
const random = ran[Math.floor(Math.random() * (ran.length))]

const buttonresponse = async(client,message, from, MessageType) => {
	
  let buttonId = message.msg.selectedButtonId
  let displayText = message.msg.selectedDisplayText
  const buttonCmd = buttonId.replace('&', '').trim().split(/ +/).shift().toLowerCase()
  const args = buttonId.trim().split(/ +/).slice(1)
  const q = args.join(' ')

        switch(buttonId) {
          case 'MenuBot':
                client.sendMessageFromContent(from,{
                "listMessage": {
                "title": `Nagisa Natsunagi Whatsapp Bot\n\n\n`,
                "description": "*Klik Di Bawah Untuk Menampilkan Menu*",
                "buttonText": "Choose Here!",
                "listType": "SINGLE_SELECT",
                "sections":[{
                "title": "Nagisa Natsunagi Whatsapp Bot",
                    "rows": [{
                    "title": "Menu Download",
                   }, {
                    "title": "Menu Game",
                   }, {
                    "title": "Menu Convert",
                   }]
                }]
                }
                , quoted: message})
                break
        }
        switch(buttonCmd) {
          case 'tikaudio':
            client.reply(from, '*Tunggu permintaan anda sedang diproses*', message)
            var taudio = await tiktok(q)
            client.sendFile(from, taudio.result.audio, 'tiktok.mp3' ,message)
            break
          case 'tiknowm':
            client.reply(from, '*Tunggu permintaan anda sedang diproses*', message)
            var tnowm = await tiktok(q)
            client.sendFile(from, tnowm.result.nowatermark, 'tiktok.mp4', 'Nih!' , message)
            break
          case 'tikwm':
            var twm = await tiktok(q)
            client.reply(from, '*Tunggu permintaan anda sedang diproses*', message)
            client.sendFile(from, twm.result.watermark, 'tiktok.mp4', 'Nih', message)
            break
          case 'ytmp3':
            client.reply(from, '*Tunggu permintaan anda sedang diproses*', message)
            var ytmp3 = await yta(q)
            buffer = await getBuffer(ytmp3.dl_link)
            client.sendMessage(from, buffer, MessageType.audio, {mimetype: 'audio/mp4', filename: `${ytmp3.title}.mp3`, quoted: message, contextInfo:{"externalAdReply": { "title": `${ytmp3.title}`, "body": `Size: ${ytmp3.filesizeF}`, "mediaType": 2, "thumbnailUrl": `${ytmp3.thumb}`, "mediaUrl": `${q}`, "thumbnail": "" }}})
            break
          case 'ytmp4':
            client.reply(from, '*Tunggu permintaan anda sedang diproses*', message)
            var ytmp4 = await ytv(q)
            client.sendFile(from, ytmp4.dl_link, 'ytmp4.mp4', 'Nih!', message)
            break
          case 'pinterest':
            const pin = await pinterest(`${q}`)
            const dolpen = pin[Math.floor(Math.random() * (pin.length))]
            await fs.writeFileSync(`./${random}.jpeg`, await getBuffer(dolpen))
            buttons = [{buttonId: `&pinterest ${q}`,buttonText:{displayText: `➡️Next`},type:1}]
            let imageMessage = ( await client.prepareMessage(from, fs.readFileSync(`./${random}.jpeg`), 'imageMessage')).message.imageMessage
            buttonsMessage = {footerText:'Made With ❤️☕ by Arya', imageMessage,
            contentText:`Hasil pencarian: *${q}* \n\n*Click Next untuk mencari gambar selanjutnya!*`,buttons,headerType:4}
            prep = await client.prepareMessageFromContent(from,{buttonsMessage},{})
            client.relayWAMessage(prep)
            fs.unlinkSync(`./${random}.jpeg`)
        break
        }
	}

module.exports = {
	buttonresponse
}