import React from 'react';
import {
  Block, 
  Text, 
  Image, 
  Button, 
  FlexBox,
  TextInput,
  Col,
  Row
} from '@aztec/guacamole-ui';
import EthBoston from './images/text-ethboston.png';
import Aztec from './images/logo.png';
import './App.css';

/* eslint-enable */
import Web3Service from './services/Web3Service';
import depositToERC20 from './utils/depositToERC20';

import {
  enable,
  deposit,
  send,
  getBalance
} from './demo';

class App extends React.Component {

  state = {
    balance: 0,
    address: '',
    amount:0
  };


  _updateToAddress(value) {
    this.setState({ to: value });
  }
  _updateToAmount(value) {
    this.setState({ amount: value },()=>{console.log(this.state)});
  }


  render () {
    return (
      <div className="App">
        <Block 
          background="primary"
          padding="xl"
          layer='3'
          style={{
            background: 'white'
          }}
        >
          <FlexBox direction='row' align='space-around' valign='center' >
            <Image src={Aztec} width={'300'} />
            <Text 
              text='Welcome to AZTECKEEPER'
              size = 'xxl' 
              color='primary'
              weight = 'bold'
            />
            <Image src={EthBoston} width={'300'} />
          </FlexBox>
        </Block>
        <Block padding='l xxl'>
        
          
        </Block>
        <br/>
        <br/>
        <br/>
        <Block padding='xxl'>
          <Row>
          <Col column='6' padding='none'>
            <Block padding='l xxl' background='primary' borderRadius='s'>
              <FlexBox padding='none' direction='column' align='flex-start'>
                <Text text={`ZkAsset Address:${this.state.address}`} colour='white' size ='l' weight='bold' textAlign='left'/>
                <Text text={`ZkAsset Balance:${this.state.balance}`} colour='white' size ='l' weight='bold'  textAlign='left'/>
              </FlexBox>
            </Block>
            <Block 
            background='primary-lightest'
            padding='xl'
            borderRadius='s'
            align='left'
          >
            
            <br/>
            <Button text='Enable AZTEC' isLoading={this.state.enableLoading} onClick={async ()=> {
              if (!window.aztec) {
                alert('Please install the aztec extension');
                return;
              }
              this.setState({enableLoading: true});
              await enable();
              const balance = await getBalance();


              this.setState({enableLoading: false, ...balance});
            }} />
        </Block>  
          </Col>
          <Col>
          <Block 
      background='primary-lightest'
      padding='xl'
      borderRadius='s'
        >
      <FlexBox direction='column'>
       
        <Text text='Send your Asset anonymously through lora' />
      </FlexBox>
      <br/>
      <br/>
      <TextInput placeholder='Recipient' onChange={(value)=>this._updateToAddress(value)}/>
      <br/>
      <br/>
      <TextInput placeholder='Token Amount' onChange={(value)=>this._updateToAmount(value)}/>
      <br/>
      <br/>
      <Button text='Send AZTEC Notes' isLoading={this.state.sendLoading} onClick={async ()=> {
        if (!window.aztec) {
          alert('Please install the aztec extension');
          return;
        }
        this.setState({sendLoading: true});
        await send({amount: this.state.amount, to: this.state.to});
        const balance = await getBalance();

        this.setState({sendLoading: false, ...balance});
      }} />
  </Block>
          </Col>
         </Row> 
        </Block>
        <Block padding='xxl' align='left'>

          <Col column='6' padding='none'>
          <Block 
            background='primary-lightest'
            padding='xl'
            borderRadius='s'
            align='left'
          >
            
            <br/>
            <Button text='Enable AZTEC' isLoading={this.state.enableLoading} onClick={async ()=> {
              if (!window.aztec) {
                alert('Please install the aztec extension');
                return;
              }
              this.setState({enableLoading: true});
              await enable();
              const balance = await getBalance();


              this.setState({enableLoading: false, ...balance});
            }} />
        </Block>

        <br/>
      <br/>
      <Block 
        background='primary-lightest'
        padding='xl'
      borderRadius='s'
    >
      <FlexBox direction='column'>
        
        <Text text='Exchange Tokens for a zero knowledge Asset' />
      </FlexBox>
      <br/>
      <Button text='Wrap ERC20' isLoading={this.state.depositLoading} onClick={async ()=> {
        if (!window.aztec) {
          alert('Please install the aztec extension');
          return;
        }
        this.setState({depositLoading: true});
        await deposit(100);

        const balance = await getBalance();
        this.setState({depositLoading: false, ...balance});
        }} />
    </Block>

    <br/>
    <br/>
    <Block 
      background='primary-lightest'
      padding='xl'
      borderRadius='s'
    >
      <FlexBox direction='column'>
       
        <Text text='Send your Asset anonymously through lora' />
      </FlexBox>
      <br/>
      <br/>
      <TextInput placeholder='Recipient' onChange={(value)=>this._updateToAddress(value)}/>
      <br/>
      <br/>
      <TextInput placeholder='Token Amount' onChange={(value)=>this._updateToAmount(value)}/>
      <br/>
      <br/>
      <Button text='Send AZTEC Notes' isLoading={this.state.sendLoading} onClick={async ()=> {
        if (!window.aztec) {
          alert('Please install the aztec extension');
          return;
        }
        this.setState({sendLoading: true});
        await send({amount: this.state.amount, to: this.state.to});
        const balance = await getBalance();

        this.setState({sendLoading: false, ...balance});
      }} />
  </Block>
      </Col>
</Block>

      </div>
    );
  }
}

export default App;
