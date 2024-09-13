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
      slug: vistaActionToUrlHtml(destino, 'spanish', 'economicos'),
    }
    items.push(item)
  }

  const listItems1 = {
    title: 'Otros destinos ',
    items: items,
    linkTo: '',
    linkToSuffix: '',
  }

  let letreroPricefrom = ''
  if (hoteles.nodes[0]) {
    letreroPricefrom = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(hoteles.nodes[0].lowestrate)
  }
  let descriptionSeo = `Encuentre hoteles económicos en ${locationName} con esta lista ordenada a partir del precio más barato para su hotel en ${locationName}. Hospedaje desde ${letreroPricefrom} Pesos prom/noche`

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles ${locationName} Económicos`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Hoteles económicos en ${locationName}`}
        description={descriptionSeo}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-white">
          <Banner
            image={banner}
            vistaDesc={locationName}
            estado={metadata.estado}
            subTitle={`Los ${numhoteles} hoteles más económicos de `}
            title="Económicos"
          />
           <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle="Economicos"
            singleUrl={true}
          />

          <div className="padding-1">
            <h2>Hoteles económicos en {locationName}</h2>

            {data.hoteles.nodes[0] && (
              <p>
                Hoteles desde{' '}
                <span className="green-text">{letreroPricefrom}</span>
              </p>
            )}
          </div>

          <NavTabs vista={data.location} />
          <ListaHotelesBoxes hoteles={data.hoteles.nodes} />
          <Leyenda location={locationName} />
        </div>
        <div>
          <SideBanner
            title={locationName}
            description={descriptionSeo}
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
        lowestrate: {gt: 0}
      },
      sort: {lowestrate: ASC}

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
