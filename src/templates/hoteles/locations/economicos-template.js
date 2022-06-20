import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import SideBanner from '../../../components/Banner'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  const listItems1 = {
    title: 'Otros destinos ',
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-economicos.html',
  }
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`${location.name} Hoteles Económicos`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Hoteles económicos en ${location.name}`}
        description={`Encuentre hoteles económicos en ${location.name}, ${location.estado.Name} con esta lista ordenada a partir del precio más barato para su hotel en ${location.name}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-grey-10">
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle={`Los ${numhoteles} hoteles más económicos de `}
            title="Económicos"
          />
          <HotelBreadCrumbs location={location} endTitle="Económicos" />
          <NavTabs url={data.location.slug} />

          <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
          <Leyenda location={location.name} />
        </div>
        <div>
          <SideBanner
            title={location.name}
            description={`Los hoteles más económicos de ${location.name},  ordenados de Menor a Mayor precio`}
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
      filter: {
        cityId: { eq: $id }
        pricefrom: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: pricefrom, order: ASC }
      limit: 60
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
