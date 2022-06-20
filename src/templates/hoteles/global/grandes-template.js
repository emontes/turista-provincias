import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import HotelsList from '../../../components/Hoteles/Global/hotels-list'
import LeyendaPrecios from '../../../components/Hoteles/Destination/leyenda-precios'
import ContainerGrecas from '../../../components/molecules/ContainerGrecas'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'

const Global = ({ data }) => {
  const metadata = data.site.siteMetadata
  const seoTitle = `Los hoteles más grandes de ${metadata.estado.name}`
  const seoDescription = `Entérate cuáles son los hoteles que tienen un mayor número de cuartos del Estado de ${metadata.estado.name}`

  return (
    <Layout
      seoTitle={`Hoteles con más cuartos en ${metadata.estado.name}`}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Seo title={seoTitle} description={seoDescription} />
      <ContainerGrecas
        title={`Los Hoteles más Grandes de ${metadata.estado.name}`}
      >
        <HotelsList hoteles={data.hoteles.nodes} title={seoTitle} />
        <br />
        <LeyendaPrecios />
        <p style={{ marginBottom: '0' }}>{seoDescription}</p>
      </ContainerGrecas>
    </Layout>
  )
}

export default Global

export const pageQuery = graphql`
  query($estadoSlug: String) {
    hoteles: allStrapiHotelHotellook(
      filter: {
        hotel_location: { location: { estado: { slug: { eq: $estadoSlug } } } }
        cntRooms: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: cntRooms, order: DESC }
      limit: 60
    ) {
      nodes {
        ...ListaHoteles
      }
    }

    site {
      siteMetadata {
        estado {
          name
          slug
          slogan
        }
      }
    }
  }
`
