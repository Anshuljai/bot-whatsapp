const stiker = async(client, from, message, convertSticker, ffmpeg, fs, sender, isMedia, isQuotedImage, isQuotedVideo, args, pushname, exec) => { 

if (isMedia && !message.message.videoMessage || isQuotedImage && args.length == 0) {
          			let encmedia = message.quoted ? message.quoted : message
          			let img = await encmedia.download()
          			const base64 = `data:image/jpeg;base64,${img.toString('base64')}`
                const stc = await convertSticker(base64, `${pushname}`, `UwU`);
                const imageBuffer = new Buffer.from(stc, 'base64');
                client.sendFile(from, imageBuffer, message)
        		} else if ((isMedia && message.message.videoMessage.fileLength < 10000000 || isQuotedVideo && message.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
        			const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : message
					    const media = await client.downloadAndSaveMediaMessage(encmedia, `./tmp/${sender}`)
						    await ffmpeg(`${media}`)
  							.inputFormat(media.split('.')[4])
  							.on('start', function (cmd) {
  								console.log(`Started : ${cmd}`)
  							})
  							.on('error', function (err) {
  								console.log(`Error : ${err}`)
  								fs.unlinkSync(media)
  								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
  							})
  							.on('end', function () {
  								console.log('Finish')
  								exec(`webpmux -set exif ./tmp/data.exif ./tmp/${sender}.webp -o ./tmp/${sender}.webp`, async (error) => {
  									client.sendFile(from, fs.readFileSync(`./tmp/${sender}.webp`), message)
  									fs.unlinkSync(media)
  									fs.unlinkSync(`./tmp/${sender}.webp`)
  								})
  							})
  							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
  							.toFormat('webp')
  							.save(`./tmp/${sender}.webp`)
        		} else {
        			client.reply(from, `Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 5 detik`, message)
        		}
    }
module.exports = stiker