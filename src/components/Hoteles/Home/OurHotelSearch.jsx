import React from 'react'
import Title from '../../atoms/Title'
import styled from 'styled-components'
import { FaBalanceScale, FaSearch } from 'react-icons/fa'
import { BsChatSquareQuote } from 'react-icons/bs'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

const OurHotelSearch = () => {
  const { language } = useI18next()
  let title = 'Nuestra búsqueda de Hoteles es mejor que'
  let subtitle = 'buscar en un solo sitio de hoteles.'
  let comparamos = `Comparamos los precios de las habitaciones de 70 servicios diferentes de
        reservación de hoteles, lo que le permite elegir las ofertas con mejores
        tarifas`
  let elPrecio = `El precio de una misma habitación puede variar según el sitio web
              que utilices. La comparación de precios permite encontrar la mejor
              oferta. Además, a veces la misma habitación puede tener un
              diferente estado de disponibilidad en otro sistema; lo que te
              permite elegir las ofertas más económicas`
  let buscamos = `Buscamos tanto en los sitios web de reservas más grandes como en
              los sistemas locales pequeños. A menudo, los pequeños hoteles
              familiares no figuran en las grandes webs de reservas.`
  let recopilamos = ` Recopilamos comentarios de múltiples sistemas de reservación de
              hoteles, haciendo que las Calificaciones del Turista sean más
              precisas.`

  if (language === 'en') {
    title = 'Our hotel search is better than'
    subtitle = 'search on a single hotel site.'
    comparamos = `We compare the prices of the rooms of 70 different services of
         hotel reservations, allowing you to choose the offers with the best
         rates`
    elPrecio = `The price of the same room may vary depending on the website
               that you use Price comparison allows you to find the best
               offer. Also, sometimes the same room may have a
               different availability status on another system; what you
               allows you to choose the cheapest offers`
    buscamos = `We search both the largest booking websites and
               small local systems. Small hotels often
               relatives are not listed on the big booking websites.`
    recopilamos = `We collect feedback from multiple booking systems from
               hotels, making Tourist Ratings more
               precise.`
  }
  return (
    <Wrapper>
      <Title title={title} subtitle={subtitle} />
      <p className="subtitle">{comparamos}</p>
      <ol className="find-list">
        <li>
          <div className="find-item">
            <div className="find-item__icon">
              <FaBalanceScale />
            </div>
            <div className="find-item__text">{elPrecio}</div>
          </div>
        </li>
        <li>
          <div className="find-item">
            <div className="find-item__icon">
              <FaSearch />
            </div>
            <div className="find-item__text">{buscamos}</div>
          </div>
        </li>
        <li>
          <div className="find-item">
            <div className="find-item__icon">
              <BsChatSquareQuote />
            </div>
            <div className="find-item__text">{recopilamos}</div>
          </div>
        </li>
      </ol>
    </Wrapper>
  )
}

export default OurHotelSearch

var Wrapper = styled.section`
  background-color: var(--clr-white);
  padding: 4rem 0;

  .subtitle {
    max-width: 88%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5rem;
    text-align: center;
    font-size: 1.8rem;
  }

  .find-list {
    max-width: 90%;
    margin: 0 auto;
    list-style: none;
    @media screen and (min-width: 576px) {
      max-width: 80%;
    }
    li {
      margin-bottom: 1.8rem;
      @media screen and (min-width: 576px) {
        margin-bottom: 3.6rem;
      }
    }
  }

  .find-item {
    display: table;
  }

  .find-item__icon {
    vertical-align: top;
    color: ${(props) => props.theme.colors.primary6};
    font-size: 1rem;
    display: table-cell;
    @media screen and (min-width: 576px) {
      font-size: 2rem;
    }
  }

  .find-item__text {
    padding-left: 5px;
    @media screen and (min-width: 576px) {
      padding-left: 26px;
    }
  }
`
