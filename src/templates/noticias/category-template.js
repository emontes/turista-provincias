import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'

const Category = ({ data, pageContext }) => {
  const pageInfo = data.allStrapiNoticia.pageInfo

  let titleSeo = `Noticias de ${data.location.name}`
  let descriptionSeo = `La categoría de noticias de ${data.location.name} se refiere a noticias relacionadas con el turismo en ${data.location.name}, Chiapas`
  if (pageInfo.currentPage > 1) {
    titleSeo = titleSeo + ' Página. ' + pageInfo.currentPage
    descriptionSeo = 'Página ' + pageInfo.currentPage + ' de ' + descriptionSeo
  }
  return (
    <Layout seoTitle={titleSeo} linkExterno="/noticias">
      <Seo title={titleSeo} description={descriptionSeo} />

      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        pageInfo={pageInfo}
        url={`/noticias/${pageContext.slug}`}
        topics={pageContext.topics}
        categories={pageContext.categories}
      />
    </Layout>
  )
}

export default Category

export const query = graphql`
  query($slug: String!, $skip: Int!, $limit: Int!) {
    allStrapiNoticia(
      limit: $limit
      skip: $skip
      filter: {
        estado: { slug: { eq: "chiapas" } }
        location: { slug: { eq: $slug } }
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

    location: strapiLocation(slug: { eq: $slug }) {
      name
      latitude
      longitude
    }

    image: file(relativePath: { eq: "portada-1.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
