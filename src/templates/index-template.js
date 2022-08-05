import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Noticias from '../components/Noticias/noticias-list'

import Seo from '../components/Seo'
import BlockGrey from '../components/atoms/BlockGrey'
import BannerAdsense from '../utilities/BannerAdsense'
import ContainerGrecas from '../components/molecules/ContainerGrecas'
import ListaDestinos from '../components/Home/location-list'
import Mapa from '../components/Home/Mapa'

const index = ({ data }) => {
  const metadata = data.site.siteMetadata
  return (
    <Layout
      heroImg={data.image.childImageSharp}
      main={data.site.siteMetadata.estado.name}
      sub={data.site.siteMetadata.estado.slogan}
    >
      <Seo />

      <ContainerGrecas title={metadata.title} sideNavSec>
        <Mapa metadata={data.site.siteMetadata} />
        <ListaDestinos metadata={metadata} locations={data.locations.nodes} />
      </ContainerGrecas>

      {/* Noticias */}
      <div className="section-center">
        <div className="cont-area" style={{ background: 'var(--clr-white)' }}>
          <h3>Últimas Noticias de turismo en {metadata.estado.name}</h3>
          <Noticias
            noticias={data.allStrapiNoticia.nodes}
            perPage={5}
            title="Últimas Noticias"
            isHome="si"
          />
        </div>
        <div>
          <BlockGrey title="Compartir">
            <div class="s9-widget-wrapper"></div>
          </BlockGrey>
          <BannerAdsense className="h-80" />
          <BlockGrey title={`Acerca de Turista ${metadata.estado.name}`}>
            {metadata.description}
          </BlockGrey>
        </div>
      </div>
    </Layout>
  )
}

export default index

export const query = graphql`
  query($estadoSlug: String!) {
    locations: allStrapiLocation(
      filter: {
        estado: { slug: { eq: $estadoSlug } }
        hotel_location: { slug: { ne: null } }
      }
    ) {
      totalCount
      sum(field: hotel_location___numhoteles)
      nodes {
        name
        hotel_location {
          slug
          numhoteles
        }
      }
    }

    allStrapiNoticia(
      limit: 5
      filter: { estado: { slug: { eq: $estadoSlug } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...NoticiaCard
      }
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

    image: file(relativePath: { eq: "portada-1.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
