import * as crypto from 'crypto';

const testAES = (msg: string) => {
    const key = crypto.randomBytes(32).toString('hex')
    const iv = crypto.randomBytes(16).toString('hex')
    console.log('Key:', key)
    console.log('IV:', iv)

    const encrypted = aes_encrypt(msg, key, iv)
    console.log('Encrypted:', encrypted)

    const decrypted = aes_decrypt(encrypted, key, iv)
    console.log('Decrypted:', decrypted)
}

const testRSA = (msg: string) => {
    const keyPair = generateKeyPair()
    console.log('Private Key:\n', keyPair.privateKey)
    console.log('Public Key:\n', keyPair.publicKey)

    const encrypted = rsa_encrypt(msg, keyPair.publicKey)
    console.log('Encrypted:', encrypted)

    const decrypted = rsa_decrpypt(encrypted, keyPair.privateKey)
    console.log('Decrypted:', decrypted)
}

const aes_encrypt = (msg: string, key: string, iv: string) => {
    const algorithm = 'aes-256-cbc'
    const keyBuffer = Buffer.from(key, 'hex')
    const ivBuffer = Buffer.from(iv, 'hex')
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer)
    let encrypted = cipher.update(msg, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

const aes_decrypt = (encrypted: string, key: string, iv: string) => {
    const algorithm = 'aes-256-cbc'
    const keyBuffer = Buffer.from(key, 'hex')
    const ivBuffer = Buffer.from(iv, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });
    return { privateKey, publicKey }
}

const rsa_encrypt = (msg: string, key: string) => {
    const encrypted = crypto.publicEncrypt(
        key,
        Buffer.from(msg, 'utf-8')
    );
    return encrypted.toString('base64');
}

const rsa_decrpypt = (encrypted: string, key: string) => {
    const decrypted = crypto.privateDecrypt(
        key,
        Buffer.from(encrypted, 'base64')
    );
    return decrypted.toString('utf-8');
}

testAES('Hello, World!')
testRSA('Hello, World!')