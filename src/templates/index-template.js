import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Noticias from '../components/Noticias/noticias-list'

import Seo from '../components/Seo'
import Mapa from '../components/Home/mapa'
import BlockGrey from '../components/atoms/BlockGrey'
import BannerAdsense from '../utilities/BannerAdsense'

const index = ({ data }) => {
  const metadata = data.site.siteMetadata
  return (
    <Layout
      heroImg={data.image.childImageSharp}
      main={data.site.siteMetadata.estado.name}
      sub={data.site.siteMetadata.estado.slogan}
    >
      <Seo />
      <Mapa metadata={data.site.siteMetadata} />
      <div className="section-center">
        <div className="cont-area" style={{ background: 'var(--clr-white)' }}>
          <Noticias
            noticias={data.allStrapiNoticia.nodes}
            title="Últimas Noticias"
            isHome="si"
          />
        </div>
        <div>
          <BlockGrey title="Compartir">
            <div class="s9-widget-wrapper"></div>
          </BlockGrey>
          <BannerAdsense />
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
