const caseeval = async(command, q, util, client, message, from, isOwner, syntaxErr) => {
    if(!isOwner) return
	let _syntax = ''
    let _return
    let _text = `;(async () => {${(/^=/.test(command) ? 'return ' : '') + q}})()`
        try {
            _return = await eval(_text)
        }catch(e) {
            let err = await syntaxErr(_text)
            if (err) _syntax = err + '\n\n'
             _return = e
        }finally {
            client.reply(from, _syntax + util.format(_return), message)
        }
}

module.exports = caseeval