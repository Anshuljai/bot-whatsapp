const uploadImage = async(message, from, client, uploadImages, isQuotedImage) => {
	if (!isQuotedImage) return client.reply(from, 'reply Image nya!', message)
	var quoted = message.quoted ? message.quoted : message
	var image = await quoted.download()
	var uploadimg = await uploadImages(image)
	client.reply(from, `Result: ${uploadimg}`, message)
}

module.exports = uploadImage
