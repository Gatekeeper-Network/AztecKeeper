const secp256k1 = require('@aztec/secp256k1');
const accounts = [secp256k1.generateAccount(), secp256k1.generateAccount(),secp256k1.generateAccount(),secp256k1.generateAccount(),secp256k1.generateAccount()];
console.log(accounts)