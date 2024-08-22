import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import device from '../../../assets/themes/device'
import HotelType from '../../atoms/hotelType'
import SearchBox from '../../atoms/search-box'

const Lista = ({ hoteles }) => {
  const [filteredHoteles, setFilteredHoteles] = useState(hoteles)

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    const newFilteredHoteles = hoteles.filter((hotel) => {
      return hotel.name.en.toLocaleLowerCase().includes(searchFieldString)
    })
    setFilteredHoteles(newFilteredHoteles)
  }

  return (
    <Wrapper>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="nombre de hotel"
      />
      <table>
        <tbody>
          <tr>
            <th>Hotel</th>
            <th className="direccion">Dirección</th>
            <th>Cuartos</th>
            <th>*Precio</th>
          </tr>
          {filteredHoteles.map((hotel) => {
            return (
              <tr key={hotel.strapi_id}>
                <td>
                  <a
                    href={`https://jet.turista.com.mx${hotel.link}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {hotel.name.en}
                  </a>
                  <div style={{ float: 'right' }}>
                    <HotelType type={hotel.propertyType} />
                    {hotel.rating > 0 && (
                      <span className="rating-number">{hotel.rating / 10}</span>
                    )}
                    {hotel.stars > 0 && (
                      <span className="stars">{hotel.stars}☆</span>
                    )}
                  </div>
                </td>
                <td className="direccion">{hotel.address.en}</td>

                <td>{hotel.cntRooms}</td>

                <td className="precio">
                  {hotel.pricefrom
                    ? new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                      }).format(hotel.pricefrom * 24)
                    : ''}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.div`
  .direccion {
    display: none;
    @media ${device.lg} {
      display: block;
    }
  }
  .precio {
    text-align: right;
    color: #4caf50;
    font-size: 1.4rem;
    font-weight: 500;
  }
  .stars {
    color: #f9c40a;
    margin-left: 5px;
  }
  .rating-number {
    margin-left: 5px;

    color: #fff;
    background: #79ba00;

    padding: 0 5px;
    height: calc(17px + 5px);
    border-radius: 2px;
    font-size: 17px;
    font-weight: 700;
    line-height: calc(17px + 5px);
  }
`

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
