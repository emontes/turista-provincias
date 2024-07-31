import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Links from '../../components/Links'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

// const Directorio = ({ data, pageContext }) => {
//   const metadata = data.site.siteMetadata
//   const { t } = useTranslation()
//   return (
//     <Layout
//       heroImg={data.image.localFile.childImageSharp}
//       main={t('directorio')}
//       sub={`${t('de sitios Web en')} ${metadata.estado.name}`}
//       seoTitle={t('Directorio Web')}
//       linkExterno="/links.html"
//     >
//       <Seo
//         title={t('Directorio Web')}
//         description={`Directorio de Sitios Web Registrados en el Turista ${metadata.estado.name} y que tienen relación directa con ${metadata.estado.name}`}
//         image={getSrc(data.image.localFile.childImageSharp)}
//       />
//       <Links
//         title={`Directorio del Turista ${metadata.estado.name}`}
//         subtitle="Bienvenido a nuestro directorio"
//         linksCategories={pageContext.linksRoot}
//         metadata={metadata}
//         sideNavSec
//       />
//     </Layout>
//   )
// }

const Directorio = () => {
  return (
    <Layout>
      <Seo title="Directorio Web" />
      <div className="container">
        <h1>Directorio Web</h1>
      </div>
    </Layout>
  )
}

export default Directorio

// export const query = graphql`
//   query($language: String!) {
//     locales: allLocale(filter: { language: { eq: $language } }) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
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
//     image: strapiMedia(name: { eq: "topic-historias.jpg" }) {
//       name
//       localFile {
//         childImageSharp {
//           gatsbyImageData
//         }
//       }
//     }
//   }
// `
