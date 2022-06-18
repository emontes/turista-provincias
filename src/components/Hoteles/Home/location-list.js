import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Title from '../../atoms/Title'
import device from '../../../assets/themes/device'

const Lista = ({ metadata, locations }) => {
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
              style={{ postion: 'relative' }}
            >
              <GatsbyImage
                image={getImage(
                  item.hotel_location.image.localFile.childImageSharp,
                )}
                alt={`Hoteles en ${item.name}`}
                title={`Hoteles en ${item.name}`}
                className="hero-img"
                placeholder="tracedSVG"
                layout="constrained"
              />
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
    gap: 1rem;
    justify-content: center;
  }
  .hero-img {
    width: 90vw;
    height: 20vh;

    @media ${device.tablet} {
      width: 35rem;
    }
  }

  .name {
    padding: 0.5rem;
    color: var(--clr-white);
    background: var(--clr-grey-1);
    font-size: 2rem;
    @media ${device.tablet} {
      font-size: 2rem;
    }
  }
`
