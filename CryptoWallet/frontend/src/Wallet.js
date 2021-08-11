import "./Wallet.css"
import React from 'react';

const map = {
    "btc": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=013",
    "eth": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
    "doge": "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=013",
    "usdt": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=013",
    "bnb": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=013"
}

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remained: 1000,
        };
    }

    pay(amount) {
        console.log(this.state.remained)
        console.log(amount)
        this.setState({
            remained: this.state.remained - amount
        })
    }

    render() {
        return (
            <section className="wallet">
                <img className="crypto-logo" src={map[this.props.symbol]} alt={this.props.symbol}></img>
                <div>
                    <p>Price in USD: {this.props.price}</p>
                    <p>Remained crypto: {parseFloat(this.state.remained).toFixed(6)}</p>
                    <p>Cost in crypto: {this.props.cost}</p>
                </div>
            </section>
        )
    }
}

export default Wallet;