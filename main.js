const simple = require('./whatsapp/simple')
const { WAConnection: _WAConnection, MessageType, compressImage } = require("@adiwajshing/baileys")
const WAConnection = simple.WAConnection(_WAConnection)
const fs = require('fs-extra')
const CFonts = require('cfonts')
const qrcode = require("qrcode-terminal")
const figlet = require('figlet')
const moment = require("moment-timezone")
const { color } = require('./lib/color')
const welcome = require('./message/group')

const starts = async (client = new WAConnection()) => {
	let authofile = './session.json'
    	client.version = [2, 2119, 6]
	client.browserDescription = ["YUIGAHAMA - BOT", "Chrome", "1.0.0"]
	client.logger.level = 'warn'
	CFonts.say('Whatsapp BOT AUTOMATE', {
    font: '3d',
    align: 'center',
    gradient: ['red', 'magenta']
	})
	console.log(color(figlet.textSync('NAGISA', 'Standard'), 'cyan'))
	client.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(color('[ YUI ]', 'yellow'), color('Scan Qr'))
    })
	fs.existsSync(authofile) && client.loadAuthInfo(authofile)
	client.on('connecting', () => {
		console.log(color('[ YUI ]', 'yellow'), color('Connecting...'))
	})
	client.on('open', () => {
		console.log(color('[ YUI ]', 'yellow'), color('Connect'))
	})
	console.log(color('[ YUI ]', 'yellow'), color('Nagisa is now online!'))
	await client.connect({timeoutMs: 30*1000})
    fs.writeFileSync(authofile, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))


    client.on('chat-update', async (message) => {
		require('./message/msgHandler.js')(client, message)
	})

	client.on('group-participants-update', async (anu) => {
	var groupMetadata = await client.groupMetadata(anu.jid)
	var group_name = groupMetadata.subject
    var time = moment.tz('Asia/Jakarta').format("HH:mm")
    var group_desc = groupMetadata.desc
    var group_member = groupMetadata.participants.length
	try {
	console.log(anu)
	if (anu.action == 'add') {
	num = anu.participants[0]
	try {
	ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
	} catch {
	ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	}
	user_name = await client.getName(num)
	teks = `Hi ${user_name}, Welcome to ${group_name}\nGroup Member: ${group_member}\n\n${group_desc}`
	client.sendFile(groupMetadata.id, ppimg, 'welcome.jpeg', teks)
	} else if (anu.action == 'remove') {
	num = anu.participants[0]
	try {
	ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
	} catch {
	ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	}
	user_name = await client.getName(num)
	teks = `Sayonara ${user_name}\n\nGroup Member: ${group_member}`
	client.sendFile(groupMetadata.id, ppimg, 'welcome.jpeg', teks)
	}
	} catch (e) {
	console.log('Error : %s', color(e, 'red'))
	}
	})
}

starts()
