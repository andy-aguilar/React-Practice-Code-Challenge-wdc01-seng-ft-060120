import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    displaySushis: [],
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
        sushis,
        displaySushis: sushis,
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

  eatSushi = (sushi) => {
    if (this.state.moneyLeft < sushi.price){
      alert("You're broke, dude!")
      return 
    }
    else if (sushi.eaten){
      alert("There ain't no sushi on that plate")
      return
    }
    const eatenSushi = {...sushi, eaten: true}
      this.setState({
        displaySushis: [...this.state.displaySushis].map(oldSushi => {
          return oldSushi.id === eatenSushi.id ? eatenSushi : oldSushi
        }),
        eaten: [...this.state.eaten, "plate"],
        moneyLeft: this.state.moneyLeft - eatenSushi.price 
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
    const {start, end, eaten, moneyLeft, moneyForm, displaySushis } = this.state
    return (
      <div className="app">
        <SushiContainer sushis={displaySushis.slice(start, end)} moreSushi={this.moreSushi} eatSushi={this.eatSushi}/>
        <Table eaten={ eaten } moneyLeft={ moneyLeft } toggleMoneyForm={this.toggleMoneyForm} moneyForm={moneyForm} addMoney={this.addMoney}/>
      </div>
    );
  }
}

export default App;