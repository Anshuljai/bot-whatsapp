const pinterestdl = async(client, message, from, axios, q, isUrl) => {
	if (!q) return client.reply(from, `Kirim perintah *#pinterestdl [ link ]* , untuk contoh silahkan kirim perintah *#readme*`, message) 
	const pin = (await axios.get(`https://api.dhnjing.xyz/downloader/pinterest/pin?url=${q}`)).data
	var caption = `Title: ${pin.result.pin_title}
Creator: ${pin.result.pin_creator}

_Image_`
	client.sendFile(from, pin.result.media_resources.image_736x, 'pin.jpeg', caption, message)
	client.sendFile(from, pin.result.media_resources.video_mp4, 'pin.mp4', '_Video_', message)
}

module.exports = pinterestdl