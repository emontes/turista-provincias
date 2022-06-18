import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'
import HotelsList from '../../components/Hoteles/Global/hotels-list'
import LeyendaPrecios from '../../components/Hoteles/Destination/leyenda-precios'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'

const Global = ({ data, pageContext }) => {
  console.log('DAta from global template: ', data)
  console.log('El pageContext:', pageContext)
  const metadata = data.site.siteMetadata
  const seoTitle = `Hoteles económicos en ${metadata.estado.name}`
  const seoDescription = `Lista con los hoteles más económicos del Estado de ${metadata.estado.name}`
  return (
    <Layout seoTitle={seoTitle}>
      <Seo title={seoTitle} description={seoDescription} />
      <ContainerGrecas
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
  query($estadoSlug: String) {
    hoteles: allStrapiHotelHotellook(
      filter: {
        hotel_location: { location: { estado: { slug: { eq: $estadoSlug } } } }
        pricefrom: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: pricefrom, order: ASC }
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
