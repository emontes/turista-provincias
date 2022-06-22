import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import SideBanner from '../../../components/Banner'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-poulares.html',
  }
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Los Hoteles más populares de ${location.name}`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Los hoteles más Populares de ${location.name}`}
        description={`Listado de hoteles que cuentan con mayor índice de popularidad en ${location.name}. Son los hoteles que más visita la gente en ${location.name}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-white">
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle={`Los ${numhoteles} hoteles más poulares de `}
            title="Populares"
          />
          <HotelBreadCrumbs location={location} endTitle="Populares" />
          <div className="padding-1">
            <h2>Los Hoteles más poulares de {location.name}</h2>
            <p>
              La popularidad más alta es de{' '}
              <span className="green-text">
                {data.hoteles.nodes[0].popularity}
              </span>
            </p>
          </div>
          <NavTabs url={data.location.slug} />

          <ListaHotelesBoxes
            location={data.location}
            hoteles={data.hoteles.nodes}
          />
          <Leyenda location={location.name} />
        </div>
        <div>
          <SideBanner
            title={location.name}
            description={`Los hoteles más populares de ${location.name}, basado en el número de visitas que ha tenido cada hotel`}
            image={image ? image : ''}
            listItems1={listItems1}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Locations

export const pageQuery = graphql`
  query($id: String) {
    hoteles: allStrapiHotelHotellook(
      filter: { cityId: { eq: $id }, cntRooms: { gt: 0 } }
      sort: { fields: popularity, order: DESC }
      limit: 36
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
