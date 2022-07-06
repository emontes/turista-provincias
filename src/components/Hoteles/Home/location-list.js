import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Title from '../../atoms/Title'

const Lista = ({ metadata, locations }) => {
  return (
    <Wrapper>
      <Title
        title="Destinos con"
        subtitle={`Hoteles en ${metadata.estado.name}`}
      />
      <div className="destinos">
        {locations.map((item, index) => {
          return (
            <Link key={index} to={`/${item.hotel_location.slug}.html`}>
              <div className="hero">
                <GatsbyImage
                  image={getImage(
                    item.hotel_location.banner.localFile.childImageSharp,
                  )}
                  alt={`Hoteles en ${item.name}`}
                  title={`Hoteles en ${item.name}`}
                  className="hero-img"
                  placeholder="tracedSVG"
                  layout="constrained"
                />

                <div className="name">{item.name}</div>
              </div>
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
  .hero {
    background-color: ${(props) => props.theme.colors.primary9};
    background-size: cover;
    background-position: top;
    position: relative;
  }
  .hero-img {
    width: 350px;
    height: 45px;
  }

  .name {
    position: absolute;
    top: 0;
    left: 1%;
    padding: 0.5rem;
    color: ${(props) => props.theme.colors.primary5} }  
    font-size: 1.5rem;
  }
`
