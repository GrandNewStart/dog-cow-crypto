import * as crypto from 'crypto'

const sign = (msg: string, key: string)=>{
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(msg)
    sign.end()
    return sign.sign(key, 'base64')
}

const verify = (msg: string, sig: string, key: string)=>{
    const verify = crypto.createVerify('RSA-SHA256')
    verify.update(msg)
    verify.end()
    return verify.verify(key, sig, 'base64')
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
    })
    return { privateKey, publicKey }
}

const testSign = ()=>{
    const msg = 'Hello, World!'

    const kp = generateKeyPair();
    console.log(`Private Key: ${kp.privateKey}`)
    console.log(`Public Key: ${kp.publicKey}`)

    const signature = sign(msg, kp.privateKey)
    console.log(`Signature: ${signature}`)

    const verified = verify(msg, signature, kp.publicKey)
    console.log(`Verified: ${verified}`)
}

testSign()