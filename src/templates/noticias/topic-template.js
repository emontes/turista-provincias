import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Noticias from '../../components/Noticias'

const Topic = ({ data, pageContext }) => {
  const pageInfo = data.allStrapiNoticia.pageInfo

  let titleSeo = `Noticias del Tema: ${data.topic.Title}`
  let descriptionSeo = `Artículos publicados con el tema ${data.topic.Title} en el Turista Chiapas.`
  if (pageInfo.currentPage > 1) {
    titleSeo = titleSeo + ' Página. ' + pageInfo.currentPage
    descriptionSeo = 'Página ' + pageInfo.currentPage + ' de ' + descriptionSeo
  }
  let displayImage = data.image.childImageSharp
  if (data.topic.image)
    displayImage = data.topic.image.localFile.childImageSharp
  return (
    <Layout
      heroImg={displayImage}
      main={data.topic.Title}
      sub={pageInfo.currentPage > 1 ? `Página ${pageInfo.currentPage}` : ''}
      seoTitle={titleSeo}
      linkExterno="/noticias"
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={displayImage ? getSrc(displayImage) : ''}
      />

      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        pageInfo={pageInfo}
        url={`/noticias/tema/${pageContext.slug}`}
        topics={pageContext.topics}
      />
    </Layout>
  )
}

export default Topic

export const query = graphql`
  query($slug: String!, $skip: Int!, $limit: Int!) {
    allStrapiNoticia(
      limit: $limit
      skip: $skip
      filter: {
        estado: { slug: { eq: "chiapas" } }
        topics: { elemMatch: { slug: { eq: $slug } } }
      }
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

    topic: strapiTopic(slug: { eq: $slug }) {
      Title
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
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
