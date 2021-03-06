const Web3 = require('web3');
const TX=require('ethereumjs-tx')
let host='localhost'
let port='8545'
const provider = new Web3.providers.HttpProvider(`http://${host}:${port}`);
web3 = new Web3(provider);
//console.log(web3)
const tokenMintABI={
    "constant": false,
    "inputs": [
      {
        "name": "_account",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "giveMeTokens",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
  const TestAccounts=[
    {
      privateKey: '0x3f05a19bde91268f6d58805a802d44646cdb05984d0b40938cd5483f99a18e88',
      publicKey: '0x04b6c87d98adcebeb3171db5d4339d8ee07107c089f37be23d66d6fcdf89dd5824dff1790bb37b27ccb4b9faae8306f3e4e72931880e7a76f90388d401810bce93',
      address: '0x523e1661F7c7354af1E300D033dca359F9129da9'
    },
    {
      privateKey: '0x8aef03be0d7ad1acb3a58bee857ac39f0af597ea4562988efe60c1a47c4d3da1',
      publicKey: '0x040eba32f153aa4c13b9ffca975d6a0a79264c8923a71256f7eb605ee5e764adb8d2fddbbd5d2b275281b0b51edd91e800b46d5eb6cb613af6d9086acf0a68cf97',
      address: '0xC9D0B2de5163Fd57D0Cacd3AeE0280224752171c'
    },
    {
      privateKey: '0xdb1d0efa9f671bf0a96944c930892b4b0f87b1a37a832fd79c4858d44e026e69',
      publicKey: '0x04c455c1dcbeef932e4edf468112e05adfb9d109e79d1f66421b2def13cbbef67913366f7ad1a44fac860cbeb328c894076d7690b5a611f12086281ed78f1bbedd',
      address: '0xF877b4d46d80363bFC44520eC9E1e97DF82BfcFF'
    },
    {
      privateKey: '0x0482eb9422f81b1c31547cf9e45a5e97a82f7cae1fe24f7a1d9c220e616edc49',
      publicKey: '0x04facc7c127112783067e5b0d6c39558f01cb3ccb6c82ea18a3be857de3b519ba9b7ef8c8e8e7d382fabed6a4d9484ff6af56505b2d390a00d3aad7e12ac579378',
      address: '0x7677103305E79e5b6BA77a93A68adE08bC2F6ee3'
    },
    {
      privateKey: '0x26fe1a9bdbf3afa97c0006a950a3fe9b0c8a56439349abff8041367d34bd3bca',
      publicKey: '0x042977311a2e29cf0abe4c763b16e929f9626f16fcb231643ac9b99eba950dde053b06d953cc23db0bb839922deb21dbddaef01b6e3dfaa8c9a070d7281a55ece9',
      address: '0x5AF11F391bf01Cb458b715a42657372f3A2dE5Ac'
    }
  ]
  const tokenAddress=''
  const TokenAmount=100000000000000

  function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
        console.log("sleeping")
    })
}
  function CreateTX(nonce,gasPrice,gasLimit,value,to,data,pk){
 
    const tx = new TX(null, 1);
  
    tx.nonce = nonce
    tx.gasPrice = gasPrice
    tx.gasLimit = gasLimit
    tx.value = value
   
      tx.to=to
    
    if(data.length>3){  
    tx.data = data
    }
    
    tx.sign(pk)
    const ret="0x"+tx.serialize().toString('hex')
    return ret
  }
  
   async function SendWeb3Transaction(functionABI,inputarray,fromAddress,PrivateKey,contract,web3,gas){
     try{
      var nonce= await web3.eth.getTransactionCount(fromAddress)
      console.log(nonce)
      var DATA=web3.eth.abi.encodeFunctionCall(functionABI,inputarray)
    
      var buf=Buffer.from(PrivateKey,'hex')
      let TXData=CreateTX(nonce,'0x2540be400',gas,0,contract,DATA,buf)
    
       let tx=await web3.eth.sendSignedTransaction(TXData)
       console.log(tx.logs)
   
     }catch(err){
       console.log(err)
     }
      
  }

  async function MintTokensForTestAccounts(){
    for(var i=0;i<TestAccounts.length;i++){
       await SendWeb3Transaction(tokenMintABI,[TokenAmount],TestAccounts[i].address,TestAccounts.privateKey,tokenAddress,web3,1000000)
    }


  }


  SendWeb3Transaction(tokenMintABI,['0x909E433c507A398a5405677B5b2767a3f523F73b',TokenAmount],'0x909E433c507A398a5405677B5b2767a3f523F73b','60cd6638b6578d0bced19e5d8673d15a8d3a148136e914ea442b1cc9fd0970a2','0x1fE2f08A5D69e6A886B349bd8c26407C0e3Ef89d',web3,100000)