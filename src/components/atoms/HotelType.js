import React from 'react'
import hotelTypes from '../../constants/Hoteles/hotelTypes'
import styled from 'styled-components'

const HotelType = ({ type }) => {
  return <Wrapper>{hotelTypes[type]}</Wrapper>
}

export default HotelType

const Wrapper = styled.span`
  padding: 0 4px;
  border: 1px solid #a9a9a9;
  border-radius: 2px;
  color: #717171;
  font-size: 12px;
  height: 18px;
`
