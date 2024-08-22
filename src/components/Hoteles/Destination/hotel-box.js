import React from 'react'
import HotelType from '../../atoms/hotelType'

const Hotel = ({ hotel }) => {
  const imagen = hotel.portada ? `https://turista.me${hotel.portada}` : ''
  const bookingLink = `//jet.turista.com.mx/hotels?hotelId=${hotel.travelpayoutsid}`
  return (
    <div className="bg-gray-100 shadow-md w-80 flex flex-col mb-8 transition-transform duration-300 hover:shadow-lg hover:scale-105" itemScope itemType="https://schema.org/Hotel">
      <div className="relative overflow-hidden">
        <a href={bookingLink} target="_blank" rel="noreferrer">
          <img
            src={imagen}
            alt={hotel.nombre}
            className="w-full h-60 object-cover transition-transform duration-300 hover:scale-110"
            itemProp="image"
          />
        </a>
        <div className="absolute top-2 right-2 flex justify-end">
          {hotel.rating > 0 && <div className="bg-white bg-opacity-80 text-yellow-500 p-1 text-lg font-bold">{hotel.rating}★</div>}
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div className="text-left">
          <div className="text-lg font-bold" itemProp="name">{hotel.nombre}</div>
          {hotel.cuartos && (
            <p className="text-sm text-gray-700 mt-1">
              Cuartos: {hotel.cuartos}
            </p>
          )}
          {hotel.desc_spanish && hotel.desc_spanish.length > 200 && (
            <p className="text-sm text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: hotel.desc_spanish.substring(0, 200) }} />
          )}
        </div>
        <div className="border-l border-gray-300 pl-4 flex flex-col items-center">
          <HotelType type={1} />
          {hotel.lowestrate > 0 && (
            <div className="text-center text-green-600 text-lg font-bold mt-2">
              <span className="block text-sm text-gray-500">MXN</span>
              {new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(hotel.lowestrate)}
              <span className="block text-sm text-gray-500">prom/noche</span>
            </div>
          )}
          <a
            href={bookingLink}
            target="_blank"
            rel="noreferrer"
            className="bg-yellow-500 text-white rounded-lg px-4 py-2 mt-4 text-xs font-semibold hover:shadow-lg transition-shadow duration-300"
          >
            Reservar Ahora
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 p-4" itemProp="address">
        {hotel.direccion.substring(0, 45)}
      </div>
    </div>
  )
}

export default Hotel
