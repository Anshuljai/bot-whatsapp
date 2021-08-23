const ran = ['1', '2', '3', '4']
const random = ran[Math.floor(Math.random() * (ran.length))]
const axios = require('axios')

const pinterestSearch = async(client, message, from, q, fs, pinterest, getBuffer, isUrl) => {
	if (!q) return client.reply(from, `Kirim perintah *#pinterest [ query ]* , untuk contoh silahkan kirim perintah *${prefix}readme*`, message) 
		const pin = await pinterest(`${q}`)
        const dolpen = pin[Math.floor(Math.random() * (pin.length))]
        await fs.writeFileSync(`./tmp/${random}.jpeg`, await getBuffer(dolpen))
        buttons = [{buttonId: `&pinterest ${q}`,buttonText:{displayText: `➡️Next`},type:1}]
        let imageMessage = ( await client.prepareMessage(from, fs.readFileSync(`./tmp/${random}.jpeg`), 'imageMessage')).message.imageMessage
        buttonsMessage = {footerText:'Made With ❤️☕ by Arya', imageMessage,
        contentText:`Hasil pencarian: *${q}* \n\n*Click Next untuk mencari gambar selanjutnya!*`,buttons,headerType:4}
        prep = await client.prepareMessageFromContent(from,{buttonsMessage},{})
        client.relayWAMessage(prep)
        fs.unlinkSync(`./tmp/${random}.jpeg`)
}
module.exports = pinterestSearch