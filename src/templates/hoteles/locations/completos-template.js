import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Lista from '../../../components/Hoteles/Destination/lista-hoteles'
import SideBanner from '../../../components/Banner'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'

const Locations = ({ data }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name}`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Los más completos hoteles en ${location.name}`}
        description={`Lista ordenada a partir del mayor número de Facilidades para Hoteles en ${location.name}. Encuentre el hotel más completo de ${location.name}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <Banner
        image={banner}
        vistaDesc={location.name}
        estado={location.estado.Name}
        subTitle={`${numhoteles} hoteles en `}
        title={`${location.name} Hoteles`}
      />
      <section className="section">
        <HotelBreadCrumbs location={location} endTitle="Completos" />
        <NavTabs url={data.location.slug} />
        <h3>Los hoteles más Completos de {location.name}</h3>
        <div className="section-center">
          <Lista location={data.location} hoteles={data.hoteles.nodes} />
          <SideBanner />
        </div>
        <Leyenda location={location.name} />
      </section>

      {image && (
        <GatsbyImage
          image={getImage(image.localFile)}
          className="image"
          alt={location.name}
          title={location.name}
        />
      )}
    </Layout>
  )
}

export default Locations

export const pageQuery = graphql`
  query($id: String) {
    hoteles: allStrapiHotelHotellook(
      filter: { cityId: { eq: $id }, cntRooms: { gt: 0 } }
      sort: { fields: cntRooms, order: DESC }
    ) {
      nodes {
        ...ListaHoteles
      }
    }

    location: strapiHotelLocation(hotellookId: { eq: $id }) {
      banner {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      hotellookId
      numhoteles
      slug
      location {
        name
        latitude
        longitude
        hotel_location {
          slug
        }
        estado {
          Name
        }
      }
    }
  }
`
