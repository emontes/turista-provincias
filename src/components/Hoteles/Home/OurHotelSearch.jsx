import React from 'react'
import Title from '../../Title'
import styled from 'styled-components'
import { FaBalanceScale, FaSearch } from 'react-icons/fa'
import { BsChatSquareQuote } from 'react-icons/bs'

const OurHotelSearch = () => {
  return (
    <Wrapper>
      <Title
        title="Nuestra búsqueda de Hoteles es mejor que"
        subtitle="buscar en un solo sitio de hoteles."
      />
      <p className="subtitle">
        Comparamos los precios de las habitaciones de 70 servicios diferentes de
        reservación de hoteles, lo que le permite elegir las ofertas con mejores
        tarifas
      </p>
      <ol className="find-list">
        <li>
          <div className="find-item">
            <div className="find-item__icon">
              <FaBalanceScale />
            </div>
            <div className="find-item__text">
              El precio de una misma habitación puede variar según el sitio web
              que utilices. La comparación de precios permite encontrar la mejor
              oferta. Además, a veces la misma habitación puede tener un
              diferente estado de disponibilidad en otro sistema; lo que te
              permite elegir las ofertas más económicas
            </div>
          </div>
        </li>
        <li>
          <div className="find-item">
            <div className="find-item__icon">
              <FaSearch />
            </div>
            <div className="find-item__text">
              Buscamos tanto en los sitios web de reservas más grandes como en
              los sistemas locales pequeños. A menudo, los pequeños hoteles
              familiares no figuran en las grandes webs de reservas.
            </div>
          </div>
        </li>
        <li>
          <div className="find-item">
            <div className="find-item__icon">
              <BsChatSquareQuote />
            </div>
            <div className="find-item__text">
              Recopilamos comentarios de múltiples sistemas de reservación de
              hoteles, haciendo que las Calificaciones de Turista Chiapas sean
              más precisas.
            </div>
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
