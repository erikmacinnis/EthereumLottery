const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const assert = require('assert');
const { abi, bytecode } = require('../artifacts/contracts/Lottery.sol/Lottery.json')

let accounts, lottery;

beforeEach( async () => {

    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 })
})

describe('Testing Lottery Contract', () => {
    it('Test deployment', () => {
        console.log(lottery);
        assert.ok(lottery.options.address);
    })
    it('Test makeBid', async() => {
        try {
            await lottery.methods.makeBid().send({ from: accounts[1], value: web3.utils.toWei('0.3', 'ether')})
            const addy = await lottery.methods.getMap(1).call({ from: accounts[0] });
            assert.equal(addy, accounts[1]);
            const slot = await lottery.methods.getSlotId().call({ from: accounts[0] });
            assert.equal(slot, 1);
        }
        catch (err){
            console.log(err)
            assert(false);
        }
    })
    it('Test failed bid', async () => {
        try {
            await lottery.methods.makeBid().send({ from: accounts[2], value: web3.utils.toWei('0.2', 'ether') });
            assert(false);
        }catch (err) {
            assert(err);
        }
    })
    it('Allows multiple accounts to enter', async () => {
        try {
            await lottery.methods.makeBid().send({ from: accounts[1], value: web3.utils.toWei('0.3', 'ether')});
            await lottery.methods.makeBid().send({ from: accounts[2], value: web3.utils.toWei('0.3', 'ether')});
            const slotId = await lottery.methods.getSlotId().call({from: accounts[0]});
            const addy = await lottery.methods.getMap(2).call({from: accounts[0]});
            assert.equal(slotId, 2);
            assert.equal(addy, accounts[2]);
        } catch (err) {
            assert(false);
        }
    })
    it('only manager can call chooseWinner', async () => {
        try{
            await lottery.methods.chooseWinner().send({ from: accounts[1]})
            assert(false);
        } catch (err) {
            assert(err);
        }
    })

    it('manager can call chooseWinner', async () => {
        try{
            await lottery.methods.makeBid().send({ from: accounts[1], value: web3.utils.toWei('0.3', 'ether')});
            await lottery.methods.chooseWinner().call({ from: accounts[0] });
            assert(true);
        } catch (err){
            console.log(err);
            assert(false);
        }
    })

    it('winner gets money', async () => {
        try{
            await lottery.methods.makeBid().send({ from: accounts[0], value: web3.utils.toWei('0.3', 'ether')});
            const initialBalance = await web3.eth.getBalance(accounts[0]);
            console.log(initialBalance);
            await lottery.methods.chooseWinner().send({ from: accounts[0] });
            const currentBalance = await web3.eth.getBalance(accounts[0]);
            console.log(currentBalance);
            const difference = currentBalance - initialBalance;
            console.log(difference);
            assert(difference > web3.utils.toWei('0.2', 'ether'));
        } catch (err){
            assert(false);
        }
    })
})