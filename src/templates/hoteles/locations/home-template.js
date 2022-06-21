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
import Pagination from '../../../components/Hoteles/Destination/Pagination'

const Locations = ({ data, pageContext }) => {
  const { location, banner, image } = data.location

  const pageInfo = data.hoteles.pageInfo
  const numhoteles = pageInfo.totalCount
  let tree = []

  if (pageInfo.currentPage > 1) {
    tree.push({ slug: `${data.location.slug}.html`, title: location.name })
  }

  // Para el sideBanner que liste las ciudades del estado
  const listItems1 = {
    title: `${location.estado.Name}`,
    items: pageContext.destinos,
    linkTo: '',
    linkToSuffix: '.html',
  }

  let titleSeo = `Guía de Hoteles en ${location.name}`
  let descriptionSeo = `Encuentre su Hotel en ${location.name}, ${location.estado.Name} y resérvelo en línea  con las diferentes opiones de esta guía de Hoteles en ${location.name}`
  if (pageInfo.currentPage > 1) {
    titleSeo = titleSeo + ' Página. ' + pageInfo.currentPage
    descriptionSeo = 'Página ' + pageInfo.currentPage + ' de ' + descriptionSeo
  }
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${location.name} ${
        pageInfo.currentPage > 1 ? `Página ${pageInfo.currentPage}` : ''
      }`}
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

          <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle={
              pageInfo.currentPage > 1
                ? `Página ${pageInfo.currentPage}`
                : location.name
            }
            singleUrl
          />
          <NavTabs url={data.location.slug} />
          <div className="back-white">
            <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
          </div>
          <Pagination url={data.location.slug} pageInfo={pageInfo} />
          <Leyenda location={location.name} />
        </div>
        <div>
          {pageInfo.totalCount > pageInfo.perPage && (
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
  query($id: String, $skip: Int, $limit: Int) {
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
      limit: $limit
      skip: $skip
      filter: { cityId: { eq: $id }, stars: { gt: 0 }, photoCount: { gt: 0 } }
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
        estado {
          Name
        }
      }
    }
  }
`
