const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider(
    'exercise uncover canal feel post merry ski stairs awake giggle mixture engage',
    'https://rinkeby.infura.io/v3/<Add your api key>'
)
const Web3 = require('web3');
const web3 = new Web3(provider);
const { abi, bytecode } = require('./artifacts/contracts/Lottery.sol/Lottery.json');

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const lottery = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 });

    console.log('Contract deployed to', lottery.options.address);
}
deploy();