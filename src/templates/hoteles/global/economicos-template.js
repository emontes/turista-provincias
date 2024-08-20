import React from 'react'
import Layout from '../../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../../components/Seo'
import HotelsList from '../../../components/Hoteles/Global/hotels-list'
import LeyendaPrecios from '../../../components/Hoteles/Destination/leyenda-precios'
import ContainerGrecas from '../../../components/molecules/ContainerGrecas'
import footerList1 from '../../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../../constants/especialistas-links'
import Chat from '../../../components/atoms/chat-hubspot'

const Global = ({ data }) => {
  const metadata = data.site.siteMetadata
  const seoTitle = `Hoteles económicos en ${metadata.estado.name}`
  const seoDescription = `Lista con los hoteles más económicos del Estado de ${metadata.estado.name}`
  return (
    <Layout
      seoTitle={seoTitle}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Chat />
      <Seo title={seoTitle} description={seoDescription} />
      <ContainerGrecas
        className="mt-11"
        title={`Los Hoteles más Económicos de ${metadata.estado.name}`}
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
  query {
    hoteles:  allHotel(filter: {lowestrate: {gt: 0}}, sort: {lowestrate: ASC}, limit: 60)  {
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
