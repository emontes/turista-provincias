import React from 'react'
import BlockGrey from '../../atoms/BlockGrey'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { vistaStarsToUrl } from '../../../utilities/stringService'

const Stars = ({ estrellas, vista }) => {
  console.log('estrellas', estrellas)
  console.log('vista', vista)
  return (
    <BlockGrey title="Hoteles por Categoría">
      <Wrapper>
        {estrellas.map((estrella) => (
          <li key={estrella}>
            <Link
              to={`/${vistaStarsToUrl(vista, 'spanish', estrella)}`}
              activeClassName="active"
              className="stars"
              title={`Hoteles ${estrella} estrellas`}
            >
              {estrella} estrellas
            </Link>
          </li>
        ))}
      </Wrapper>
    </BlockGrey>
  )
}

export default Stars

const Wrapper = styled.ul`
  display: flex;
  justify-content: space-around;

  .stars {
    color: #f9c40a;
    font-size: 1.2rem;
  }
  li {
    height: 22px;
    line-height: 22px;
    padding-bottom: 2px;
    font-size: 13px;
    border-bottom: 1px dotted var(--clr-grey-9);

    a {
      color: #979696;
      :hover {
        color: var(--clr-white);
        background: ${(props) => props.theme.colors.primary1};
      }
    }
  }

  .active {
    color: var(--clr-white);
    background: ${(props) => props.theme.colors.primary1};
  }
`