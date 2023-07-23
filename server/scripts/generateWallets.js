const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const wallets = [];

for (let i = 0; i < 10; i++) {
    const privateKey = toHex(secp256k1.utils.randomPrivateKey());
    const publicKey = toHex(secp256k1.getPublicKey(privateKey));
    wallets.push({privateKey, publicKey});
}

console.log(wallets);
