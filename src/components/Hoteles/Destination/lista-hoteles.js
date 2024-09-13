import React, { useState } from 'react'
import { graphql } from 'gatsby'
import HotelType from '../../atoms/HotelType'
// import SearchBox from '../../atoms/search-box'

const SearchBox = ({ onChangeHandler, placeholder }) => (
  <div className="mb-4">
    <input
      className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  </div>
)

const Lista = ({ hoteles }) => {
  const [filteredHoteles, setFilteredHoteles] = useState(hoteles)

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    const newFilteredHoteles = hoteles.filter((hotel) => {
      return hotel.nombre.toLocaleLowerCase().includes(searchFieldString)
    })
    setFilteredHoteles(newFilteredHoteles)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Hoteles Exclusivos</h1> */}
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Buscar hotel por nombre"
      />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700">
          <div className="col-span-5 md:col-span-4">Hotel</div>
          <div className="col-span-4 hidden md:block">Dirección</div>
          <div className="col-span-3 md:col-span-2 text-center">Cuartos</div>
          <div className="col-span-4 md:col-span-2 text-right">Precio</div>
        </div>
        {filteredHoteles.map((hotel, index) => (
          <div key={hotel.hotelid} className={`grid grid-cols-12 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-150`}>
            <div className="col-span-5 md:col-span-4">
              <a
                href={`https://jet.turista.com.mx/hotels?hotelId=${hotel.travelpayoutsid}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                {hotel.nombre}
              </a>
              <div className="flex items-center mt-1 space-x-2">
                <HotelType type={1} />
                {hotel.rating > 0 && (
                  <span className="text-yellow-500">{hotel.rating}☆</span>
                )}
              </div>
            </div>
            <div className="col-span-4 hidden md:block text-gray-600 truncate">{hotel.direccion}</div>
            <div className="col-span-3 md:col-span-2 text-center text-gray-600">
              {hotel.cuartos > 0 ? hotel.cuartos : '-'}
            </div>
            <div className="col-span-4 md:col-span-2 text-right">
              <span className="font-semibold text-green-600">
                {hotel.lowestrate
                  ? new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(hotel.lowestrate)
                  : 'Consultar'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lista

export const query = graphql`
  fragment ListaHoteles on Hotel {
    hotelid
    nombre
    direccion
    latitud
    longitud
    cadena
    visible
    lowestrate
    travelpayoutsid
    cuartos
    rating
    portada
    portada_t
    vista
    desc_spanish
    loca_spanish
    desc_english
    loca_english
    location {
      hvi_desc_spanish
      hvi_desc_english
    }
  }
`