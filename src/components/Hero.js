import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Hero = ({
  bgColor,
  image,
  component,
  main,
  sub,
  btnLink,
  btnText,
  children,
}) => {
  return (
    <Wrapper style={{ backgroundColor: `${bgColor || 'var(--clr-white)'}` }}>
      <div className="hero">
        <GatsbyImage
          image={getImage(image)}
          alt="Turista Chiapas"
          className="hero-img"
          placeholder="tracedSVG"
          layout="constrained"
        />
        <div className="hero-container">
          {component && component}
          <div className="header__text-box">
            {main && (
              <h1 className="heading-primary">
                <span className="heading-primary--main">
                  {main || 'Chiapas'}
                </span>
                {sub && <span className="heading-primary--sub">{sub}</span>}
              </h1>
            )}

            {btnLink && (
              <Link to={`/${btnLink}`} className="btn btn--white btn--animated">
                {btnText || 'contact'}
              </Link>
            )}
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.header`
  .hero-img {
    width: 100%;
    height: 100%;
  }
  .hero {
    height: 60vh;

    background-color: ${(props) => props.theme.colors.primary9};
    background-size: cover;
    background-position: top;

    position: relative;
  }
  .hero-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(
      to bottom right,
      rgba(199, 226, 222, 0.9),
      rgba(84, 137, 82, 0.4)
    );
    border-radius: var(--borderRadius);
  }

  .header__text-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .heading-primary {
    color: ${(props) => props.theme.colors.primary10};
    text-shadow: 1px 1px 2px black;
    text-transform: uppercase;
    backface-visibility: hidden;

    &--main {
      display: block;
      font-size: 3.2rem;
      font-weight: 700;
      letter-spacing: 0.5rem;
      animation-name: moveInLeft;
      animation-duration: 1s;
      animation-timing-function: ease-out;

      /* animation-iteration-count: 3;
      animation-delay: 3s; */
    }
    &--sub {
      margin-top: 2rem;
      display: block;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 0.4rem;
      animation: moveInRight 1s ease-out;
    }
  }
`
