import React from 'react'
import styled from 'styled-components'
import HotelType from '../../atoms/hotelType'
import device from '../../../assets/themes/device'

const Hotel = ({ hotel }) => {
  const imagen =
    hotel.photos.strapi_json_value.length > 0
      ? hotel.photos.strapi_json_value[0].url
      : ''
  return (
    <div itemScope itemtype="https://schema.org/Hotel">
      <Wrapper>
        <div className="list-item">
          <a
            href={`//jet.turista.com.mx${hotel.link}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={imagen}
              alt={hotel.name.en}
              className="image"
              itemprop="image"
            />
          </a>
        </div>
        <div className="tipos">
          {hotel.stars > 0 && <div className="stars">{hotel.stars}★</div>}

          {hotel.rating > 0 && (
            <div className="rating-number">{hotel.rating / 10}</div>
          )}
        </div>
        <div className="body">
          <div className="izquierda">
            <div className="hotel-name" itemprop="name">
              {hotel.name.en}
            </div>
            <p>
              {hotel.cntRooms && (
                <>
                  Cuartos: {hotel.cntRooms}
                  <br />
                </>
              )}
              {hotel.cntFloors && (
                <>
                  Pisos: {hotel.cntFloors}
                  <br />
                </>
              )}
              {hotel.cntSuites && (
                <>
                  Suites: {hotel.cntSuites}
                  <br />
                </>
              )}
              {hotel.yearOpened && (
                <>
                  Apertura: {hotel.yearOpened}
                  <br />
                </>
              )}
              {hotel.yearRenovated && <>Renovación: {hotel.yearRenovated}</>}
            </p>
          </div>

          <div className="derecha">
            <HotelType type={hotel.propertyType} />
            {hotel.pricefrom > 0 && (
              <div className="price">
                <span className="currency-text">MXN</span>
                <br />
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(hotel.pricefrom * 24)}
                <br />
                <span className="currency-text">prom/noche</span>
              </div>
            )}

            <a
              href={`//jet.turista.com.mx${hotel.link}`}
              target="_blank"
              rel="noreferrer"
              className="reservar"
            >
              Reservar Ahora{' '}
            </a>
          </div>
        </div>
        <div className="address" itemprop="address">
          {hotel.address.en.substring(0, 45)}
        </div>
      </Wrapper>
    </div>
  )
}

export default Hotel

const Wrapper = styled.div`
  background: #efefef;
  box-shadow: var(--light-shadow);
  width: 320px;

  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  transition: var(--transition);
  :hover {
    box-shadow: var(--dark-shadow);
  }

  .image {
    width: 320px;
    height: 240px;

    transition: var(--transition);
    :hover {
      transform: scale(1.1);
    }
  }
  .list-item {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .body {
    width: 100%;
    font-family: 'Open Sans';
    font-size: 13px;
    line-height: 15px;
    overflow: hidden;
    display: flex;

    justify-content: space-between;
  }

  .tipos {
    display: flex;
    justify-content: flex-end;
    position: absolute;

    margin: 5px;
  }
  .stars {
    background: var(--clr-white-transparency-8);
    color: #f9c40a;

    padding: 5px;
    font-size: 1.2rem;
  }
  .rating-number {
    text-align: center;
    padding: 5px;
    color: #fff;
    background: #79ba00;
    border-radius: 2px;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .izquierda {
    padding: 0.5rem;
  }

  .hotel-name {
    font-size: 1.2rem;
    font-weight: 700;
  }

  p {
    margin-top: 10px;
    font-size: 0.8rem;
  }
  .address {
    color: var(--clr-grey-5);
    width: 100%;
    padding: 0 0 0.8rem;
    font-family: 'Open Sans';
    font-size: 0.9rem;
    line-height: 15px;
    text-align: center;
  }

  .derecha {
    width: 11rem;
    @media ${device.tablet} {
      width: 8rem;
    }
    border-left: 1px solid var(--clr-grey-8);

    align-self: center;
    padding: 1rem;
    display: flex;

    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }
  .currency-text {
    font-size: 0.8rem;
    color: var(--clr-grey-8);
  }
  .price {
    text-align: center;
    color: #4caf50;
    font-size: 1.2rem;
    font-weight: 700;
    flex-basis: 100%;
  }
  .reservar {
    background-color: #feba31;
    color: #fff;
    display: inline-block;
    padding: 0.5rem;

    white-space: nowrap;

    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;

    :hover {
      box-shadow: 0 4px 12px rgba(254, 186, 49, 0.5);
    }
  }
`
