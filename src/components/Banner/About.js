import React from 'react'
import SocialLinks from '../../constants/social_links'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const About = ({ theme }) => {
  return (
    <Wrapper>
      <StaticImage
        // src="../../assets/images/edomexico/topic-turista.jpeg"
        src="../images/edomexico/topic-turista.jpeg"
        className="img"
        alt={theme.siteMetadata.estado.slogan}
        title={theme.siteMetadata.estado.slogan}
        width={100}
        height={100}
      />
      <p>
        <span
          dangerouslySetInnerHTML={{
            __html: `La <b>Guía de Turismo</b> en <i>${theme.siteMetadata.estado.name}</i>`,
          }}
        />
      </p>
      <SocialLinks styleClass="banner-icons" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  p {
    color: ${(props) => props.theme.colors.primary7};
  }
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`

export default About