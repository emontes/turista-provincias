import React, { useState } from 'react'
import HotelBox from './hotel-box'
import ButtonMoreHotels from '../../atoms/ButtonMoreHotels'

const Lista = ({ hoteles, perPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataHoteles, setDataHoteles] = useState(
    hoteles.slice(0, perPage * currentPage)
  )

  const onMoreHotels = () => {
    const newPage = currentPage + 1
    setDataHoteles(hoteles.slice(0, perPage * newPage))
    setCurrentPage(newPage)
  }

  let lastRating = null

  return (
    <div className="flex flex-col items-center">
      <div className="hotels-list flex flex-wrap justify-around w-full">
        {dataHoteles.map((hotel) => {
          const showHeader = hotel.rating !== lastRating
          lastRating = hotel.rating

          return (
            <React.Fragment key={hotel.strapi_id}>
              {showHeader && (
                <h3 className="w-full p-4 text-lg font-semibold">
                  <i>Hoteles en {hotel.location.hvi_desc_spanish}</i>{' '}
                  {hotel.rating} Estrellas
                </h3>
              )}
              <HotelBox hotel={hotel} />
            </React.Fragment>
          )
        })}
      </div>
      {dataHoteles.length < hoteles.length && (
        <ButtonMoreHotels onClick={onMoreHotels} title="Más Hoteles..." />
      )}
    </div>
  )
}

export default Lista