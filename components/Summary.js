import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import styled from 'react-emotion'

import {PRICING_RATE, SERVICES} from '../core'

const TextRow = styled.div`
  display: flex;
  align-items: center;

  line-height: 2em;
  font-size: 1.1em;
`

const Left = styled.div`
  flex: 1;
  text-align: left;
`

const Right = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 400;
`

const Summary = ({distance, duration, pricing}) => (
  <div>
    <TextRow>
      <Left>Total Distance</Left>
      <Right>{distance} KM</Right>
    </TextRow>
    <TextRow>
      <Left>Shipping Time</Left>
      <Right>{duration} MINS</Right>
    </TextRow>
    <TextRow>
      <Left>Shipping Fee</Left>
      <Right>{pricing} THB</Right>
    </TextRow>
  </div>
)

const costOf = items =>
  items.map(item => SERVICES[item].cost).reduce((prev, curr) => prev + curr, 0)

export const pricingSelector = createSelector(
  state => state.app.distance,
  state => state.app.extras,
  (distance, extras) => {
    const items = Object.entries(extras)
      .filter(item => item[1])
      .map(item => item[0])

    const cost = items[0] ? costOf(items) : 0

    return (distance * PRICING_RATE + cost).toFixed(2)
  }
)

const mapStateToProps = state => ({
  distance: state.app.distance,
  duration: state.app.duration,
  pricing: pricingSelector(state)
})

export default connect(mapStateToProps)(Summary)
