import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes-estrellas'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import Breadcrumbs from '../../../components/atoms/Breadcrumbs'
import BlockTopHotels from '../../../components/Hoteles/Destination/block-tophotels'
import BlockStars from '../../../components/Hoteles/Destination/block-stars'
import Chat from '../../../components/atoms/chat-hubspot'

// const Locations = ({ data, pageContext }) => {
//   const { location, banner, image } = data.location

//   const numhoteles = data.hoteles.nodes.length
//   let tree = []

//   // Para el sideBanner que liste las ciudades del estado
//   const listItems1 = {
//     title: `${location.estado.Name}`,
//     items: pageContext.destinos,
//     linkTo: '',
//     linkToSuffix: '.html',
//   }

//   let titleSeo = `Guía de Hoteles en ${location.name}`
//   let descriptionSeo = `Encuentre su Hotel en ${location.name}, ${location.estado.Name} y resérvelo en línea  con las diferentes opiones de esta guía de Hoteles en ${location.name}`

//   let cuantosTienenPrecio = 0
//   let sumaPrecios = 0
//   data.hoteles.nodes.forEach((item) => {
//     if (item.pricefrom > 0) {
//       cuantosTienenPrecio = cuantosTienenPrecio + 1
//       sumaPrecios = sumaPrecios + item.pricefrom
//     }
//   })
//   const precioPromedio = sumaPrecios / cuantosTienenPrecio

//   return (
//     <Layout
//       linkExterno="/hoteles"
//       seoTitle={`Hoteles en ${location.name} `}
//       footerList1={footerList1}
//       footerList2={footerList2}
//     >
//       <Chat />
//       <Seo
//         title={titleSeo}
//         description={descriptionSeo}
//         image={image ? getSrc(image.localFile.childImageSharp) : ''}
//       />

//       <section className="section-center">
//         <div className="back-white">
//           <Banner
//             image={banner}
//             vistaDesc={location.name}
//             estado={location.estado.Name}
//             subTitle={`${numhoteles} hoteles en `}
//             title={`${location.name} Hoteles`}
//           />
//           <Breadcrumbs
//             homeLink="/hoteles"
//             homeTitle="Hoteles"
//             tree={tree}
//             endTitle={location.name}
//             singleUrl
//           />
//           <div className="padding-1">
//             <h2>Hoteles en {location.name}</h2>
//             <p>
//               Una noche de hospedaje en {location.name} cuesta en promedio{' '}
//               <span className="green-text">
//                 {new Intl.NumberFormat('es-MX', {
//                   style: 'currency',
//                   currency: 'MXN',
//                 }).format(precioPromedio * 24)}
//               </span>{' '}
//               pesos.
//             </p>
//           </div>

//           <NavTabs url={data.location.slug} />
//           <div className="back-white">
//             <ListaHotelesBoxes
//               hoteles={data.hoteles.nodes}
//               perPage={pageContext.perPage}
//             />
//           </div>

//           <Leyenda location={location.name} />
//         </div>
//         <div>
//           {numhoteles > pageContext.perPage && (
//             <>
//               <BlockTopHotels data={data} location={location} />
//               <BlockStars
//                 estrellas={pageContext.estrellas}
//                 slug={pageContext.slug}
//               />
//             </>
//           )}

//           <SideBanner
//             title={titleSeo}
//             description={descriptionSeo}
//             image={image ? image : ''}
//             showHotelsBox={true}
//             listItems1={listItems1}
//           />
//         </div>
//       </section>
//     </Layout>
//   )
// }

const Locations = () => {
  return (  
    <Layout
      linkExterno="/hoteles"
      footerList1={footerList1}
      footerList2={footerList2}
    >
      Location Home
    </Layout>
  )
}

export default Locations

// export const pageQuery = graphql`
//   query($id: String) {
//     topecono: allStrapiHotelHotellook(
//       filter: {
//         cityId: { eq: $id }
//         pricefrom: { gt: 0 }
//         stars: { gt: 0 }
//         photoCount: { gt: 0 }
//       }
//       sort: { fields: pricefrom, order: ASC }
//       limit: 5
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//     }
//     toppopular: allStrapiHotelHotellook(
//       filter: {
//         cityId: { eq: $id }
//         pricefrom: { gt: 0 }
//         stars: { gt: 0 }
//         photoCount: { gt: 0 }
//       }
//       sort: { fields: popularity, order: DESC }
//       limit: 5
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//     }
//     topgrandes: allStrapiHotelHotellook(
//       filter: {
//         cityId: { eq: $id }
//         pricefrom: { gt: 0 }
//         stars: { gt: 0 }
//         photoCount: { gt: 0 }
//       }
//       sort: { fields: cntRooms, order: DESC }
//       limit: 5
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//     }

//     toprated: allStrapiHotelHotellook(
//       filter: {
//         cityId: { eq: $id }
//         pricefrom: { gt: 0 }
//         stars: { gt: 0 }
//         photoCount: { gt: 0 }
//       }
//       sort: { fields: rating, order: DESC }
//       limit: 5
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//     }

//     hoteles: allStrapiHotelHotellook(
//       # limit: $limit
//       # skip: $skip
//       filter: { cityId: { eq: $id }, stars: { gt: 0 }, photoCount: { gt: 0 } }
//       sort: { fields: stars, order: DESC }
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//     }

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
//         estado {
//           Name
//         }
//       }
//     }
//   }
// `
