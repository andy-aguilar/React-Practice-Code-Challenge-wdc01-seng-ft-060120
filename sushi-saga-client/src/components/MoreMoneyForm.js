import React from 'react'

export default class MoreMoneyForm extends React.Component {
    state = {
        amount: "",
        cc: "",
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        this.props.addMoney(parseInt(this.state.amount,10))
        this.setState({
            amount: "",
            cc: ""
        })
    }

    render(){
        return(
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <span>$</span><input type="number" name="amount" placeholder="Amount to add" value={this.state.amount} onChange={(e) => this.handleChange(e)}/>
                <input type="text" name="cc" placeholder="Credit Card #" value={this.state.cc} onChange={(e) => this.handleChange(e)}/>
                <input type="submit"/>
            </form>
        )
    }
}

