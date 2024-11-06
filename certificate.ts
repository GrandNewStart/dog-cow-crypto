import { execSync } from 'child_process'
import fs from 'fs'

const testCertificate = ()=>{
    // Generate a private key
    execSync('openssl genpkey -algorithm RSA -out privateKey.pem -pkeyopt rsa_keygen_bits:2048')

    // Generate a CSR
    execSync(`openssl req -new -key privateKey.pem -out csr.pem -subj "/C=KR/ST=Seoul/L=Mapogu/O=GDGSogang/OU=DogCowCrypto/CN=dogcowcrypto.com"`)

    // Generate a self-signed certificate
    execSync('openssl x509 -req -in csr.pem -signkey privateKey.pem -out certificate.pem -days 365')

    // Read and display the generated files
    const privateKey = fs.readFileSync('privateKey.pem', 'utf-8')
    const csr = fs.readFileSync('csr.pem', 'utf-8')
    const certificate = fs.readFileSync('certificate.pem', 'utf-8')

    console.log('Private Key:\n', privateKey)
    console.log('CSR:\n', csr)
    console.log('Certificate:\n', certificate)
}

testCertificate()