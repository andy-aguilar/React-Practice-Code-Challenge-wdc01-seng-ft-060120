import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    start: 0,
    end: 4,
    eaten: [],
    moneyLeft: 100,
    moneyForm: false,
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(sushis => {
      this.setState({
        sushis
      })
    })
  }

  moreSushi = () => {
    if (this.state.end === 100){
      this.setState({
        start: 0,
        end: 4,
      })
      return
    }
    this.setState({
      start: this.state.start + 4,
      end: this.state.end + 4
    })
  }

  eatSushi = (eatenSushi) => {
    if (this.state.moneyLeft < eatenSushi.price){
      alert("You're broke, dude!")
      return 
    }
    else if (eatenSushi.eaten){
      alert("There ain't no sushi on that plate")
      return
    }
    const sushiUrl = `${API}/${eatenSushi.id}`
    let oldSushis = [...this.state.sushis]
    const sushiObj={
      eaten: true
    }
    const sushiConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sushiObj)
    }
    fetch(sushiUrl, sushiConfig)
    .then(resp => resp.json())
    .then(sushi => {
      this.setState({
        sushis: oldSushis.map(oldSushi => {
          return oldSushi.id === sushi.id ? sushi : oldSushi
        }),
        eaten: [...this.state.eaten, "plate"],
        moneyLeft: this.state.moneyLeft - sushi.price
      })

    })
  }

  toggleMoneyForm = () => {
    this.setState({
      moneyForm: !this.state.moneyForm
    })
  }

  addMoney = (amount) => {
    this.setState({
      moneyLeft: this.state.moneyLeft + amount,
      moneyForm: false
    })
  }

  render() {
    const {sushis, start, end, eaten, moneyLeft, moneyForm } = this.state
    return (
      <div className="app">
        <SushiContainer sushis={sushis.slice(start, end)} moreSushi={this.moreSushi} eatSushi={this.eatSushi}/>
        <Table eaten={ eaten } moneyLeft={ moneyLeft } toggleMoneyForm={this.toggleMoneyForm} moneyForm={moneyForm} addMoney={this.addMoney}/>
      </div>
    );
  }
}

export default App;