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

const Locations = ({ data }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  return (
    <Layout linkExterno="/hoteles" seoTitle={`Hoteles en ${location.name}`}>
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
        estado {
          Name
        }
      }
    }
  }
`
