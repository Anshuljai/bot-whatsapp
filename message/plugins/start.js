const os = require('os')

const starts = async(client, from, message, compressImage, fs) => {
	const totalchat = await client.chats.all()
	const ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
	let ia = []
	let giida = []
	for (mem of totalchat){
		ia.push(mem.jid)
	}
	for (id of ia){
	if (id && id.includes('g.us')){
		giida.push(id)
		}
	}
	const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = client.user.phone
	buttons = [{buttonId:'MenuBot',buttonText:{displayText:'Menu'},type:1},{buttonId:'Donasi',buttonText:{displayText:'Donasi Bot'},type:1},{buttonId:'infoBot',buttonText:{displayText:'Info Bot'},type:1}]
    let imageMessage = ( await client.prepareMessage(from, fs.readFileSync(`./media/yui.jpg`), 'imageMessage', { thumbnail: await compressImage(fs.readFileSync(`./media/yui.jpg`))})).message.imageMessage
    buttonsMessage = {footerText:'Made With ❤️☕ by Arya', imageMessage,
    contentText:`❏─── *「 Yuigahama BOT 」* ───❏

┌─❑ *「 Server Info 」*
│◦ *Speed:* _${os.cpus()[0].speed} MHz_
│◦ *Platfrom* : _${os.platform()}_
│◦ *CPU:* _${os.cpus()[0].model}_
│◦ *Core:* _${os.cpus().length}_
│◦ *Ram Usage:* ${ram}
│
├❑ *「 Status 」*
│◦ *Total Chat :* ${totalchat.length}
│◦ *Personal Chats Active :* ${totalchat.length - giida.length}
│◦ *Group Chat :* ${giida.length}
│◦ *Group Joined :* ${giida.length}
│
├❑ *「 Phone Info 」*
│◦ *OS Version :* ${os_version}
│◦ *Device Manufacturer :* ${device_manufacturer}
│◦ *Device Model :* ${device_model}
│
└───❏ *「 Yuigahama BOT 」* ❏───
`,buttons,headerType:4}
    prep = await client.prepareMessageFromContent(from,{buttonsMessage},{})
    client.relayWAMessage(prep)
}

module.exports = starts
