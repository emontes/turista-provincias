import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HotelBox from './hotel-box'
import ButtonMoreHotels from '../../atoms/ButtonMoreHotels'

const Lista = ({ hoteles }) => {
  const perPage = 12
  const [currentPage, setCurrentPage] = useState(1)
  const [dataHoteles, setDataHoteles] = useState([])

  useEffect(() => {
    setDataHoteles(hoteles.slice(0, perPage * currentPage))
  }, [currentPage])

  const onMoreHotels = () => {
    const newPage = currentPage + 1
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
