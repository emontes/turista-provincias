import React, { useState } from 'react'
import styled from 'styled-components'
import HotelBox from './hotel-box'
import ButtonMoreHotels from '../../atoms/ButtonMoreHotels'

const Lista = ({ hoteles, perPage }) => {
  let hotelStars = ''

  const [currentPage, setCurrentPage] = useState(1)
  const [dataHoteles, setDataHoteles] = useState(
    hoteles.slice(0, perPage * currentPage),
  )

  const onMoreHotels = () => {
    const newPage = currentPage + 1
    setDataHoteles(hoteles.slice(0, perPage * newPage))
    setCurrentPage(newPage)
  }

  return (
    <Wrapper>
      <div className="hotels-list">
        {dataHoteles.map((hotel) => {
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
      </div>
      {dataHoteles.length < hoteles.length && (
        <ButtonMoreHotels onClick={onMoreHotels} title="Más Hoteles..." />
      )}
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.div`
  .hotels-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    h3 {
      flex-basis: 100%;
      padding: 1rem;
    }
  }
`
