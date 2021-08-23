const {
	MessageType,
	Mimetype
} = require("@adiwajshing/baileys");
const toMs = require('ms');

// TEBAK GAMBAR
const addgambar = (chatId, jawaban, expired, _db) => {
    let obi = { id: chatId, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`) }
    _db.push(obi)
}
const getJawabanTG = (chatId, _db) => {
    let found = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            found = i
        }
    })
    if (found !== false) {
        return _db[found].jawaban
    }
}
const isTebakGambar = (chatId, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            status = true
        }
    })
    return status
}
const cekWaktuTG = (nino, _dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            client.sendMessage(_dir[position].id, `*Waktu habis*\n\n*Jawaban :* ${_dir[position].jawaban}`, MessageType.text)
            _dir.splice(position, 1)
        }
    }, 1000)
}
const getTGPosi = (chatId, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}


module.exports = {
    addgambar,
    getJawabanTG,
    isTebakGambar,
    cekWaktuTG,
    getTGPosi,
}