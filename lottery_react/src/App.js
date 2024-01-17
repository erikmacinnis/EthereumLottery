import React from 'react';
import lottery from './Lottery';
import web3 from './Web3';

class App extends React.Component {
    
    state = {
        slotId: 0,
        balance: '',
        value: '',
        message: ''
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const slotId = await lottery.methods.getSlotId().call({from: accounts[0], gas: 1000000});
        const balance = await web3.eth.getBalance(lottery.options.address);
        this.setState({ slotId, balance });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({message: 'Waiting on transaction success...'})

        const accounts = await web3.eth.getAccounts();

        await lottery.methods.makeBid().send({ 
            from: accounts[0], 
            value: web3.utils.toWei(this.state.value, 'ether')
        });

        this.setState({ message: 'You have been entered'})
    }

    async onClick() {
        const accounts = await web3.eth.getAccounts();
        
        this.setState({message: 'Waiting on transaction success...'})

        await lottery.methods.chooseWinner().send({
            from: accounts[0],
        })

        this.setState({ message: 'A winner has been picked' })
    }

    render() {
        
        return (
            <div>
                <h1>This is the current slotId</h1>
                <p>
                    There are currently {this.state.slotId} people entered, 
                    competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether! 
                </p>

                <hr />

                <form onSubmit={event => this.onSubmit(event)}>
                    <h4>Want to try your luck</h4>
                    <div>
                        <label>Amount of ether to enter</label>
                        <input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </div>
                    <button>Enter</button>
                </form>

                <hr />

                <hr />
                <h4>Ready to pick a winner?</h4>
                <button onClick={() => this.onClick()}>Pick a winner!</button>
                <hr />

                <h1>{this.state.message}</h1>
            </div>
        )
    }
}

export default App;