import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  const { sushis, eatSushi } = props

  const renderSushi = () => {
    return sushis.map(sushi => <Sushi sushi={sushi} key={sushi.id} eatSushi={eatSushi}/>)
  }

  return (
    <Fragment>
      <div className="belt">
        { renderSushi() }
        <MoreButton moreSushi={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer