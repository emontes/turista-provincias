import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import GlobalStyles from '../assets/themes/globalStyles'
import Chiapas from '../assets/themes/chiapas'
import EdoMexico from '../assets/themes/edomexico'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'

import Footer from '../components/Footer'
import Hero from '../components/Hero'
import device from '../assets/themes/device'

const Layout = ({
  children,
  topComponent, //optional component for substitute top banner
  heroImg,
  heroComponent, //optional component inside hero Image
  main, //main Title in hero Image
  sub, //Subtitle in hero Image
  seoTitle, //title for The h1 in footer
  linkExterno, // is Added to the external sites
  sinFondo, //define no background and no padding for the children
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const { site } = useStaticQuery(query)
  const estado = site.siteMetadata.estado

  let themeSel = Chiapas
  if (estado.slug === 'edomexico') themeSel = EdoMexico

  return (
    <ThemeProvider theme={themeSel}>
      <GlobalStyles />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {heroImg && (
        <Hero image={heroImg} component={heroComponent} main={main} sub={sub} />
      )}
      {topComponent && topComponent}

      {sinFondo ? (
        <Wrapper>
          <div>{children}</div>
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="outer-top">
            <div className="outer-bottom">{children}</div>
          </div>
        </Wrapper>
      )}

      <Footer
        title={seoTitle ? seoTitle : `Turista ${estado.name}`}
        linkExterno={linkExterno}
        estado={estado}
      />
    </ThemeProvider>
  )
}

export default Layout

const Wrapper = styled.main`
  background: url(${(props) => props.theme.images.bodyBg})
    ${(props) => props.theme.colors.primary10};
  .outer-top {
    background: url(${(props) => props.theme.images.outerTop}) no-repeat left
      top;
    width: 100%;
  }

  element.style {
  }
  .outer-bottom {
    background: url(${(props) => props.theme.images.outerBottom}) no-repeat
      right bottom;
    width: 100%;
    padding: 0rem;
    @media ${device.tablet} {
      padding: 1rem;

      @media ${device.laptop} {
        padding: 2rem;
      }
    }
  }
`
const query = graphql`
  query dataLayout {
    site {
      siteMetadata {
        estado {
          name
          slug
          slogan
        }
      }
    }
  }
`
