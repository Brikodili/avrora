const axios = require('axios');
const nacl = require('tweetnacl');
const crypto = require('crypto');

const UTF8 = 'utf8';

const EVENT_PATH = '/api/events/add';

const LAST_ID_PATH = '/api/events/last-id';

async function getLastId(nodeUrl, space, key) {
    const params = { space, key };
    const res = await axios.get(nodeUrl + LAST_ID_PATH, { params });
    return res.data;
}

async function sendSignedTransaction(nodeUrl, event) {
    const params = { event };
    const res = await axios.get(nodeUrl + EVENT_PATH, { params });
    return res.data;
}

function signTransaction(privateKey, space, key, nonce, timestamp, value, memo = '', tags = []) {

    const secretKeyBytes = Buffer.from(privateKey, 'base64');

    const keyPair = nacl.sign.keyPair.fromSeed(secretKeyBytes);

    const tagsBuffersList = [];

    tags.forEach(tag => {
        tagsBuffersList.push(Buffer.from(tag, UTF8));
    });

    const tagsBuffer = Buffer.concat(tagsBuffersList);

    const nonceBuffer = Buffer.alloc(8);
    if(nonceBuffer.writeBigInt64BE) {
	nonceBuffer.writeBigInt64BE(BigInt(nonce));
    } else {
        nonceBuffer.writeUInt32BE(0);
        nonceBuffer.writeUInt32BE(nonce,4);
    }

    const tsBuffer = Buffer.alloc(8);
    if(tsBuffer.writeBigInt64BE){
        tsBuffer.writeBigInt64BE(BigInt(timestamp));
    } else {
        tsBuffer.writeUInt32BE(Math.floor(timestamp/(65536*65536)));
        tsBuffer.writeUInt32BE(timestamp%(65536*65536),4);
    }
    const messageBuffer = Buffer.concat([
        Buffer.from(space, UTF8),
        Buffer.from(key, UTF8),
        nonceBuffer,
        tsBuffer,
        Buffer.from(memo, UTF8),
        tagsBuffer,
        Buffer.from(value, UTF8)
    ]);

    const hash = crypto.createHash('sha256').update(messageBuffer).digest();

    const signature = nacl.sign.detached(hash, keyPair.secretKey);

    const encodedSignature =  Buffer.from(signature).toString('base64');

    const signedTransaction = {
        'space': space,
        'key': key,
        'nonce': nonce,
        'timestamp': timestamp,
        'tags': tags,
        'memo': memo,
        'value': value,
        'hash': Buffer.from(hash).toString('hex').toUpperCase(),
        'signature': encodedSignature,
        'public_key': Buffer.from(keyPair.publicKey).toString('base64')
    };

    return signedTransaction;

}

function encodeTransaction(signedTransaction) {
    const json = JSON.stringify(signedTransaction);

    return Buffer.from(json).toString('base64')
}

module.exports = {
    signTransaction,
    encodeTransaction,
    getLastId,
    sendSignedTransaction
};