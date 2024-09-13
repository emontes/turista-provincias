import React from "react";
import Layout from "../../../components/Layout";
import { graphql } from "gatsby";
import Seo from "../../../components/Seo";
import { getSrc } from "gatsby-plugin-image";
import Banner from "../../../components/Hoteles/Destination/Banner";
import Lista from "../../../components/Hoteles/Destination/lista-hoteles";
import NavTabs from "../../../components/Hoteles/Destination/NavTabs";
import SideBanner from "../../../components/Banner";
import Leyenda from "../../../components/Hoteles/Destination/leyenda-precios";
import footerList1 from "../../../constants/Hoteles/global-hotels-links";
import footerList2 from "../../../constants/especialistas-links";
import Breadcrumbs from '../../../components/atoms/Breadcrumbs'
import { vistaToUrlHtml, vistaActionToUrlHtml } from '../../../utilities/stringService'

const Locations = ({ data, pageContext }) => {
  const { image } = data.location
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
      slug: vistaActionToUrlHtml(destino, 'spanish', 'lista'),
    }
    items.push(item)
  }

	const listItems1 = {
		title: `${metadata.estado.name}`,
		items: items,
		linkTo: "",
		linkToSuffix: "",
	};

  console.log('Hoteles', hoteles)
  let cuantosTienenPrecio = 0
  let sumaPrecios = 0
  hoteles.nodes.forEach((item) => {
    if (item.lowestrate > 0) {
      cuantosTienenPrecio = cuantosTienenPrecio + 1
      sumaPrecios = sumaPrecios + item.pricefrom
    }
  })
  const precioPromedio = sumaPrecios / cuantosTienenPrecio

  return (
    <Layout
      linkExterno="/hoteles"
      seoTitle={`Hoteles en ${locationName} Lista`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo
        title={`Lista de Hoteles en ${locationName}, ${metadata.estado.name}`}
        description={`Directorio de Hoteles en ${locationName} con nombre de hotel, Dirección, categoría y costo aproximado por noche para guiarlo a la mejor opción para reservar su hotel en ${locationName}.`}
        image={image ? getSrc(image.localFile.childImageSharp) : ''}
      />

      <section className="section-center">
        <div className="back-white">
          <Banner
            image={banner}
            vistaDesc={locationName}
            estado={metadata.estado}
            subTitle={`${hoteles.nodes.length} hoteles en `}
            title={`${locationName} Lista de Hoteles`}
          />
          <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle="Listado"
            singleUrl={true}
          />
          <div className="padding-1">
            <h2>Lista de Hoteles de {locationName}</h2>
            <p>
              Una noche de hospedaje en {locationName} promedia{' '}
              <span className="green-text">
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(precioPromedio * 24)}
              </span>{' '}
              pesos.
            </p>
          </div>
          <NavTabs vista={data.location} />
          <Lista location={data.location} hoteles={hoteles.nodes} />
          <Leyenda location={locationName} />
        </div>
        <div>
          <SideBanner
            title={locationName}
            description={`Lista de todos los Hoteles que tenemos registrados en ${locationName} ordenados por orden alfabético`}
            image={image ? image : ''}
            showHotelsBox={true}
            listItems1={listItems1}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Locations;

export const pageQuery = graphql`
  query($id: String) {
    hoteles: allHotel(
      filter: {vista: {eq: $id}, visible: {eq: "1"}, travelpayoutsid: {ne: null}, rating: {gt: 0}},
      sort: {nombre: ASC}

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
