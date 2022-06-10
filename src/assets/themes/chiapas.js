import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import BodyBg from '../images/chiapas/body_bg.jpg'
import OuterTop from '../images/chiapas/outer_top.png'
import OuterBottom from '../images/chiapas/outer_bottom.png'
import HeadingBg from '../images/chiapas/heading_bg.jpg'

const LogoNav = (
  <StaticImage
    src="../images/chiapas/logo.png"
    alt="Turista Chiapas"
    title="Turista Chiapas"
    layout="fullWidth"
    className="logo"
  />
)
const LogoSmal2 = (
  <StaticImage
    src="../images/chiapas/logosmal2.png"
    alt="Turista Chiapas"
    title="Turista Chiapas"
  />
)

const LogoSmal = (
  <StaticImage
    src="../images/chiapas/logo_small.png"
    alt="Turista México"
    title="Turista México"
  />
)

const theme = {
  fonts: {},
  colors: {
    /* dark shades of primary color*/
    primary1: '#036544',
    primary2: '#30642d',
    primary5: '#447941',
    /* lighter shades of primary color */
    primary6: '#5b8859',
    primary7: '#718d6f',
    primary8: '#8b988b', //este debe parecer gris por que es para los <p>
    primary9: '#b4d0a9',
    primary10: '#d2edde',
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
