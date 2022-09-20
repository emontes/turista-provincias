import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'
import TopNavSec from '../../components/atoms/TopNavSec'

const Category = ({ data, pageContext }) => {
  const pageInfo = data.allStrapiNoticia.pageInfo
  let titleSeo = `Noticias de ${data.location.name}`
  let descriptionSeo = `La categoría de noticias de ${data.location.name} se refiere a noticias relacionadas con el turismo en ${data.location.name}`
  if (pageContext.language === 'en') {
    titleSeo = `News of ${data.location.name}`
    descriptionSeo = `The category of news in ${data.location.name} refers to news related to tourism in ${data.location.name}`
  }
  if (pageInfo.currentPage > 1) {
    titleSeo = titleSeo + ' Página. ' + pageInfo.currentPage
    descriptionSeo = 'Página ' + pageInfo.currentPage + ' de ' + descriptionSeo
  }
  return (
    <Layout seoTitle={titleSeo} linkExterno="/noticias">
      <Seo title={titleSeo} description={descriptionSeo} />
      <TopNavSec />
      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        pageInfo={pageInfo}
        url={`/noticias/${pageContext.slug}`}
        topics={pageContext.topics}
        categories={pageContext.categories}
        perPage={5}
      />
    </Layout>
  )
}

export default Category

export const query = graphql`
  query(
    $slug: String!
    $estadoSlug: String!
    $skip: Int!
    $limit: Int!
    $language: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allStrapiNoticia(
      filter: {
        estado: { slug: { eq: $estadoSlug } }
        location: { slug: { eq: $slug } }
        locale: { eq: $language }
      }
      limit: $limit
      skip: $skip
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
