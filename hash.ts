import { createHash } from 'crypto';

const sha256 = (input: string)=>{
  return createHash('sha256')
    .update(input)
    .digest('hex')
}

const testSHA256 = ()=>{
    const input1 = 'Hello, world!'
    const input2 = 'Hello, world! '
    const hash1 = sha256(input1)
    const hash2 = sha256(input2)
    console.log(`Hash: ${hash1}`)
    console.log(`Hash: ${hash2}`)
}

testSHA256()