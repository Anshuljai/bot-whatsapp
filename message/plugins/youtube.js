const ran = ['1', '2', '3', '4']
const random = ran[Math.floor(Math.random() * (ran.length))]

const youtube = async(client, axios, message, from, q, isUrl, getBuffer, fs) => {
	if (!isUrl(q) && !q.includes('https://youtu.be/')) return client.reply(from, `Kirim perintah *#ytdl [ Link Youtube ]* , untuk contoh silahkan kirim perintah *#readme*`, message)
	const yt = (await axios.get(`https://api.dhnjing.xyz/downloader/youtube/video?url=${q}`)).data.result
	await fs.writeFileSync(`./tmp/${ran}.jpeg`, await getBuffer(yt.media_resources.thumbnail))
    buttons = [{buttonId: `&ytmp3 ${q}`,buttonText:{displayText: `🎵Audio`},type:1},{buttonId:`&ytmp4 ${q}`,buttonText:{displayText:'🎥Video'},type:1}]
    let imageMessage = ( await client.prepareMessage(from, fs.readFileSync(`./tmp/${ran}.jpeg`), 'imageMessage')).message.imageMessage
    buttonsMessage = {footerText:'Made With ❤️☕ by Arya', imageMessage,
    contentText:`◦ Judul: ${yt.media_metadata.title}\n◦ Views: ${yt.media_metadata.totalViews}\n◦ Likes: ${yt.media_metadata.totalLikes}\n◦ Link: ${q}\n\nPilih 1 format di bawah ini!`,buttons,headerType:4}
    prep = await client.prepareMessageFromContent(from,{buttonsMessage},{})
    client.relayWAMessage(prep)
    fs.unlinkSync(`./tmp/${ran}.jpeg`)
}

module.exports = youtube