import React from 'react'
import BlockGrey from '../../atoms/BlockGrey'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Stars = ({ estrellas }) => {
  const { slug } = 'slug-estrellas'
  return (
    <BlockGrey title="Hoteles por Categoría">
      <Wrapper>
        {estrellas.map((item) => {
          let estrellitas = ''
          let i
          for (i = 0; i < item; i++) estrellitas += '★'
          return (
            <li key={item}>
              <Link
                to={`/${slug}-estrellas-${item}.html`}
                activeClassName="active"
                className="stars"
                title={`Hoteles ${item} estrellas`}
              >
                {item} {estrellitas}
              </Link>
            </li>
          )
        })}
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
