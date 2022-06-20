import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes-estrellas'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import Breadcrumbs from '../../../components/atoms/Breadcrumbs'
import BlockGrey from '../../../components/atoms/BlockGrey'
import ListaHotelesUl from '../../../components/Hoteles/Destination/lista-hoteles-ul'
const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  let tree = []

  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '.html',
  }

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name}`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Guía de Hoteles en ${location.name}`}
        description={`Guía de hoteles en ${location.name}, ${location.estado.Name} con opciones para reservación en línea, fotografías, categorías, calificaciones y lo necesario  para encontrar su hotel en ${location.name}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-grey-10">
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle={`${numhoteles} hoteles en `}
            title={`${location.name} Hoteles`}
          />
          <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle={location.name}
          />
          <NavTabs url={data.location.slug} />
          <div>
            <ListaHotelesBoxes
              location={data.location}
              hoteles={data.hoteles.nodes}
            />
          </div>

          <Leyenda location={location.name} />
        </div>
        <div>
          {numhoteles > 20 && (
            <BlockGrey title={`Top Hoteles ${location.name}`}>
              <ListaHotelesUl
                title={`Los Hoteles más Económicos de ${location.name}`}
                hoteles={data.topecono.nodes}
              />

              <ListaHotelesUl
                title={`Los Hoteles más Populares de ${location.name}`}
                hoteles={data.toppopular.nodes}
              />

              <ListaHotelesUl
                title={`Los Hoteles mejor Valorados de ${location.name}`}
                hoteles={data.toprated.nodes}
              />

              <ListaHotelesUl
                title={`Los Hoteles más Grandes de ${location.name}`}
                hoteles={data.topgrandes.nodes}
              />
            </BlockGrey>
          )}
          <SideBanner
            title={location.name}
            description="Guía de Hoteles"
            image={image ? image : ''}
            showHotelsBox={true}
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
    topecono: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
        pricefrom: { gt: 0 }
        stars: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: pricefrom, order: ASC }
      limit: 5
    ) {
      nodes {
        ...ListaHoteles
      }
    }
    toppopular: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
        pricefrom: { gt: 0 }
        stars: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: popularity, order: DESC }
      limit: 5
    ) {
      nodes {
        ...ListaHoteles
      }
    }
    topgrandes: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
        pricefrom: { gt: 0 }
        stars: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: cntRooms, order: DESC }
      limit: 5
    ) {
      nodes {
        ...ListaHoteles
      }
    }

    toprated: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
        pricefrom: { gt: 0 }
        stars: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: rating, order: DESC }
      limit: 5
    ) {
      nodes {
        ...ListaHoteles
      }
    }

    hoteles: allStrapiHotelHotellook(
      filter: { cityId: { eq: $id }, stars: { gt: 0 }, photoCount: { gt: 0 } }
      sort: { fields: stars, order: DESC }
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
