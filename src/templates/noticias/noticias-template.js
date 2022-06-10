import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'
import { getSrc } from 'gatsby-plugin-image'

const noticias = ({ data, pageContext }) => {
  const pageInfo = data.allStrapiNoticia.pageInfo

  let titleSeo = 'Noticias de Chiapas'
  let descriptionSeo =
    'Artículos Informativos y de Noticias en Turista Chiapas. Nos enfocamos principalmente en noticias de turismo en Chiapas.'
  if (pageInfo.currentPage > 1) {
    titleSeo = titleSeo + ' Página. ' + pageInfo.currentPage
    descriptionSeo = 'Página ' + pageInfo.currentPage + ' de ' + descriptionSeo
  }

  return (
    <Layout
      heroImg={data.image.localFile.childImageSharp}
      main="Noticias"
      sub="sobre Chiapas"
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
        pageInfo={pageInfo}
        url="/noticias/ultimas"
        topics={pageContext.topics}
        categories={pageContext.categories}
      />
    </Layout>
  )
}

export default noticias

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allStrapiNoticia(
      limit: $limit
      skip: $skip
      filter: { estado: { slug: { eq: "chiapas" } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...NoticiaCard
      }
      pageInfo {
        pageCount
        itemCount
        perPage
        totalCount
        hasPreviousPage
        hasNextPage
        currentPage
      }
    }

    image: strapiMedia(name: { eq: "noticia-chiapas-c2c.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
