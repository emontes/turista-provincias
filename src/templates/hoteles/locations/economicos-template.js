import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import SideBanner from '../../../components/Banner'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import Chat from '../../../components/atoms/chat-hubspot'

// const Locations = ({ data, pageContext }) => {
//   const { location, banner, image } = data.location
//   const numhoteles = data.hoteles.nodes.length
//   const listItems1 = {
//     title: 'Otros destinos ',
//     items: pageContext.destinos,
//     linkTo: '',
//     linkToSuffix: '-economicos.html',
//   }

//   let letreroPricefrom = ''
//   if (data.hoteles.nodes[0]) {
//     letreroPricefrom = new Intl.NumberFormat('es-MX', {
//       style: 'currency',
//       currency: 'MXN',
//     }).format(data.hoteles.nodes[0].pricefrom * 24)
//   }
//   let descriptionSeo = `Encuentre hoteles económicos en ${location.name} con esta lista ordenada a partir del precio más barato para su hotel en ${location.name}. Hospedaje desde ${letreroPricefrom} Pesos prom/noche`

//   return (
//     <Layout
//       linkExterno="/hoteles"
//       seoTitle={`Hoteles ${location.name} Económicos`}
//       footerList1={footerList1}
//       footerList2={footerList2}
//     >
//       <Chat />
//       <Seo
//         title={`Hoteles económicos en ${location.name}`}
//         description={descriptionSeo}
//         image={image ? getSrc(image.localFile.childImageSharp) : ''}
//       />

//       <section className="section-center">
//         <div className="back-white">
//           <Banner
//             image={banner}
//             vistaDesc={location.name}
//             estado={location.estado.Name}
//             subTitle={`Los ${numhoteles} hoteles más económicos de `}
//             title="Económicos"
//           />
//           <HotelBreadCrumbs location={location} endTitle="Económicos" />

//           <div className="padding-1">
//             <h2>Hoteles económicos en {location.name}</h2>

//             {data.hoteles.nodes[0] && (
//               <p>
//                 Hoteles desde{' '}
//                 <span className="green-text">{letreroPricefrom}</span>
//               </p>
//             )}
//           </div>

//           <NavTabs url={data.location.slug} />
//           <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
//           <Leyenda location={location.name} />
//         </div>
//         <div>
//           <SideBanner
//             title={location.name}
//             description={descriptionSeo}
//             image={image ? image : ''}
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
      Location Económicos
    </Layout>
  )
}

export default Locations

// export const pageQuery = graphql`
//   query($id: String) {
//     hoteles: allStrapiHotelHotellook(
//       filter: {
//         cityId: { eq: $id }
//         pricefrom: { gt: 0 }
//         photoCount: { gt: 0 }
//       }
//       sort: { fields: pricefrom, order: ASC }
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
