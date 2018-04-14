import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      btcPrice: 0,
      updateTime: "",
      highestPrice: 0,
      lowestPrice: 1000000,
      highestPriceTime: "",
      lowestPriceTime: ""
    };
  }

  sleeper(ms) {
    return x => {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

  getBtcPrice() {
    console.log("Component Refreshed");
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/bitcoin/")
      .then(this.sleeper(60000))
      .then(res => {
        console.log("this is the get response: ", res.data[0].price_usd);
        let time = new Date();

        this.updateBtcPrice(
          res.data[0].price_usd,
          time.toLocaleTimeString("en-US")
        );
        console.log("this is what is saved in state: ", this.state);

        console.log("time: ", time.toLocaleTimeString("en-US"));
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateBtcPrice = (newPrice, time) => {
    this.setState({ btcPrice: newPrice, updateTime: time });
    if (newPrice > this.state.highestPrice) {
      this.setState({ highestPrice: newPrice, highestPriceTime: time });
    } else if (newPrice < this.state.lowestPrice) {
      this.setState({ lowestPrice: newPrice, lowestPriceTime: time });
    }
  };

  componentDidMount() {
    this.getBtcPrice();
  }

  render() {
    this.getBtcPrice();
    return (
      <div className="App">
        <h1>Current Bitcoin Price $ {this.state.btcPrice}</h1>
        <p>updated: {this.state.updateTime}</p>
        <h1>Highest Price $ {this.state.highestPrice}</h1>
        <p>Updated: {this.state.highestPriceTime}</p>
        <h1>Lowest Price Price $ {this.state.lowestPrice}</h1>
        <p>Updated: {this.state.lowestPriceTime}</p>
      </div>
    );
  }
}

export default App;
