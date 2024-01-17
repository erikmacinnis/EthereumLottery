import web3 from './Web3';

const address = '0xA61A55ca40bE31995587422ad900CE9cF0Fef468';

const abi = [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      payable: undefined,
      signature: 'constructor'
    },
    {
      inputs: [],
      name: 'chooseWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0xcd38aa87'
    },
    {
      inputs: [ [Object] ],
      name: 'getMap',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x025799f0'
    },
    {
      inputs: [],
      name: 'getSlotId',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x65868d60'
    },
    {
      inputs: [],
      name: 'makeBid',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xf30e3658'
    },
    {
      inputs: [],
      name: 'refresh',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0xf8ac93e8'
    }
  ]
// I think you gotta have address for a deployed contract
// export default new web3.eth.Contract(abi, address);
export default new web3.eth.Contract(abi, address);
