import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Title from '../atoms/Title'

const Lista = ({ metadata, locations }) => {
  console.log('Metadata: ', metadata)
  console.log('Locations: ', locations)
  return (
    <Wrapper>
      <Title
        title="Destinos con"
        subtitle={`Hoteles en ${metadata.estado.name}`}
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
    color: ${(props) => props.theme.colors.primary8};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary8};
    font-size: 2rem;
  }
`
