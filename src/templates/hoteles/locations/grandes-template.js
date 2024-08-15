import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import Chat from '../../../components/atoms/chat-hubspot'

// const Locations = ({ data, pageContext }) => {
//   const { location, banner, image } = data.location
//   const numhoteles = data.hoteles.nodes.length
//   const listItems1 = {
//     title: 'Otros Destinos',
//     items: pageContext.destinos,
//     linkTo: '',
//     linkToSuffix: '-grandes.html',
//   }

//   return (
//     <Layout
//       linkExterno="/hoteles"
//       seoTitle={`Hoteles grandes ${location.name}`}
//       footerList1={footerList1}
//       footerList2={footerList2}
//     >
//       <Chat />
//       <Seo
//         title={`Los hoteles más grandes de ${location.name}`}
//         description={`Listado de hoteles que cuentan con mayor número de habitaciones en ${location.name}. Encuentre el hotel más grande de ${location.name}`}
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
//           <HotelBreadCrumbs location={location} endTitle="Grandes" />
//           <div className="padding-1">
//             <h2>Los Hoteles más grandes de {location.name}</h2>
//             <p>
//               Los Hoteles mostrados suman {data.hoteles.sum} cuartos. En
//               promedio un hotel tiene{' '}
//               <span className="green-text">
//                 {(data.hoteles.sum / data.hoteles.nodes.length).toFixed(0)}
//               </span>{' '}
//               cuartos.
//             </p>
//           </div>
//           <NavTabs url={data.location.slug} />
//           <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
//           <Leyenda location={location.name} />
//         </div>
//         <div>
//           <SideBanner
//             title={location.name}
//             description={`Los hoteles más grandes de ${location.name}, basado en el número de cuartos de cada hotel`}
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
      Location Grandes
    </Layout>
  )
}

export default Locations

// export const pageQuery = graphql`
//   query($id: String) {
//     hoteles: allStrapiHotelHotellook(
//       filter: { cityId: { eq: $id }, cntRooms: { gt: 0 } }
//       sort: { fields: cntRooms, order: DESC }
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//       sum(field: cntRooms)
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
