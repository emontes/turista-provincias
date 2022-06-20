import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import Map from '../../../components/Hoteles/Destination/Map'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import SideBanner from '../../../components/Banner'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-mapa.html',
  }
  const seoDescription = `Mapa de hoteles en ${location.name}, ${location.estado.Name}. Encuentre la ubicación ideal para su hotel en ${location.name}`
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles ${location.name} Mapa`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Mapa de Hoteles en ${location.name}`}
        description={seoDescription}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-grey-10">
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle="Mapa de Hoteles"
            title={`Mapa de Hoteles en ${location.name}`}
          />
          <HotelBreadCrumbs location={location} endTitle="Mapa" />
          <NavTabs url={data.location.slug} />
          <Map location={data.location} />
        </div>
        <div>
          <SideBanner
            title={`${location.name} Mapa Hoteles`}
            description={seoDescription}
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
