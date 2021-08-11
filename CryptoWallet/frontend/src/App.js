import logo from './logo.svg';
import './App.css';
import React, { createRef } from 'react';
import Wallet from './Wallet';
import Checker from './Checker';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.btc_ref = React.createRef();
    this.eth_ref = React.createRef();
    this.doge_ref = React.createRef();
    this.usdt_ref = React.createRef();
    this.bnb_ref = React.createRef();
    this.state = {
      chosenSymbol: "", 
      amountDollar: 0,
      btc_price: 0,
      btc_cost: 0,
      eth_price: 0,
      eth_cost: 0,
      doge_price: 0,
      doge_cost: 0,
      usdt_price: 0,
      usdt_cost: 0,
      bnb_price: 0,
      bnb_cost: 0,
    };
  }

  handleChange = (prop, event) => {
    console.log(prop)
    this.setState({[prop]: event.target.value},
      () => { console.log(this.state.chosenSymbol) }
      )
    this.setState({
      btc_cost: (this.state.amountDollar / this.state.btc_price).toFixed(6),
      eth_cost: (this.state.amountDollar / this.state.eth_price).toFixed(6),
      doge_cost: (this.state.amountDollar / this.state.doge_price).toFixed(6),
      usdt_cost: (this.state.amountDollar / this.state.usdt_price).toFixed(6),
      bnb_cost: (this.state.amountDollar / this.state.bnb_price).toFixed(6)
    })
  };

  onClick = () => {
    console.log(111)
    console.log(this.state.chosenSymbol)
    console.log(this.state.chosenSymbol.toLowerCase()+"_ref")
    this[this.state.chosenSymbol.toLowerCase()+"_ref"].current.pay(this.state[this.state.chosenSymbol.toLowerCase() + "_cost"])
  }
  
  componentDidMount() {
    setInterval(() => {
      axios.all([
        axios.get('https://data.messari.io/api/v1/assets/btc/metrics'),
        axios.get('https://data.messari.io/api/v1/assets/eth/metrics'),
        axios.get('https://data.messari.io/api/v1/assets/doge/metrics'),
        axios.get('https://data.messari.io/api/v1/assets/usdt/metrics'),
        axios.get('https://data.messari.io/api/v1/assets/bnb/metrics')
      ])
      .then(axios.spread((btc_data, eth_data, doge_data, usdt_data, bnb_data) => {
        this.setState({
          btc_price: parseFloat(btc_data.data.data.market_data.price_usd).toFixed(2),
          eth_price: parseFloat(eth_data.data.data.market_data.price_usd).toFixed(2),
          doge_price: parseFloat(doge_data.data.data.market_data.price_usd).toFixed(6),
          usdt_price: parseFloat(usdt_data.data.data.market_data.price_usd).toFixed(6),
          bnb_price: parseFloat(bnb_data.data.data.market_data.price_usd).toFixed(4),
        })
        this.setState({
          btc_cost: (this.state.amountDollar / this.state.btc_price).toFixed(6),
          eth_cost: (this.state.amountDollar / this.state.eth_price).toFixed(6),
          doge_cost: (this.state.amountDollar / this.state.doge_price).toFixed(6),
          usdt_cost: (this.state.amountDollar / this.state.usdt_price).toFixed(6),
          bnb_cost: (this.state.amountDollar / this.state.bnb_price).toFixed(6)
        })
      }));
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div className="App">
        <div style={{marginTop: "5rem"}}>
          <p style={{marginBottom: "0rem"}}>Please type the amount of dollar: </p>
          <Input
            id="standard-adornment-amount"
            value={this.state.amountDollar}
            onChange={ e => this.handleChange("amountDollar", e)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </div>
        <main>
          <Wallet ref={this.btc_ref} price={this.state.btc_price} cost={this.state.btc_cost} symbol="btc"></Wallet>
          <Wallet ref={this.eth_ref} price={this.state.eth_price} cost={this.state.eth_cost} symbol="eth"></Wallet>
          <Wallet ref={this.doge_ref} price={this.state.doge_price} cost={this.state.doge_cost} symbol="doge"></Wallet>
          <Wallet ref={this.usdt_ref} price={this.state.usdt_price} cost={this.state.usdt_cost} symbol="usdt"></Wallet>
          <Wallet ref={this.bnb_ref} price={this.state.bnb_price} cost={this.state.bnb_cost} symbol="bnb"></Wallet>
        </main>
        <div style={{marginBottom: "2rem"}}>
          <p style={{marginBottom: "1rem"}}>Please choose your crypto to pay: </p>
          <FormControl style={{minWidth: "5rem"}}>
            <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.chosenSymbol}
              onChange={ (e) => this.handleChange("chosenSymbol", e)}
            >
              <MenuItem value="BTC">BTC</MenuItem>
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="DOGE">DOGE</MenuItem>
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="BNB">BNB</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={this.onClick}>
              Pay
          </Button>
        </div>
      </div>
    );
  }ß
}

export default App;
