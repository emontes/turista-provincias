import React from 'react'
import styled from 'styled-components'
import HotelBox from './hotel-box'

const Lista = ({ hoteles }) => {
  let hotelStars = ''

  return (
    <Wrapper>
      {hoteles.map((hotel) => {
        if (hotelStars !== hotel.stars) {
          hotelStars = hotel.stars
          return (
            <>
              <h3>
                <i>Hoteles en {hotel.hotel_location.location.name}</i>{' '}
                {hotel.stars} Estrellas
              </h3>
              <HotelBox key={hotel.strapi_id} hotel={hotel} />
            </>
          )
        } else {
          hotelStars = hotel.stars
          return <HotelBox key={hotel.strapi_id} hotel={hotel} />
        }
      })}
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  h3 {
    flex-basis: 100%;
    padding: 1rem;
  }
`
