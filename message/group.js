const moment = require("moment-timezone")


module.exports = welcome = async (client, message) => {
	var groupMetadata = await client.groupMetadata(message.jid)
	var from = groupMetadata.id
	var num = message.participants[0]
	let v = client.contacts[num] || { notify: num.replace(/@.+/, '') }
	var user_name = v.vname || v.notify || num.split('@')[0]
    var group_name = groupMetadata.subject
    var time = moment.tz('Asia/Jakarta').format("HH:mm")
    var group_desc = groupMetadata.desc
    var group_member = groupMetadata.participants.length
		if (message.action == 'add') {
			var number = message.participants[0]
			try {
				ppimg = await client.getProfilePicture(`${message.participants[0].split('@')[0]}@c.us`)
			} catch(err) {
				ppimg = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`
			}
            var text = `Hi ${user_name}, Welcome to ${group_name}\nGroup Member: ${group_member}\n\n${group_desc}`
            client.sendFile(from, `http://hadi-api.herokuapp.com/api/card/welcome?nama=${user_name}&descriminator=${time}&memcount=${group_member}&gcname=${group_name}&pp=${ppimg}?q=60&bg=https://wallpapercave.com/wp/wp5493885.jpg`)
		}
		if (message.action == 'remove') {
			try {
				ppimg = await client.getProfilePicture(`${message.participants[0].split('@')[0]}@c.us`)
			} catch(err) {
				ppimg = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`
			}
            var text = `Sayonara ${user_name}\n\nGroup Member: ${group_member}`
            client.sendFile(from, `http://hadi-api.herokuapp.com/api/card/welcome?nama=${user_name}&descriminator=${time}&memcount=${group_member}&gcname=${group_name}&pp=${ppimg}?q=60&bg=https://wallpapercave.com/wp/wp5493885.jpg`)
		}
}

module.exports = welcome