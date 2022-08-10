import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import SideBanner from '../../../components/Banner'
import Chat from '../../../components/atoms/chat-hubspot'

const Locations = ({ data, pageContext }) => {
  const hotelsUrl = `https://jet.turista.com.mx/hotels?cityId=${data.location.hotellookId}&currency=mxn`
  const { location, banner, image, numhoteles } = data.location
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-travel.html',
  }
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name}`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Chat />
      <Seo
        title={`Viaja a ${location.name}`}
        description={`Hospedaje en ${location.name}, ${location.estado.Name}. Reservaciones en línea e información de tarifas y disponibilidad para encontrar su hospedaje en ${location.name}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />
      <section className="section-center">
        <div className="back-white" style={{ marginTop: '-1.9rem' }}>
          <iframe
            title="jetTurista"
            src={hotelsUrl}
            style={{ width: '100%', height: '210rem' }}
          />
          <HotelBreadCrumbs location={location} endTitle="Travel" />
          <NavTabs url={data.location.slug} />
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle={`${numhoteles} hoteles en `}
            title={`${location.name} Hoteles`}
          />
        </div>
        <div>
          <SideBanner
            title={location.name}
            description={`Hospedaje en ${location.name}`}
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
