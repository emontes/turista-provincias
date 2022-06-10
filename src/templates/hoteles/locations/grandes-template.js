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

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  const listItems1 = {
    title: 'Hoteles en Chiapas',
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-grandes.html',
  }
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Los Hoteles más grandes de ${location.name}`}
    >
      <Seo
        title={`Los hoteles más grandes de ${location.name}`}
        description={`Listado de hoteles que cuentan con mayor número de habitaciones en ${location.name}. Encuentre el hotel más grande de ${location.name}`}
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
        <h3>Los hoteles más grandes de {location.name}</h3>
        <div className="section-center">
          <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
          <div>
            <SideBanner
              title={location.name}
              description={`Los hoteles más grandes de ${location.name}, basado en el número de cuartos de cada hotel`}
              image={image ? image : ''}
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
      filter: { cityId: { eq: $id }, cntRooms: { gt: 0 } }
      sort: { fields: cntRooms, order: DESC }
      limit: 30
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
