//by https://github.com/Franky404/whatsapp-bot
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const suit = async(client, message, from, q, pushname) => {
	if (!q) return client.reply(`Kirim perintah ${prefix}suit [pilihan]\nContoh: ${prefix}suit gunting`, message)
                if (!q.match(/batu|gunting|kertas/)) return client.reply(from, `Format salah!`, message)
                if (q.match(/batu|gunting|kertas/)) {
                    await sleep(2000)
                    var computer = Math.random();
                if (computer < 0.34) {
                        computer = 'batu';
                } else if (computer >= 0.34 && computer < 0.67) {
                        computer = 'gunting';
                } else {
                        computer = 'kertas';
                }
                if (q == computer) {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: ${q}\n✽ Yui: ${q}\n\n_Pertandingan Draw Akibat Keberuntunan_!`, message)
                } else if (q == 'batu') {
                if (computer == 'gunting') {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: Batu\n✽ Yui: Gunting\n\nCongrats You win!`, message)
                } else {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: Batu\n✽ Yui: Kertas\n\nYou lose:(`, message)
                }
                } else if (q == 'gunting') {
                if (computer == 'batu') {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: Gunting\n✽ Yui: Batu\n\nYou lose:(`, message)
                } else {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: Gunting\n✽ Yui: Kertas\n\nCongrats You win!`, message)
                }
                } else if (q == 'kertas') {
                if (computer == 'batu') {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: Kertas\n✽ Yui: Batu\n\nCongrats You win!`, message)
                                } else {
                        client.reply(from, `*RESULT*\n\n✽ ${pushname}: Kertas\n✽ Yui: Gunting\n\nYou lose:(`, message)
                }
                }
                }
}
module.exports = suit