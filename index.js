const fs = require('fs');
const { WAConnection, MessageType, Mimetype, GroupSettingChange } = require('@adiwajshing/baileys');
const ffmpeg = require('fluent-ffmpeg');

const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

const auth = './session.json'
const botName = 'MaiBot'
const prefix = '$'

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
i.isAdmin ? admins.push(i.jid) : ''
}
return admins
}

async function starts() {
const client = new WAConnection()
client.logger.level = 'warn'
client.version = [2, 2143, 3]
client.browserDescription = [ botName, '', '3.0' ]

client.on('qr', () => {
console.log('Escanee el codigo qr')
})

fs.existsSync(auth) && client.loadAuthInfo(auth)
client.on('connecting', () => {
console.log('Conectando')
})

client.on('open', () => {
const authInfo = client.base64EncodedAuthInfo()
fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
console.log('Conectado')
})

await client.connect({timeoutMs: 30 * 1000})

client.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
if (!mek.messages) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return

const mek = mek.messages.all()[0]
if (!mek.message) return
global.blocked
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const content = JSON.stringify(mek.message)
const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''

if (prefix != "") {
if (!body.startsWith(prefix)) {
cmd = false
comm = ""
} else {
cmd = true
comm = body.slice(1).trim().split(" ").shift().toLowerCase()
}
} else {
cmd = false
comm = body.trim().split(" ").shift().toLowerCase()
}

const command = comm

const args = budy.trim().split(/ +/).slice(1)
const isCmd = budy.startsWith(prefix)
const q = args.join(' ')
const client_user = client.user.jid
const botNumber = client.user.jid.split('@')[0]
const ownerNumber = ['595995660558', '595981997622', '595995605397']
const isGroup = from.endsWith('@g.us')
const typeMessage = body.substr(0, 50).replace(/\n/g, '')
const sender = mek.key.fromMe ? client.user.jid : isGroup ? mek.participant : mek.key.remoteJid
const senderNumber = sender.split('@')[0]
const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''

const itsMe = senderNumber == botNumber
const isBotAdmin = groupAdmins.includes(client.user.jid)
const isGroupAdmins = groupAdmins.includes(sender) || false

const isOwner = ownerNumber.includes(senderNumber)

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

const mess = {
only: {
group: 'Comando solo para grupos',
botadmin: `${botName} necesita ser admin`,
admins: 'Comando solo para administradores'
}
}

const reply = async(teks) => {
await client.sendMessage(from, teks, text, {quoted: mek, contextInfo: {mentionedJid: [sender]}})
}

switch (command) {

case '':

break

default:



}

} catch (e) {
const emror = String(e)
if (emror.includes('this.isZero')){
return
}
if (emror.includes('jid')){
return
}
console.log(e)
client.sendMessage('595981997622@s.whatsapp.net', `${e}`, text, {quoted: mek})
}
})
}

starts()
