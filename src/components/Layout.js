import React, { useState } from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'

import Footer from '../components/atoms/Footer'
import Hero from '../components/Hero'
import device from '../assets/themes/device'

import BannerAdsense from '../utilities/BannerAdsense'

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
  footerList1,
  footerList2,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const { site } = useStaticQuery(query)
  const estado = site.siteMetadata.estado

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {heroImg && (
        <Hero image={heroImg} component={heroComponent} main={main} sub={sub} />
      )}
      {topComponent && topComponent}

      {sinFondo ? (
        <Wrapper>
          <div>{children}</div>
          <BannerAdsense />
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="outer-top">
            <div className="outer-bottom">
              {children}
              <div align="center" className="mt1">
                <BannerAdsense />
              </div>
            </div>
          </div>
        </Wrapper>
      )}

      <Footer
        title={seoTitle ? seoTitle : `Turista ${estado.name}`}
        linkExterno={linkExterno}
        estado={estado}
        footerList1={footerList1}
        footerList2={footerList2}
      />
    </>
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
