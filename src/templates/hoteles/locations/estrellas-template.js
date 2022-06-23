import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import Banner from '../../../components/Hoteles/Destination/Banner'
import HotelBreadCrumbs from '../../../components/Hoteles/HotelBreadCrumbs'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import BlockStars from '../../../components/Hoteles/Destination/block-stars'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes-estrellas'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'

const Estrellas = ({ data, pageContext }) => {
  console.log('PageContext en home-template: ', pageContext)
  console.log(data)

  const { location, banner, image } = data.location
  const pageInfo = data.hoteles.pageInfo
  const numhoteles = pageInfo.totalCount
  const estrellas = pageContext.estrellas

  // Para el sideBanner que liste las ciudades del estado
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '.html',
  }

  let titleSeo = `Hoteles ${estrellas} Estrellas en ${location.name}`

  let description1 = ''
  if (estrellas === 1)
    description1 = `Hoteles de Paso en ${location.name}, son hoteles estríctamente funcionales para dormir y seguir el viaje, `
  if (estrellas === 2)
    description1 = `Hoteles baratos en ${location.name}, son hoteles de mediana categoría y servicios básicos, `
  if (estrellas === 3)
    description1 = `Hoteles económicos en ${location.name}, son hoteles que tienen un precio razonable y son cómodos y limpios, `
  if (estrellas === 4)
    description1 = `Hoteles de primera clase en ${location.name}, son hoteles lujosos, con comodidades amplias para una estancia placentera, `
  if (estrellas === 5)
    description1 = `Hoteles de lujo en ${location.name}, son hoteles que se caracterizan por ofrefcerle la mejor atención y la más amplia gama de servicios, `
  const descriptionSeo =
    description1 +
    `encuentre su hotel ${estrellas} estrellas en ${location.name}.`
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles ${location.name} ${estrellas} estrellas`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />
      <section className="section-center">
        <div className="back-white">
          <Banner
            image={banner}
            vistaDesc={location.name}
            estado={location.estado.Name}
            subTitle={`${numhoteles} hoteles en `}
            title={`${location.name} Hoteles`}
          />
          <HotelBreadCrumbs
            location={location}
            endTitle={`hoteles ${estrellas} estrellas`}
          />
          <div className="padding-1">
            <h2>Hoteles {estrellas} estrellas</h2>
            <p>{description1}</p>
          </div>
          <NavTabs url={data.location.slug} />
          <div className="back-white">
            <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
            <Leyenda location={location.name} />
          </div>
        </div>
        <div>
          <BlockStars
            estrellas={pageContext.diferentesEstrellas}
            slug={pageContext.slug}
          />

          <SideBanner
            title={location.name}
            description={`Hoteles ${estrellas} estrellas en ${location.name}`}
            image={image ? image : ''}
            listItems1={listItems1}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Estrellas

export const pageQuery = graphql`
  query($id: String, $estrellas: Int) {
    hoteles: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
        stars: { eq: $estrellas }
        photoCount: { gt: 0 }
      }
      sort: { fields: stars, order: DESC }
    ) {
      nodes {
        ...ListaHoteles
      }
      pageInfo {
        pageCount
        itemCount
        perPage
        totalCount
        hasPreviousPage
        hasNextPage
        currentPage
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
