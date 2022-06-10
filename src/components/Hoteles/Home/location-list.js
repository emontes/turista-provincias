import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Lista = ({ metadata, locations }) => {
  return (
    <Wrapper>
      <h3>Destinos con Hoteles en {metadata.estado.name}</h3>
      <div className="destinos">
        {locations.map((item) => {
          console.log('El item: ', item)
          return (
            <Link
              to={`/${item.hotel_location.slug}.html`}
              style={{ postion: 'relative' }}
            >
              <GatsbyImage
                image={getImage(
                  item.hotel_location.image.localFile.childImageSharp,
                )}
                alt="Turista Chiapas"
                className="hero-img"
                placeholder="tracedSVG"
                layout="constrained"
              />
              <div className="name">{item.name}</div>
            </Link>
          )
        })}
      </div>
      <br />
      <p>{metadata.description}</p>
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  padding: 2rem;
  text-align: center;

  .destinos {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  .hero-img {
    width: 26rem;
    height: 9rem;
  }

  .name {
    padding: 0.5rem;
    color: var(--clr-white);
    background: var(--clr-grey-1);
    font-size: 2rem;
  }
`
