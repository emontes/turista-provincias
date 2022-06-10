import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const numhoteles = data.hoteles.nodes.length
  const listItems1 = {
    title: 'Hoteles en Chiapas',
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '.html',
  }

  return (
    <Layout linkExterno="/hoteles" seoTitle={`Hoteles en ${location.name}`}>
      <Seo
        title={`Guía de Hoteles en ${location.name}`}
        description={`Listado de hoteles en ${location.name} agrupados por categoría del hotel en ${location.name}, mostrando precios, fotos e información`}
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

        <div className="section-center">
          <div>
            {numhoteles > 20 ? (
              <>
                <h3>Los Hoteles más Populares de {location.name}</h3>
                <ListaHotelesBoxes hoteles={data.toppopular.nodes} />

                <h3>Los Hoteles mejor Valorados de {location.name}</h3>
                <ListaHotelesBoxes hoteles={data.toprated.nodes} />
                <h3>Los Hoteles más Económicos de {location.name}</h3>
                <ListaHotelesBoxes hoteles={data.topecono.nodes} />
                <h3>Los Hoteles más Grandes de {location.name}</h3>
                <ListaHotelesBoxes hoteles={data.topgrandes.nodes} />
              </>
            ) : (
              <ListaHotelesBoxes
                location={data.location}
                hoteles={data.hoteles.nodes}
              />
            )}
          </div>
          <div>
            <SideBanner
              title={location.name}
              description="Guía de Hoteles"
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
    topecono: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
        pricefrom: { gt: 0 }
        stars: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: pricefrom, order: ASC }
      limit: 3
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
      limit: 3
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
      limit: 3
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
      limit: 3
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
