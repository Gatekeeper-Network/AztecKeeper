import Web3Service from '../services/Web3Service';
import depositToERC20 from './helpers/depositToERC20';
import axios from 'axios'
import ACE from '../build/ACE';
import ZkAssetOwnable from '../build/ZkAssetOwnable';
import AZTECAccountRegistry from '../build/AZTECAccountRegistry';
import ERC20Mintable from '../build/ERC20Mintable';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const enable = async () => {

    await Web3Service.init();

    Web3Service.registerContract(ACE);
    Web3Service.registerContract(AZTECAccountRegistry);

    await window.aztec.enable({contractAddresses: {
        ace: Web3Service.contract('ACE').address,
        aztecAccountRegistry: Web3Service.contract('AZTECAccountRegistry').address
    }});
    Web3Service.registerInterface(ERC20Mintable, {
        name: 'ERC20',
    });
    Web3Service.registerContract(ZkAssetOwnable);

}

export const getBalance = async() => {
    
    const { aztec } = window;
    console.log(aztec)
    console.log('AZTEC Object')
    let zkAssetAddress = Web3Service.contract('ZkAssetOwnable').address; // ADD EXISTING ASSET ADDRESS HERE
    const asset = await aztec.asset(zkAssetAddress);
    return {
        balance: await asset.balance(),
        address: zkAssetAddress
    };
}

export const deposit = async ({

    initialERC20Balance = 200,
    scalingFactor = 1,
    depositAmount = 100,
}) => {
    
    const { aztec } = window;

    await enable();

    const {
        address: userAddress,
    } = Web3Service.account;

let zkAssetAddress = Web3Service.contract('ZkAssetOwnable').address; // ADD EXISTING ASSET ADDRESS HERE

    const asset = await aztec.asset(zkAssetAddress);
    if (!asset.isValid()) {
        // TODO
        // wait for data to be processed by graph node
        // this should be handled in background script
        await sleep(2000);
        await asset.refresh();
    }
    if (!asset.isValid()) {
        console.log('Asset is not valid.');
        return;
    }

    console.log(`Asset balance = ${await asset.balance()}`);

    let erc20Balance = await asset.balanceOfLinkedToken();
    if (erc20Balance >= depositAmount) {
        console.log(`ERC20 account balance = ${erc20Balance}`);
    } else {
        console.log(`ERC20 balance (${erc20Balance}) is not enough to make a deposit of ${depositAmount}.`);

        console.log('Sending free token...', {
            userAddress,
            amount: depositAmount,
        });

        await depositToERC20({
            userAddress,
            amount: depositAmount,
            erc20Address: asset.linkedTokenAddress,
        });

        erc20Balance = await asset.balanceOfLinkedToken();
        console.log(`Your new ERC20 account balance is ${erc20Balance}.`);
    }

    console.log('Generating deposit proof...');
    const depositProof = await asset.deposit(depositAmount);
    if (!depositProof) {
        console.log('Failed to generate deposit proof.');
        return;
    }
    console.log('Approving deposit...');
    await depositProof.approve();
    console.log('Approved!');

    console.log('Making deposit...');
    const incomeNotes = await depositProof.send();
    if (!incomeNotes) {
        console.log('Failed to deposit.');
        return;
    }
    console.log(`Successfully deposited ${depositAmount} to asset '${zkAssetAddress}'.`, {
        notes: incomeNotes,
    });

    await sleep(2000);
    console.log(`Asset balance = ${await asset.balance()}`);

}


export const send = async ({
    amount ,
    to,
}) => {
    
    const { aztec } = window;


    await enable();
    console.log(Web3Service.contracts);

    let zkAssetAddress = Web3Service.contract('ZkAssetOwnable').address; // ADD EXISTING ASSET ADDRESS HERE

    const asset = await aztec.asset(zkAssetAddress);
    if (!asset.isValid()) {
        // TODO
        // wait for data to be processed by graph node
        // this should be handled in background script
        await sleep(2000);
        await asset.refresh();
    }
    if (!asset.isValid()) {
        console.log('Asset is not valid.');
        return;
    }

    console.log(`Asset balance = ${await asset.balance()}`);
    
    const sendAmount = 1;
    const receiver = '0x0563a36603911daaB46A3367d59253BaDF500bF9';
     amount=parseInt(amount)
    console.log('Generating send proof...');
    const sendProof = await asset.send({
        amount,
        to,
        
    }, {
        numberOfOutputNotes: 1,
    });
    let exported=sendProof.export()
    console.log(exported)
    let TXdata=exported.encodeABI(zkAssetAddress)
    console.log(TXdata.length)
    console.log('Approving send proof...');
    await sendProof.approve();
    console.log('Approved!');
   
    console.log('Sending...');
    //await sendProof.send(); 
    window.alert(TXdata+" Your Transaction is being sent through LoRa")
    axios.post('http://localhost:3000/Relay', {
        TXdata
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(`Successfully sent ${sendAmount} to account '${receiver}'.`);

    await sleep(2000);
    console.log(`Asset balance = ${await asset.balance()}`);

}
export const sendSimple = async ({
    amount ,
    to,
}) => {
    
    /*let initialAmount=await asset.balance()
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
*/
}