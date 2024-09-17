import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import Banner from '../../../components/Hoteles/Destination/Banner'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import Breadcrumbs from '../../../components/atoms/Breadcrumbs'
import { vistaToUrlHtml, vistaActionToUrlHtml } from '../../../utilities/stringService'


const Locations = ({ data, pageContext }) => {
  const { image } = data.location
  const numhoteles = data.hoteles.nodes.length
  const hoteles = data.hoteles
  const locationName = data.location.hvi_desc_spanish 
  const banner = data.location.banner_spanish
  const metadata = data.site.siteMetadata;

  const tree = []
  const treeItem1 = {
    title: locationName,
    slug: vistaToUrlHtml(data.location, 'spanish') ,
  }
  tree.push(treeItem1)

  const items = []
  for (const destino of pageContext.destinos) {
    const item = {
      title: destino.hvi_desc_spanish,
      slug: vistaActionToUrlHtml(destino, 'spanish', 'grandes'),
    }
    items.push(item)
  }

  const listItems1 = {
    title: 'Otros destinos ',
    items: items,
    linkTo: '',
    linkToSuffix: '',
  }

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles grandes ${locationName}`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Los hoteles más grandes de ${locationName}`}
        description={`Listado de hoteles que cuentan con mayor número de habitaciones en ${locationName}. Encuentre el hotel más grande de ${locationName}`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-white">
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
            endTitle="Grandes"
            singleUrl={true}
          />
          <div className="padding-1">
            <h2>Los Hoteles más grandes de {locationName}</h2>
            <p>
              Los Hoteles mostrados suman {data.hoteles.sum} cuartos. En
              promedio un hotel tiene{' '}
              <span className="green-text">
                {(data.hoteles.sum / data.hoteles.nodes.length).toFixed(0)}
              </span>{' '}
              cuartos.
            </p>
          </div>
          <NavTabs vista={data.location} />
          <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
          <Leyenda location={locationName} />
        </div>
        <div>
          <SideBanner
            title={locationName}
            description={`Los hoteles más grandes de ${locationName}, basado en el número de cuartos de cada hotel`}
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
    hoteles: allHotel(
      filter: {
        vista: {eq: $id}, 
        visible: {eq: "1"}, 
        travelpayoutsid: {ne: null}, 
        cuartos: {gt: 0}
      },
      sort: {cuartos: DESC}

    ) {
      estrellas: distinct(field: {rating: SELECT})
      sum(field: {cuartos: SELECT})
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
      latitud
      longitud
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
`;