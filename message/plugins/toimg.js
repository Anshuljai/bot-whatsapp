const ran = ['1', '2', '3', '4']
const random = ran[Math.floor(Math.random() * (ran.length))]

const stickertoimage = async(client, from, message, exec, fs, pushname, isQuotedSticker, webptomp4) => {
	if (!isQuotedSticker) return client.reply(from, 'reply sicker nya!', message) 
              if (message.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true) { 
                    const encmedia = JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo                    
                    let img = await client.downloadAndSaveMediaMessage(encmedia)
                    const stctomp4 = await webptomp4(img)
                    client.sendFile(from, stctomp4.result, 'tomp4.mp4', `Result: ${stctomp4.result}`, message)
              } else {
                    const encmedia = JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    const media = await client.downloadAndSaveMediaMessage(encmedia)
                    var ran = `${random}.png`
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) {
                    client.reply(from, `gagal`, message)
                    console.log(err)
              } else {
                    buffer = fs.readFileSync(ran)
                    client.sendFile(from, buffer, message)
                  }
                })
              } 
}
module.exports = stickertoimage