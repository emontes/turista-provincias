import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'
import { getSrc } from 'gatsby-plugin-image'

const noticias = ({ data, pageContext }) => {
  const metadata = data.site.siteMetadata
  let titleSeo = `Noticias de ${metadata.estado.name}`
  let descriptionSeo = `Artículos Informativos y de Noticias en Turista ${metadata.estado.name}. Nos enfocamos principalmente en noticias de turismo en ${metadata.estado.name}.`

  return (
    <Layout
      heroImg={data.image.localFile.childImageSharp}
      main="Noticias"
      sub={`sobre ${metadata.estado.name}`}
      seoTitle={titleSeo}
      linkExterno="/noticias"
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={getSrc(data.image.localFile.childImageSharp)}
      />

      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        topics={pageContext.topics}
        categories={pageContext.categories}
        perPage={8}
      />
    </Layout>
  )
}

export default noticias

export const query = graphql`
  query($estadoSlug: String!) {
    allStrapiNoticia(
      filter: { estado: { slug: { eq: $estadoSlug } } }
      sort: { fields: date, order: DESC }
      limit: 500
    ) {
      nodes {
        ...NoticiaCard
      }
    }
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
    image: strapiMedia(name: { eq: "noticias.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
