import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Title from '../atoms/Title'

const Lista = ({ metadata, locations }) => {
  return (
    <Wrapper>
      <Title
        title="Principales Destinos "
        subtitle={`en ${metadata.estado.name}`}
      />
      <div className="destinos">
        {locations.map((item) => {
          return (
            <Link
              to={`/${item.hotel_location.slug}.html`}
              title={`Hoteles en ${item.name}`}
            >
              <div className="name">{item.name}</div>
            </Link>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.section`
  padding: 2rem;
  text-align: center;

  .destinos {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-evenly;
  }
  .name {
    padding: 0 1rem;
    box-shadow: var(--light-shadow);
    color: ${(props) => props.theme.colors.primary8};
    border-bottom-left-radius: 8px;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary8};
    border-left: 1px solid ${(props) => props.theme.colors.primary8};
    font-size: 2rem;
    transition: var(--transition);
    :hover {
      color: ${(props) => props.theme.colors.primary10};
    }
  }
`
