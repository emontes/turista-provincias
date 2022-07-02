import React, { useState } from 'react'
import styled from 'styled-components'
import HotelBox from './hotel-box'
import ButtonMoreHotels from '../../atoms/ButtonMoreHotels'

const Lista = ({ hoteles, perPage = 12 }) => {
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
          return <HotelBox key={hotel.strapi_id} hotel={hotel} />
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
  }
`
