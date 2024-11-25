import * as crypto from 'crypto';

const alice = crypto.createECDH('secp256k1')
alice.generateKeys()
const A = alice.getPrivateKey()
const a = alice.getPublicKey()
console.log('Ash Private Key: ', A.toString('hex'))
console.log('Ash Public Key: ', a.toString('hex'))

const bob = crypto.createECDH('secp256k1')
bob.generateKeys()
const B = bob.getPrivateKey()
const b = bob.getPublicKey()
console.log('Bob Private Key:', B.toString('hex'))
console.log('Bob Public Key:', b.toString('hex'))

const aliceSharedSecret = alice.computeSecret(b);
console.log('Alice Shared Secret:', aliceSharedSecret.toString('hex'));

const bobSharedSecret = bob.computeSecret(a);
console.log('Bob Shared Secret:', bobSharedSecret.toString('hex'));

console.log('Shared secrets match:', aliceSharedSecret.equals(bobSharedSecret));