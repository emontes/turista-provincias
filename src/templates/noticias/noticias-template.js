// src/templates/noticias/noticias-template.js

import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'
import { getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import TopNavSec from '../../components/atoms/TopNavSec'

const NoticiasIndex = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { currentPage, totalPages } = pageContext
  const metadata = data.site.siteMetadata

  let titleSeo = `Noticias de ${metadata.estado.name}`
  let descriptionSeo = `Artículos Informativos y de Noticias en Turista ${metadata.estado.name}. Nos enfocamos principalmente en noticias de turismo en ${metadata.estado.name}.`

  if (currentPage > 1) {
    titleSeo = `${titleSeo} - Página ${currentPage}`
    descriptionSeo = `Página ${currentPage} de ${totalPages} - ${descriptionSeo}`
  }

  return (
    <Layout
      heroImg={data.image ? data.image.childImageSharp : ''}
      main={t('noticias')}
      sub={`${t('Acerca de')} ${t(metadata.estado.name)}`}
      seoTitle={titleSeo}
      linkExterno="/noticias.html"
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={data.image ? getSrc(data.image.childImageSharp) : ''}
      />
      <TopNavSec />
      <Noticias
        noticias={data.allNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        pageInfo={{
          currentPage,
          pageCount: totalPages,
          itemCount: data.allNoticia.totalCount,
          perPage: pageContext.limit,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        }}
        url="/noticias/ultimas"
      />
    </Layout>
  )
}

export default NoticiasIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allNoticia(
      limit: $limit
      skip: $skip
      #filter: { language: { eq: $language } }
      sort: { fields: time, order: DESC }
    ) {
      nodes {
        ...NoticiaCard
      }
      totalCount
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
    image: file(relativePath: { eq: "topic-turista.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`