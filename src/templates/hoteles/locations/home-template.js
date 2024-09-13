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
import BlockTopHotels from '../../../components/Hoteles/Destination/block-tophotels'
import BlockStars from '../../../components/Hoteles/Destination/block-stars'
import Chat from '../../../components/atoms/chat-hubspot'
import { vistaToUrlHtml } from '../../../utilities/stringService.cjs'

const Locations = ({ data, pageContext }) => {
  const { location,  image } = data.location
  const locationName = data.location.hvi_desc_spanish 
  const banner = data.location.banner_spanish
  const metadata = data.site.siteMetadata;

  const numhoteles = data.hoteles.nodes.length
  const estrellasInvertidas = [...data.hoteles.estrellas].reverse();
  const tree = []
  const items = []

  for (const destino of pageContext.destinos) {
    const item = {
      title: destino.hvi_desc_spanish,
      slug: vistaToUrlHtml(destino, 'spanish'),
    }
    items.push(item)
  }

  // Para el sideBanner que liste las ciudades del estado
  const listItems1 = {
    title: `${metadata.estado.name}`,
    items: items,
    linkTo: '',
  }

  let titleSeo = `Guía de Hoteles en ${locationName}`
  let descriptionSeo = `Encuentre su Hotel en ${locationName}, ${metadata.estado.name} y resérvelo en línea  con las diferentes opiones de esta guía de Hoteles en ${locationName}.`

  let cuantosTienenPrecio = 0
  let sumaPrecios = 0
  for (const hotel of data.hoteles.nodes) {
    if (hotel.lowestrate > 0) {
      cuantosTienenPrecio = cuantosTienenPrecio + 1
      sumaPrecios = sumaPrecios + hotel.lowestrate
    }
  }
  const precioPromedio = sumaPrecios / cuantosTienenPrecio

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${locationName} `}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      {/* <Chat /> */}
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-white mt-4">
          <Banner
            image={banner}
            vistaDesc={locationName}
            estado={metadata.estado}
            subTitle={`${numhoteles} hoteles en `}
            title={`${locationName} Hoteles`}
          />
          <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle={locationName}
            singleUrl
          />
          <div className="padding-1">
            <h2>Hoteles en {locationName}</h2>
            <p>
              Una noche de hospedaje en {locationName} cuesta en promedio{' '}
              <span className="green-text">
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(precioPromedio)}
              </span>{' '}
              pesos.
            </p>
          </div>

          <NavTabs vista={data.location} />
          <div className="back-white">
            <ListaHotelesBoxes
              hoteles={data.hoteles.nodes}
              perPage={pageContext.perPage}
            />
          </div>

          <Leyenda location={locationName} />
        </div>
        <div>
          {numhoteles > pageContext.perPage && (
            <>
              <BlockTopHotels data={data} location={location} />
              <BlockStars
                estrellas={estrellasInvertidas}
                vista={data.location}
              />
            </>
          )}

          <SideBanner
            title={titleSeo}
            description={descriptionSeo}
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
    topecono: allHotel(
      filter: {lowestrate: {gt: 0},  visible: {eq: "1"}, vista: {eq: $id}}
      sort: {lowestrate: ASC}
      limit: 5
    ) {
      nodes {
        ...ListaHoteles
      }
    }
    # toppopular: allStrapiHotelHotellook(
    #   filter: {
    #     cityId: { eq: $id }
    #     pricefrom: { gt: 0 }
    #     stars: { gt: 0 }
    #     photoCount: { gt: 0 }
    #   }
    #   sort: { fields: popularity, order: DESC }
    #   limit: 5
    # ) {
    #   nodes {
    #     ...ListaHoteles
    #   }
    # }
    topgrandes: allHotel(
      filter: {vista: {eq: $id}, visible: {eq: "1"}, cuartos: {gt: 0}}
      sort: {cuartos: DESC}
      limit: 5
    ) {
      nodes {
        ...ListaHoteles
      }
    }

    # toprated: allStrapiHotelHotellook(
    #   filter: {
    #     cityId: { eq: $id }
    #     pricefrom: { gt: 0 }
    #     stars: { gt: 0 }
    #     photoCount: { gt: 0 }
    #   }
    #   sort: { fields: rating, order: DESC }
    #   limit: 5
    # ) {
    #   nodes {
    #     ...ListaHoteles
    #   }
    # }

    hoteles: allHotel(
      filter: {
        vista: {eq: $id}, 
        visible: {eq: "1"}, 
        travelpayoutsid: {ne: null}, 
        rating: {gt: 0}
      },
      sort: {rating: DESC}

    ) {
      estrellas: distinct(field: {rating: SELECT})
      nodes {
        ...ListaHoteles
      }
    }

    location(hviid: {eq: $id}) {
      alias
      hvi_desc_english
      hvi_desc_spanish
      banner_english
      banner_spanish
      estado
      hijas {
        hviid
        hvi_desc_spanish
      }
      hviid
      numhoteles
      parentid
      travelpayoutsid
    }

    site {
      siteMetadata {
        title
        description
        estado {
          name
          slug
          slogan
        }
      }
    }
  }
`
