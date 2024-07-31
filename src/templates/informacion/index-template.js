import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'
import { getSrc } from 'gatsby-plugin-image'
import ButtonPages from '../../components/atoms/ButtonPages'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

// const Informacion = ({ data, pageContext }) => {
//   const metadata = data.site.siteMetadata
//   const { t } = useTranslation()
//   let seoTitle = `Información sobre ${t(metadata.estado.name)}`
//   let seoDescription = `Artículos informativos sobre el estado de ${t(
//     metadata.estado.name,
//   )}, México`
//   if (pageContext.language == 'en') {
//     seoTitle = `Information about ${t(metadata.estado.name)}`
//     seoDescription = `Informative articles regarding the state of ${t(
//       metadata.estado.name,
//     )}, Mexico`
//   }
//   return (
//     <Layout
//       heroImg={data.image.localFile.childImageSharp}
//       main={t('información')}
//       sub={`${t('Acerca de')} ${t(metadata.estado.name)}`}
//       seoTitle={`${metadata.estado.name} Información`}
//       linkExterno="/informacion"
//     >
//       <Seo
//         title={seoTitle}
//         description={seoDescription}
//         image={getSrc(data.image.localFile.childImageSharp)}
//       />
//       <ContainerGrecas title={seoTitle} sideNavSec>
//         <h3 className="uppercase text-red-500">
//           <Trans>Secciones</Trans>
//         </h3>
//         <BannerAdsense className="h90 mt1 mb1" format="fluid" />
//         <div
//           className="cont-area"
//           style={{
//             padding: '2rem',
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             alignItems: 'center',
//             gap: '2rem',
//           }}
//         >
//           {pageContext.sections.map((item) => (
//             <p key={item.slug}>
//               <ButtonPages
//                 url={`/informacion/${item.slug}`}
//                 description={t(item.title)}
//               />
//             </p>
//           ))}
//         </div>
//       </ContainerGrecas>
//     </Layout>
//   )
// }

const Informacion = () => {
  return (
    <Layout>
      <Seo title="Información" />
      <div className="container">
        <h1>Información</h1>
      </div>
    </Layout>
  )
}

export default Informacion

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

//     image: strapiMedia(name: { eq: "topic-informacion.jpg" }) {
//       name
//       localFile {
//         childImageSharp {
//           gatsbyImageData
//         }
//       }
//     }
//   }
// `
