import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Links from '../../components/Links'

const Directorio = ({ data, pageContext }) => {
  const metadata = data.site.siteMetadata
  return (
    <Layout
      heroImg={data.image.localFile.childImageSharp}
      main="Directorio"
      sub={`de sitios Web en ${metadata.estado.name}`}
      seoTitle="Directorio Web"
      linkExterno="/links.html"
    >
      <Seo
        title="Directorio Web"
        description={`Directorio de Sitios Web Registrados en el Turista ${metadata.estado.name} y que tienen relación directa con ${metadata.estado.name}`}
        image={getSrc(data.image.localFile.childImageSharp)}
      />
      <Links
        title={`Directorio del Turista ${metadata.estado.name}`}
        subtitle="Bienvenido a nuestro directorio"
        linksCategories={pageContext.linksRoot}
        metadata={metadata}
        sideNavSec
      />
    </Layout>
  )
}

export default Directorio

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        estado {
          name
          slug
          slogan
        }
      }
    }
    image: strapiMedia(name: { eq: "topic-historias.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
