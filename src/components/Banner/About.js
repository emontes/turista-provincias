// src/components/Banner/About.js

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import SocialLinks from '../../constants/social_links'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const About = (props) => {
  const data = useStaticQuery(query)
  let displayImage = data.image
  if (props.image) {
    displayImage = props.image
  }

  return (
    <Wrapper>
      <GatsbyImage
        image={getImage(displayImage.childImageSharp)}
        className="img"
        alt={props.title}
        title={props.title}
      />
      <p>
        {props.description || (
          <span
            dangerouslySetInnerHTML={{
              __html: `La <b>Guía de Turismo</b> en <i>${data.site.siteMetadata.estado.name}</i>`,
            }}
          />
        )}
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

export const query = graphql`
  query {
    site {
      siteMetadata {
        estado {
          name
          slug
          slogan
        }
      }
    }

    image: file(relativePath: { eq: "topic-turista.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }

  }
`