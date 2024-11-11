import { createHmac, randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const generateHmac = (key: string, message: string)=>{
  const hmac = createHmac('sha256', key);
  hmac.update(message);
  return hmac.digest('hex');
}

const testHmac = ()=>{
    const message = 'Hello, World!'
    const key1 = 'random_key_A'
    const key2 = 'random_key_B'
    const hmac1 = generateHmac(key1, message)
    const hmac2 = generateHmac(key2, message)
    console.log(hmac1)
    console.log(hmac2)
}

const testAesGcm = ()=>{
    const message = 'Hello, World!'
    const key = randomBytes(32)
    const iv = randomBytes(12)
    console.log(`KEY: ${key.toString('hex')}`)
    console.log(`IV: ${iv.toString('hex')}`)

    const cipher = createCipheriv('aes-256-gcm', key, iv)
    let encrypted = cipher.update(message, 'utf8')
    encrypted = Buffer.concat([encrypted, cipher.final()])
    const authTag = cipher.getAuthTag()
    console.log(`ENCRYPTED: ${encrypted.toString('hex')}`)
    console.log(`   AUTH TAG: ${authTag.toString('hex')}`)

    const decipher = createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)
    let decrypted = decipher.update(encrypted)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    console.log(`DECRYPTED: ${decrypted.toString('utf8')}`)
  }
  

testHmac()
testAesGcm()