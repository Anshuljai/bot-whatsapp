const axios = require ('axios')
const fs = require('fs')

const tiktokdl = async(client, from, message, sender, q, getBuffer, isUrl) => {
	if (!isUrl(q) && !q.includes('tiktok.com')) return client.reply(from, `Kirim perintah *${prefix}tiktok [ Link Tiktok ]* , untuk contoh silahkan kirim perintah *${prefix}readme*`, message)
	const mtt = (await axios.get(`https://api.dhnjing.xyz/downloader/tiktok/nowatermark?url=${q}`)).data.result
	fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(mtt.media_resources.image.contentUrl))
       	buttons = [{buttonId: `&tikaudio ${q}`,buttonText:{displayText: `🎵Audio`},type:1},{buttonId:`&tiknowm ${q}`,buttonText:{displayText:'🎥Video No Watermark'},type:1}, {buttonId:`&tikwm ${q}`,buttonText:{displayText:'🎥Video With Watermark'},type:1}]
        let imageMessage = ( await client.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage')).message.imageMessage
        buttonsMessage = {footerText:'Made With ❤️☕ by Arya', imageMessage,
        contentText:`✘ Judul: ${mtt.media_metadata.title}\n✘ Description: ${mtt.media_metadata.description}\n\n*MUSIC*\n✘ Title: ${mtt.media_resources.music.title}\n✘ Author Name: ${mtt.media_resources.music.authorName} Pilih format di bawah ini!`,buttons,headerType:4}
        prep = await client.prepareMessageFromContent(from,{buttonsMessage},{quoted: message})
        client.relayWAMessage(prep)
        fs.unlinkSync(`./${sender}.jpeg`)
}

module.exports = tiktokdl