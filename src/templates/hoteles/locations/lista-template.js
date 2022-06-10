import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import Lista from '../../../components/Hoteles/Destination/lista-hoteles'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import SideBanner from '../../../components/Banner'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const hoteles = data.hoteles
  const listItems1 = {
    title: 'Hoteles en Chiapas',
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-lista.html',
  }

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name} Lista`}
    >
      <Seo
        title={`Lista de Hoteles en ${location.name} con Precios aproximados`}
        description={`Lista de Hoteles de ${location.name}, ${location.estado.Name} con nombre de hotel, Dirección, categoría y costo aproximado por noche para guiarlo a la mejor opción para reservar su hotel en ${location.name}.`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <Banner
        image={banner}
        vistaDesc={location.name}
        estado={location.estado.Name}
        subTitle={`${hoteles.nodes.length} hoteles en `}
        title={`${location.name} Lista de Hoteles`}
      />

      <section className="section">
        <NavTabs url={data.location.slug} />
        <div className="section-center">
          <Lista location={data.location} hoteles={hoteles.nodes} />
          <div>
            <SideBanner
              title={location.name}
              description={`Lista de todos los Hoteles que tenemos registrados en ${location.name} ordenados por orden alfabético`}
              image={image ? image : ''}
              showHotelsBox={true}
              listItems1={listItems1}
            />
          </div>
        </div>
        <Leyenda location={location.name} />
      </section>
    </Layout>
  )
}

export default Locations

export const pageQuery = graphql`
  query($id: String) {
    hoteles: allStrapiHotelHotellook(
      #filter: { cityId: { eq: $hotellookId }, pricefrom: { gt: 0 } }
      filter: { cityId: { eq: $id } }
      sort: { fields: name___en, order: ASC }
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
