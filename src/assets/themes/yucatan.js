import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import BodyBg from '../images/yucatan/body_bg.jpg'
import OuterTop from '../images/yucatan/outer_top.png'
import OuterBottom from '../images/yucatan/outer_bottom.png'
import HeadingBg from '../images/yucatan/heading_bg.jpg'

const LogoNav = (
  <StaticImage
    src="../images/yucatan/logo.png"
    alt="Turista Yucatán"
    title="Turista Yucatán"
    layout="fullWidth"
    className="logo"
  />
)
const LogoSmal2 = (
  <StaticImage
    src="../images/yucatan/logosmal2.png"
    alt="Turista Yucatán"
    title="Turista Yucatán"
  />
)

const LogoSmal = (
  <StaticImage
    src="../images/yucatan/logo_small.png"
    alt="Turista México"
    title="Turista México"
  />
)

const theme = {
  fonts: {},
  colors: {
    /* dark shades of primary color*/
    primary1: '#004765',
    primary2: '#314c62',
    primary5: '#0c395e',
    /* lighter shades of primary color */
    primary6: '#537086',
    primary7: '#5c708b',
    primary8: '#7a8597', //este debe parecer gris por que es para los <p>
    primary9: '#d0e6fc',
    primary10: '#cae0e8',
    gradientLight: 'rgba(202, 224, 232, 0.9)',
    gradientDark: 'rgba(12, 57, 94, 0.4)',
  },
  images: {
    bodyBg: BodyBg,
    outerTop: OuterTop,
    outerBottom: OuterBottom,
    headingBg: HeadingBg,
    logoNav: LogoNav,
    logoSmal2: LogoSmal2,
    logoSmal: LogoSmal,
  },
}

export default theme
