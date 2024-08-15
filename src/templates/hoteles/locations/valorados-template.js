import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import SideBanner from '../../../components/Banner'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import Chat from '../../../components/atoms/chat-hubspot'

// const Locations = ({ data, pageContext }) => {
//   const { location, banner, image } = data.location
//   const numhoteles = data.hoteles.nodes.length
//   const listItems1 = {
//     title: `${location.estado.Name}`,
//     items: pageContext.destinos,
//     linkTo: '',
//     linkToSuffix: '-valorados.html',
//   }
//   return (
//     <Layout
//       linkExterno="/hoteles"
//       seoTitle={`Los Hoteles mejor valorados de ${location.name}`}
//       footerList1={footerList1}
//       footerList2={footerList2}
//     >
//       <Chat />
//       <Seo
//         title={`Los hoteles mejor valorados de ${location.name}`}
//         description={`Listado de hoteles que han tenido mejores calificaciones en ${location.name}.`}
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
//           <HotelBreadCrumbs location={location} endTitle="Mejor Valorados" />
//           <div className="padding-1">
//             <h2>Hoteles mejor valorados en {location.name}</h2>

//             <p>
//               La Calificación promedio es de{' '}
//               <span className="green-text">
//                 {(data.hoteles.sum / data.hoteles.nodes.length / 10).toFixed(2)}
//               </span>
//             </p>
//           </div>
//           <NavTabs url={data.location.slug} />
//           <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
//           <Leyenda location={location.name} />
//         </div>
//         <div>
//           <SideBanner
//             title={location.name}
//             description={`Los hoteles mejor calificados ${location.name}, basado en el promedio de calificaciones que ha tenido cada hotel`}
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
      Location Valorados
    </Layout>
  )
}

export default Locations

// export const pageQuery = graphql`
//   query($id: String) {
//     hoteles: allStrapiHotelHotellook(
//       filter: { cityId: { eq: $id }, cntRooms: { gt: 0 } }
//       sort: { fields: rating, order: DESC }
//     ) {
//       nodes {
//         ...ListaHoteles
//       }
//       sum(field: rating)
//       totalCount
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
