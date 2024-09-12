import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import device from '../../../assets/themes/device'

const Banner = ({ image, vistaDesc, estado, subTitle, title }) => {
  const defaultImage = `https://edomexico.turista.com.mx/img/hoteles/banner/edomexico/hoteles-turista.jpg`

  const imageUrl = image
            ? `https://turista.me/img/hoteles/banner/${estado.slug}/${image}`
            : defaultImage
  return (
    <Wrapper className="bannerVista">
      <img
        src={imageUrl}
        alt="Turista"
        placeholder="tracedSVG"
        className="hero-img"
      />

      <div className="hoteles">
        <div className="subTitle">{subTitle}</div>
        <div className="ciudad">{vistaDesc}</div>
        <div className="estado">{estado.name}</div>
      </div>
    </Wrapper>
  )
}

export default Banner

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;

  @media ${device.lg} {
    margin: -5px auto 0.5rem;
  }
  .hero-img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
  }
  .hoteles {
    top: 0;
    position: absolute;
  }

  .ciudad {
    color: ${(props) => props.theme.colors.primary5};
    font-size: 1.4rem;
    font-weight: bold;
    margin-left: 1.7rem;
    width: 13rem;
    @media ${device.lg} {
      width: 30rem;
      font-size: 1.8rem;
    }
  }

  .estado {
    color: var(--clr-white);
    font-size: 25px;
    margin-left: 2.8rem;
    margin-top: -0.4rem;
    display: none;
    @media ${device.lg} {
      display: block;
    }
  }

  .subTitle {
    color: ${(props) => props.theme.colors.primary5};
    margin-left: 0.9rem;
  }
`
