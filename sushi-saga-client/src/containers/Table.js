import React, { Fragment } from 'react'
import MoreMoneyButton from '../components/MoreMoneyButton'
import MoreMoneyForm from '../components/MoreMoneyForm'

const Table = (props) => {

  const renderPlates = (array) => {
    return array.map((x, index) => {
      return <div className="empty-plate" style={{ top: -7 * index }}/>
    })
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${ props.moneyLeft } remaining!
      </h1>
      { props.moneyForm ? <MoreMoneyForm addMoney= { props.addMoney }/> : null }
      <MoreMoneyButton toggleMoneyForm= {props.toggleMoneyForm}/>
      <div className="table">
        <div className="stack">
          {
            renderPlates(props.eaten)
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Table