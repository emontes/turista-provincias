import React from 'react'
import styled from 'styled-components'
import HotelBox from './hotel-box'

const Lista = ({ hoteles }) => {
  return (
    <Wrapper>
      {hoteles.map((hotel) => {
        return <HotelBox key={hotel.strapi_id} hotel={hotel} />
      })}
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
