import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'
import { getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import TopNavSec from '../../components/atoms/TopNavSec'

// const NoticiasIndex = ({ data, pageContext }) => {
//   const pageInfo = data.allStrapiNoticia.pageInfo
//   const metadata = data.site.siteMetadata
//   const { t } = useTranslation()
//   let titleSeo = `Noticias de ${metadata.estado.name}`
//   let descriptionSeo = `Artículos Informativos y de Noticias en Turista ${metadata.estado.name}. Nos enfocamos principalmente en noticias de turismo en ${metadata.estado.name}.`
//   if (pageContext.language === 'en') {
//     titleSeo = `News about ${t(metadata.estado.name)}`
//     descriptionSeo = `Informative Articles and News in Turista ${t(
//       metadata.estado.name,
//     )}. We mainly focus on tourism news in ${t(metadata.estado.name)}.`
//   }
//   if (pageInfo.currentPage > 1) {
//     titleSeo = titleSeo + ' Página. ' + pageInfo.currentPage

//     descriptionSeo = 'Página ' + pageInfo.currentPage + ' de ' + descriptionSeo
//   }

//   return (
//     <Layout
//       heroImg={data.image ? data.image.localFile.childImageSharp : ''}
//       main={t('noticias')}
//       sub={`${t('Acerca de')} ${t(metadata.estado.name)}`}
//       seoTitle={titleSeo}
//       linkExterno="/noticias"
//     >
//       <Seo
//         title={titleSeo}
//         description={descriptionSeo}
//         image={data.image ? getSrc(data.image.localFile.childImageSharp) : ''}
//       />
//       <TopNavSec />
//       <Noticias
//         noticias={data.allStrapiNoticia.nodes}
//         title={titleSeo}
//         description={descriptionSeo}
//         pageInfo={pageInfo}
//         url="/noticias/ultimas"
//         topics={pageContext.topics}
//         categories={pageContext.categories}
//       />
//     </Layout>
//   )
// }

const NoticiasIndex = () => {
  return (
    <Layout>
      <Seo title="Noticias" />
      <div className="container">
        <h1>Noticias</h1>
      </div>
    </Layout>
  )
}

export default NoticiasIndex

// export const query = graphql`
//   query($skip: Int!, $limit: Int!, $estadoSlug: String!, $language: String!) {
//     locales: allLocale(filter: { language: { eq: $language } }) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
//       }
//     }
//     allStrapiNoticia(
//       limit: $limit
//       skip: $skip
//       filter: {
//         estado: { slug: { eq: $estadoSlug } }
//         locale: { eq: $language }
//       }
//       sort: { fields: date, order: DESC }
//     ) {
//       nodes {
//         ...NoticiaCard
//       }
//       pageInfo {
//         pageCount
//         itemCount
//         perPage
//         totalCount
//         hasPreviousPage
//         hasNextPage
//         currentPage
//       }
//     }
//     site {
//       siteMetadata {
//         description
//         estado {
//           name
//           slug
//           slogan
//         }
//       }
//     }
//     image: strapiMedia(name: { eq: "noticias.jpg" }) {
//       name
//       localFile {
//         childImageSharp {
//           gatsbyImageData
//         }
//       }
//     }
//   }
// `
