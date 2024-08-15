import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import Chat from '../../../components/atoms/chat-hubspot'
// const Locations = ({ data }) => {
//   const { location, banner, image, numhoteles } = data.location
//   return (
//     <Layout
//       linkExterno="/hoteles"
//       seoTitle={`Hoteles en ${location.name}`}
//       footerList1={footerList1}
//       footerList2={footerList2}
//     >
//       <Chat />
//       <Seo
//         title={`Guía de Hoteles en ${location.name}`}
//         description={`Hoteles en ${location.name}, ${location.estado.Name}. Reservaciones en línea e información de tarrifas, servicios y disponibilidad para encontrar su hotel en ${location.name}`}
//         image={image ? getSrc(image.localFile.childImageSharp) : ''}
//       />

//       <Banner
//         image={banner}
//         vistaDesc={location.name}
//         estado={location.estado.Name}
//         subTitle={`${numhoteles} hoteles en `}
//         title={`${location.name} Hoteles`}
//       />
//       <section className="section">
//         <HotelBreadCrumbs location={location} endTitle="Ofertas" />
//         <NavTabs url={data.location.slug} />
//         <h1>Hoteles en Oferta en {location.name}</h1>
//         <Leyenda location={location.name} />
//       </section>

//       {image && (
//         <GatsbyImage
//           image={getImage(image.localFile)}
//           className="image"
//           alt={location.name}
//           title={location.name}
//         />
//       )}
//     </Layout>
//   )
// }


const Locations = () => {
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle="Hoteles Ofertas"
      footerList1={footerList1}
      footerList2={footerList2}
    >
      Hoteles Ofertas
    </Layout>
  )
}

export default Locations

// export const pageQuery = graphql`
//   query($id: String) {
//     location: strapiHotelLocation(hotellookId: { eq: $id }) {
//       banner {
//         localFile {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//       image {
//         localFile {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//       hotellookId
//       numhoteles
//       slug
//       location {
//         name
//         latitude
//         longitude
//         hotel_location {
//           slug
//         }
//         estado {
//           Name
//         }
//       }
//     }
//   }
// `
