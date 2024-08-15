// src/templates/noticias/category-template.js

import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'
import TopNavSec from '../../components/atoms/TopNavSec'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Category = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { category, currentPage, totalPages } = pageContext
  
  let titleSeo = `Noticias de ${category}`
  let descriptionSeo = `La categoría de noticias de ${category} se refiere a noticias relacionadas con el turismo en ${category}`
  
  if (currentPage > 1) {
    titleSeo = `${titleSeo} - Página ${currentPage}`
    descriptionSeo = `Página ${currentPage} de ${totalPages} - ${descriptionSeo}`
  }

  return (
    <Layout seoTitle={titleSeo} linkExterno="/noticias">
      <Seo title={titleSeo} description={descriptionSeo} />
      <TopNavSec />
      <Noticias
        noticias={data.allNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        categories={pageContext.categories}
        pageInfo={{
          currentPage,
          pageCount: totalPages,
          itemCount: data.allNoticia.totalCount,
          perPage: pageContext.limit,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        }}
        url={`/noticias/${category.replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
        perPage={5}
        
      />
    </Layout>
  )
}

export default Category

export const query = graphql`
  query($category: String!, $skip: Int!, $limit: Int!) {
    # locales: allLocale(filter: { language: { eq: $language } }) {
  #     edges {
  #       node {
  #         ns
  #         data
  #         language
  #       }
  #     }
  #   }
    allNoticia(
      filter: {
        cattitle: { eq: $category }
        #language: { eq: $language }
      }
      limit: $limit
      skip: $skip
      sort: {time: DESC}
    ) {
      nodes {
        ...NoticiaCard
      }
      totalCount
    }
  }
`