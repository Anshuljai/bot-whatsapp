const menu = require('./ind/menu')

const listresponse = async(client,message, from, prefix) => {
	let listTitle = message.msg.title
		switch(listTitle) {
			case 'Menu Download':
				client.sendText(from, menu.menuDownloader(prefix), message)
				break
			case 'Menu Game':
				client.sendText(from, menu.menuGame(prefix), message)
				break
			case 'Menu Convert':
				client.sendText(from, menu.menuConvert(prefix), message)
				break
		}
	}

module.exports = {
	listresponse
}