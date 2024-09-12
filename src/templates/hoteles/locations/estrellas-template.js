import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import { getSrc } from 'gatsby-plugin-image'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import Banner from '../../../components/Hoteles/Destination/Banner'
import Breadcrumbs from '../../../components/atoms/Breadcrumbs'
import NavTabs from '../../../components/Hoteles/Destination/NavTabs'
import ListaHotelesBoxes from '../../../components/Hoteles/Destination/lista-hoteles-boxes'
import Leyenda from '../../../components/Hoteles/Destination/leyenda-precios'
import SideBanner from '../../../components/Banner'
import { vistaToUrlHtml } from '../../../utilities/stringService'

const Estrellas = ({ data, pageContext }) => {
  const { image } = data.location
  const locationName = data.location.hvi_desc_spanish
  const banner = data.location.banner_spanish
  const metadata = data.site.siteMetadata;

  const numhoteles = data.hoteles.nodes.length
  const estrellas = pageContext.estrellas

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

  const titleSeo = `Hoteles ${estrellas} Estrellas en ${locationName}`

  let description1 = ''
  if (estrellas === 1)
    description1 = `Hoteles de Paso en ${locationName}, son hoteles estríctamente funcionales para dormir y seguir el viaje, `
  if (estrellas === 2)
    description1 = `Hoteles baratos en ${locationName}, son hoteles de mediana categoría y servicios básicos, `
  if (estrellas === 3)
    description1 = `Hoteles económicos en ${locationName}, son hoteles que tienen un precio razonable y son cómodos y limpios, `
  if (estrellas === 4)
    description1 = `Hoteles de primera clase en ${locationName}, son hoteles lujosos, con comodidades amplias para una estancia placentera, `
  if (estrellas === 5)
    description1 = `Hoteles de lujo en ${locationName}, son hoteles que se caracterizan por ofrefcerle la mejor atención y la más amplia gama de servicios, `
  const descriptionSeo =
    `${description1}encuentre su hotel ${estrellas} estrellas en ${locationName}.`
  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles ${locationName} ${estrellas} estrellas`}
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
            vistaDesc={locationName}
            estado={metadata.estado}
            subTitle={`${numhoteles} hoteles en `}
            title={`${locationName} Hoteles`}
          />
          <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle={`hoteles ${estrellas} estrellas`}
            singleUrl={true}
          />
          <div className="padding-1">
            <h2>Hoteles {estrellas} estrellas</h2>
            <p>{description1}</p>
          </div>
          <NavTabs
            vista={data.location}
            estrellas={pageContext.diferentesEstrellas}
          />
          <div className="back-white">
            <ListaHotelesBoxes
              hoteles={data.hoteles.nodes}
              perPage={pageContext.perPage}
            />
            <Leyenda location={locationName} />
          </div>
        </div>
        <div>
          <SideBanner
            title={locationName}
            description={`Hoteles ${estrellas} estrellas en ${locationName}`}
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
    

    hoteles: allHotel(
      filter: {vista: {eq: $id}, visible: {eq: "1"}, travelpayoutsid: {ne: null}, rating: {eq: $estrellas}},
      sort: {rating: DESC}

    ) {
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
