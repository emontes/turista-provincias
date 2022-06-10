import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'

const Locations = ({ data }) => {
  const { location, banner, image, numhoteles } = data.location
  return (
    <Layout linkExterno="/hoteles" seoTitle={`Hoteles en ${location.name}`}>
      <Seo
        title={`Guía de Hoteles en ${location.name}`}
        description={`Hoteles en ${location.name}, ${location.estado.Name}. Reservaciones en línea e información de tarrifas, servicios y disponibilidad para encontrar su hotel en ${location.name}`}
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
        <h1>Hoteles en Oferta en {location.name}</h1>
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
