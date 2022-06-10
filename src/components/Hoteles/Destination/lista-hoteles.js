import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import device from '../../../assets/themes/device'

const Lista = ({ hoteles }) => {
  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <th>Hotel</th>
            <th className="direccion">Dirección</th>
            <th>Cuartos</th>
            <th>*Precio</th>
          </tr>
          {hoteles.map((hotel) => {
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
                  {hotel.rating > 0 && (
                    <span className="rating-number">{hotel.rating / 10}</span>
                  )}
                  {hotel.stars > 0 && (
                    <span className="stars">{hotel.stars}☆</span>
                  )}
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
    @media ${device.tablet} {
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
    float: right;
    color: #f9c40a;
    margin-left: 5px;
  }
  .rating-number {
    float: right;
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
  fragment ListaHoteles on STRAPI_HOTEL_HOTELLOOK {
    strapi_id
    cityId
    name {
      en
      es
    }
    address {
      en
    }
    stars
    propertyType
    yearOpened
    yearRenovated
    rating
    pricefrom
    popularity
    distance
    cntSuites
    cntRooms
    cntFloors
    checkIn
    checkOut
    link
    location {
      lat
      lon
    }
    facilities {
      strapi_json_value
    }
    photos {
      strapi_json_value {
        url
      }
    }
  }
`
