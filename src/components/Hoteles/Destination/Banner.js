import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import device from '../../../assets/themes/device'

const Banner = ({ image, vistaDesc, estado, subTitle, title }) => {
  return (
    <Wrapper className="bannerVista ">
      <GatsbyImage
        image={getImage(image.localFile)}
        alt="Turista Chiapas"
        className="hero-img"
        placeholder="tracedSVG"
        layout="constrained"
      />

      <div className="hoteles">
        <div className="subTitle">{subTitle}</div>
        <div className="ciudad">{vistaDesc}</div>
        <div className="estado">{estado}</div>
      </div>
      <h2>{title}</h2>
    </Wrapper>
  )
}

export default Banner

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  .hero-img {
    width: 100%;
  }
  .hoteles {
    top: 0;
    position: absolute;
  }

  h2 {
    color: var(--clr-white);
    top: 1rem;
    text-align: center;
    font-size: 2.5rem;
    /* background: rgba(24, 24, 24, 0.3); */
    position: absolute;
    right: 15%;
    width: 30%;
    display: none;
    @media ${device.laptopL} {
      display: block;
    }
  }

  .ciudad {
    color: ${(props) => props.theme.colors.primary5};
    font-size: 1.4rem;
    font-weight: bold;
    margin-left: 1.7rem;
    width: 13rem;
    @media ${device.tablet} {
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
    @media ${device.tablet} {
      display: block;
    }
  }

  .subTitle {
    color: ${(props) => props.theme.colors.primary5};
    margin-left: 0.9rem;
  }
`
