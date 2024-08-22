import React from 'react'
import styled from 'styled-components'
import { BiChevronRight } from 'react-icons/bi'

const ListaHoteles = ({ hoteles, title }) => {
  return (
    <Wrapper>
      <h5>{title}</h5>
      <ul>
        {hoteles.map((hotel) => {
          return (
            <li key={hotel.strapi_id}>
              <a
                href={`//jet.turista.com.mx${hotel.link}`}
                target="_blank"
                rel="noreferrer"
                title={hotel.nombre}
              >
                <span className="flex items-center">
                  <BiChevronRight /> {hotel.nombre.substring(0, 40)}
                </span>
                <div className="items">
                  {/* {hotel.rating > 0 && (
                    <span className="rating-number">{hotel.rating / 10}</span>
                  )} */}
                  {hotel.stars > 0 && (
                    <span className="stars">{hotel.rating}☆</span>
                  )}
                  <span className="precio">
                    {hotel.lowestrate
                      ? new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                        }).format(hotel.lowestrate * 24)
                      : ''}
                  </span>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

export default ListaHoteles

const Wrapper = styled.div`
  h5 {
    color: var(--clr-grey-1);
  }
  ul {
    margin-bottom: 1rem;
  }

  li {
    height: 22px;
    line-height: 22px;
    padding-bottom: 2px;
    font-size: 13px;
    border-bottom: 1px dotted var(--clr-grey-9);

    a {
      color: #979696;
      display: block;
      height: 22px;
      padding: 0 0 0 10px;
      display: flex;
      justify-content: space-between;
      :hover {
        color: var(--clr-white);
        background: ${(props) => props.theme.colors.primary1};
      }
    }
  }

  .precio {
    text-align: right;
    color: #4caf50;
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: 5px;
  }
  .stars {
    color: #f9c40a;
    margin-left: 5px;
  }
  .rating-number {
    margin-left: 5px;
    color: #fff;
    background: #a2b86b;
    padding: 0 3px;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 700;
  }
`
