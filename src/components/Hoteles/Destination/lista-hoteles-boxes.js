import React, { useState } from 'react'
import HotelBox from './hotel-box'
import ButtonMoreHotels from '../../atoms/ButtonMoreHotels'

const Lista = ({ hoteles, perPage = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataHoteles, setDataHoteles] = useState(
    hoteles.slice(0, perPage * currentPage)
  )

  const onMoreHotels = () => {
    const newPage = currentPage + 1
    setDataHoteles(hoteles.slice(0, perPage * newPage))
    setCurrentPage(newPage)
  }

  return (
    <div className="pt-4">
      <div className="flex flex-wrap justify-around">
        {dataHoteles.map((hotel) => {
          return <HotelBox key={hotel.strapi_id} hotel={hotel} />
        })}
      </div>
      {dataHoteles.length < hoteles.length && (
        <ButtonMoreHotels onClick={onMoreHotels} title="Más Hoteles..." />
      )}
    </div>
  )
}

export default Lista