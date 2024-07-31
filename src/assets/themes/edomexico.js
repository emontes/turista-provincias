import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import BodyBg from '../images/edomexico/body_bg.jpg'
import OuterTop from '../images/edomexico/outer_top.png'
import OuterBottom from '../images/edomexico/outer_bottom.png'
import HeadingBg from '../images/edomexico/heading_bg.jpg'

const LogoNav = (
  <StaticImage
    src="../images/edomexico/logo.png"
    alt="Turista Estado de México"
    title="Turista Estado de México"
    layout="fullWidth"
    className="logo"
  />
)
const LogoSmal2 = (
  <StaticImage
    src="../images/edomexico/logosmal2.png"
    alt="Turista Estado de México"
    title="Turista Estado de México"
  />
)

const LogoSmal = (
  <StaticImage
    src="../images/edomexico/logo_small.png"
    alt="Turista México"
    title="Turista México"
  />
)

const TopicTurista = (
  <StaticImage
    src="../images/edomexico/topic_turista.jpeg"
    alt="Turista Estado de México"
    title="Turista Estado de México"
  />
)

const theme = {
  fonts: {},
  colors: {
    /* dark shades of primary color*/
    primary1: '#932022',
    primary2: '#5c181d',
    primary5: '#812324',
    /* lighter shades of primary color */
    primary6: '#956060',
    primary7: '#a77777',
    primary8: '#b9acac', //este debe parecer gris por que es para los <p>
    primary9: '#d6c493',
    primary10: '#fbeded',
    /* for the gradients */
    gradientLight: 'rgba(251, 237, 237,0.9)',
    gradientDark: 'rgba(129, 35, 36, 0.4)',
  },
  images: {
    bodyBg: BodyBg,
    outerTop: OuterTop,
    outerBottom: OuterBottom,
    headingBg: HeadingBg,
    logoNav: LogoNav,
    logoSmal2: LogoSmal2,
    logoSmal: LogoSmal,
    topicTurista: TopicTurista,
  },
  siteMetadata: {
    estado: {
      name: "Estado de México",
      slug: "edomexico",
      slogan: "Turista Estado de México"
    }
  }
}

export default theme
