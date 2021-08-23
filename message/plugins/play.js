const ran = ['1', '2', '3', '4']
const random = ran[Math.floor(Math.random() * (ran.length))]

const yts = require('yt-search')
const play = async(client, message, from, fs, q, isUrl, getBuffer, pushname) => {
const hsl = await yts(q)
const result = hsl.all.filter(v => v.type ==='video')[0]
if (!q && q.includes(isUrl)) return client.reply(from, `Kirim perintah *${prefix}play [ Judul Pencarian ]* , untuk contoh silahkan kirim perintah *${prefix}readme*`, message)
	await fs.writeFileSync(`./tmp/${ran}.jpeg`, await getBuffer(result.thumbnail))
    buttons = [{buttonId: `&ytmp3 ${result.url}`,buttonText:{displayText: `🎵Audio`},type:1},{buttonId:`&ytmp4 ${result.url}`,buttonText:{displayText:'🎥Video'},type:1}]
    let imageMessage = ( await client.prepareMessage(from, fs.readFileSync(`./tmp/${ran}.jpeg`), 'imageMessage')).message.imageMessage
    buttonsMessage = {footerText:'Made With ❤️☕ by Arya', imageMessage,
    contentText:`✘ Judul: ${result.title}\n✘ Views: ${result.views}\n✘ Durasi: ${result.timestamp}\n✘ Link: ${result.url}\n\nPilih 1 format di bawah ini!`,buttons,headerType:4}
    prep = await client.prepareMessageFromContent(from,{buttonsMessage},{})
    client.relayWAMessage(prep)
    fs.unlinkSync(`./tmp/${ran}.jpeg`)
}

module.exports = play