import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import Map from '../../../components/Hoteles/Destination/Map'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import SideBanner from '../../../components/Banner'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image, numhoteles } = data.location
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-mapa.html',
  }
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name} Mapa`}
    >
      <Seo
        title={`Mapa de Hoteles en ${location.name}`}
        description={`Mapa de hoteles en ${location.name}, ${location.estado.Name}. Encuentre la ubicación ideal para su hotel en ${location.name}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <Banner
        image={banner}
        vistaDesc={location.name}
        estado={location.estado.Name}
        subTitle={`${numhoteles} hoteles en`}
        title={`Mapa de Hoteles en ${location.name}`}
      />

      <section className="section">
        <NavTabs url={data.location.slug} />
        <div className="section-center">
          <Map location={data.location} />
          <div>
            <SideBanner
              title={location.name}
              description="Mapa de Hoteles"
              image={image ? image : ''}
              listItems1={listItems1}
            />
          </div>
        </div>
        <Leyenda location={location.nombre} />
      </section>
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
