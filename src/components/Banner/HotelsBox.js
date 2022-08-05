import React from 'react'
import Title from './Title'
import InsertaScript from '../../utilities/InsertaScript'

const HotelsBox = ({ title }) => {
  const liga =
    '//www.travelpayouts.com/widgets/aaff9e1c12195d0a95de1c140e9b46ce.js?v=2190'
  return (
    <div id="hotels-box" style={{ padding: '.2rem' }}>
      {title && <Title title="Hoteles y Vuelos" />}
      <InsertaScript id="hotels-box" src={liga} />
    </div>
  )
}

export default HotelsBox
