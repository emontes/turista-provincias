import React from 'react'
import Title from './Title'
import InsertaScript from '../../utilities/InsertaScript'

const HotelsBox = () => {
  const liga =
    '//www.travelpayouts.com/widgets/aaff9e1c12195d0a95de1c140e9b46ce.js?v=2190'
  return (
    <div style={{ padding: '.2rem' }}>
      <Title title="Hoteles y Vuelos" />
      <InsertaScript liga={liga} />
    </div>
  )
}

export default HotelsBox
