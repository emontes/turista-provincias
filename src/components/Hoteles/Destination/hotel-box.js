import React from 'react'
import styled from 'styled-components'

const Hotel = ({ hotel }) => {
  const imagen =
    hotel.photos.strapi_json_value.length > 0
      ? hotel.photos.strapi_json_value[0].url
      : ''
  return (
    <Wrapper itemscope itemtype="http://schema.org/Hotel">
      <div className="list-item">
        <a
          href={`//jet.turista.com.mx${hotel.link}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={imagen} alt={hotel.name.en} className="image" />
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
          <div className="address" itemprop="address">
            {hotel.address.en.substring(0, 45)}
          </div>
        </div>

        <div className="derecha">
          {hotel.pricefrom > 0 && (
            <div className="price">
              <span className="currency-text">MXN</span>
              <br />
              {new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(hotel.pricefrom * 24)}
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
    </Wrapper>
  )
}

export default Hotel

const Wrapper = styled.div`
  box-shadow: var(--light-shadow);
  max-width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  transition: var(--transition);
  :hover {
    box-shadow: var(--dark-shadow);
  }
  .image {
    width: 100%;
    height: 240px;
  }
  .list-item {
    background: #efefef;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .body {
    background: #f2f2f2;
    width: 100%;
    height: 11rem;
    font-family: 'Open Sans';
    font-size: 13px;
    line-height: 15px;
    overflow: hidden;
    display: flex;
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
    width: 70%;
    padding: 0.5rem;
  }

  .hotel-name {
    margin-top: 0.3rem;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .address {
    color: var(--clr-grey-5);
    width: 100%;
    padding: 10px 15px;
    font-family: 'Open Sans';
    font-size: 1rem;
    line-height: 15px;
  }

  .derecha {
    border-left: 1px solid var(--clr-grey-8);
    align-self: center;
    padding: 1rem;
  }
  .currency-text {
    font-size: 1.2rem;
  }
  .price {
    text-align: center;
    color: var(--clr-grey-8);
    font-size: 1.5rem;
    font-weight: 700;
  }
  .reservar {
    background-color: #feba31;
    color: #fff;
    display: inline-block;
    margin-top: 10px;
    width: 100%;
    white-space: nowrap;
    padding: 0 10px;
    height: 46px;
    border-radius: 3px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 46px;
  }
`
