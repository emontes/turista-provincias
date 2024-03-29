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
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import Chat from '../../../components/atoms/chat-hubspot'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location
  const hoteles = data.hoteles
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '-lista.html',
  }

  let cuantosTienenPrecio = 0
  let sumaPrecios = 0
  data.hoteles.nodes.forEach((item) => {
    if (item.pricefrom > 0) {
      cuantosTienenPrecio = cuantosTienenPrecio + 1
      sumaPrecios = sumaPrecios + item.pricefrom
    }
  })
  const precioPromedio = sumaPrecios / cuantosTienenPrecio

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name} Lista`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Chat />
      <Seo
        title={`Lista de Hoteles en ${location.name}, ${location.estado.Name}`}
        description={`Directorio de Hoteles en ${location.name} con nombre de hotel, Dirección, categoría y costo aproximado por noche para guiarlo a la mejor opción para reservar su hotel en ${location.name}.`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-white">
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle={`${hoteles.nodes.length} hoteles en `}
            title={`${location.name} Lista de Hoteles`}
          />
          <HotelBreadCrumbs location={location} endTitle="Listado" />
          <div className="padding-1">
            <h2>Lista de Hoteles de {location.name}</h2>
            <p>
              Una noche de hospedaje en {location.name} promedia{' '}
              <span className="green-text">
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(precioPromedio * 24)}
              </span>{' '}
              pesos.
            </p>
          </div>
          <NavTabs url={data.location.slug} />
          <Lista location={data.location} hoteles={hoteles.nodes} />
          <Leyenda location={location.name} />
        </div>
        <div>
          <SideBanner
            title={location.name}
            description={`Lista de todos los Hoteles que tenemos registrados en ${location.name} ordenados por orden alfabético`}
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
