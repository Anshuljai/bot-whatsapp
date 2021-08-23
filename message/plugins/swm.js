const stickerWM = async(client, message, from, convertSticker, isQuotedSticker, q) => {
	if (!isQuotedSticker) return client.reply(from, `reply sticker nya!`, message)
	if (!q.includes('|')) return client.reply(from, `Reply sticker dengan caption *#takestick nama|author*`, message)
	const packname = q.substring(0, q.indexOf('|') - 1)
    const author = q.substring(q.lastIndexOf('|') + 2)	
    var quoted = message.quoted 
    var stcImage = await quoted.download()
    var base64 = `data:image/jpeg;base64,${stcImage.toString('base64')}`
    var convert = await convertSticker(base64, packname, author)
    var stcBuffer = new Buffer.from(convert, 'base64')
    client.sendFile(from, stcBuffer, message)
}

module.exports = stickerWM