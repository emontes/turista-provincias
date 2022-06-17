import React from 'react'
import styled from 'styled-components'
import device from '../../../assets/themes/device'

const HotelsList = ({ hoteles }) => {
  return (
    <Wrapper>
      {hoteles.map((hotel, index) => {
        const imagen =
          hotel.photos.strapi_json_value.length > 0
            ? hotel.photos.strapi_json_value[0].url
            : ''
        return (
          <div
            key={index}
            class="deal"
            itemScope
            itemtype="http://schema.org/Hotel"
          >
            <div className="top">
              <div>
                <img
                  src={imagen}
                  alt={hotel.name.en}
                  className="dealthumb"
                  itemprop="image"
                />
              </div>
              <div className="center">
                <div class="dealtitle">
                  <a
                    href={`//jet.turista.com.mx${hotel.link}`}
                    target="_blank"
                    rel="noreferrer"
                    itemprop="url"
                  >
                    <span itemProp="name"> {hotel.name.en}</span>
                  </a>
                </div>
                <div className="tipos">
                  {hotel.stars > 0 && (
                    <div className="stars">{hotel.stars}★</div>
                  )}

                  {hotel.rating > 0 && (
                    <div className="rating-number">{hotel.rating / 10}</div>
                  )}
                </div>
                <div className="location">
                  {hotel.hotel_location.location.name}
                </div>
              </div>
            </div>
            <div className="price">
              Desde
              <br />
              <div className="price-number">
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(hotel.pricefrom * 24)}
              </div>
              por Noche
            </div>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default HotelsList

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  .deal {
    padding-bottom: 3px;
    border-bottom: 1px solid #ececec;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    backgorund: ${(props) => props.theme.colors.primary10};
    @media ${device.tablet} {
      width: 49%;
    }
    @media ${device.laptop} {
      width: 30%;
    }
    @media ${device.desktop} {
      width: 25%;
    }
  }
  .top {
    display: flex;
    gap: 0.5rem;
  }
  .center {
  }
  .dealtitle {
    font-size: 1.5rem;
    a {
      color: var(--clr-grey-5);
      :hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.primary5};
      }
    }
  }
  .dealthumb {
    height: 6rem;
    position: relative;
  }
  .price {
    color: var(--clr-grey-8);
    font-size: 0.8rem;
    text-align: center;
    aligin-self: center;
  }
  .price-number {
    font-size: 1.3rem;
    font-weight: 500;
    color: #66bb6a;
  }
  .location {
    color: ${(props) => props.theme.colors.primary9};
  }
  .tipos {
    display: flex;
    justify-content: flex-start;
  }
  .stars {
    background: var(--clr-white-transparency-8);
    color: #f9c40a;

    padding: 5px;
    font-size: 1rem;
  }
  .rating-number {
    text-align: center;
    padding: 5px;
    color: #fff;
    background: #79ba00;
    border-radius: 2px;
    font-size: 1rem;
    font-weight: 700;
  }
`
