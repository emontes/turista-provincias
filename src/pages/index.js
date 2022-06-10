import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Noticias from '../components/Noticias'

import Seo from '../components/Seo'
import Mapa from '../components/Home/mapa'

const index = ({ data }) => {
  return (
    <Layout
      heroImg={data.image.childImageSharp}
      main={data.site.siteMetadata.estado.name}
      sub={data.site.siteMetadata.estado.slogan}
    >
      <Seo />
      <Mapa metadata={data.site.siteMetadata} />
      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title="Últimas Noticias"
        isHome="si"
      />
    </Layout>
  )
}

export default index

export const query = graphql`
  query {
    allStrapiNoticia(
      limit: 7
      filter: { estado: { slug: { eq: "chiapas" } } }
      sort: { fields: date, order: DESC }
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

    image: file(relativePath: { eq: "portada-1.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
