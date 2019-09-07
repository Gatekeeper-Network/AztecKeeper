const { JoinSplitProof, note } = require('aztec.js');
const secp256k1 = require('@aztec/secp256k1');

// dummy address of confidential AZTEC - DAI smart contract
const validatorAddress = '0x76581320dCdFFC93E2FFFF7DADfE668Ba55796a9';

const accounts = [secp256k1.generateAccount(), secp256k1.generateAccount()];

async function GenerateTransferTX(account1,account2,inputAmount,transferAmount){
const note1=await note.create(accounts[0].publicKey, inputAmount-transferAmount)
const note2=await note.create(accounts[0].publicKey, 0)    
const inputNotes = [note1,note2]
const outnote1=await note.create(accounts[1].publicKey, inputAmount+transferAmount)
const outnote2=await note.create(accounts[1].publicKey, 0) 
const outputNotes =[outnote1,outnote2];

const publicValue = -transferAmount; // input notes contain 10 fewer than output notes = deposit of 10 public tokens
const sender = accounts[0].address; // address of transaction sender
const publicOwner = accounts[0].address; // address of public token owner

const proof = new JoinSplitProof(inputNotes, outputNotes, sender, publicValue, publicOwner);

//data can be directly fed into an ZkAsset.sol contract's confidentialTransfer method
const data = proof.encodeABI(validatorAddress);

console.log('data', proof);
}

GenerateTransferTX(accounts[0],accounts[1],150,10)