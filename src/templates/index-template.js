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
import Compartir from '../components/atoms/Compartir'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const Index = ({ data }) => {
  const metadata = data.site.siteMetadata
  const { t } = useTranslation()
  return (
    <Layout
      heroImg={data.image.childImageSharp}
      main={t(data.site.siteMetadata.estado.name)}
      sub={t(data.site.siteMetadata.estado.slogan)}
    >
      <Seo />

      <ContainerGrecas title={metadata.title} sideNavSec>
        <Mapa metadata={data.site.siteMetadata} />
        <ListaDestinos metadata={metadata} locations={data.locations.nodes} />
      </ContainerGrecas>

      {/* Noticias */}
      <div className="md:flex gap-4">
        <div className="cont-area" style={{ background: 'var(--clr-white)' }}>
          <h3 className="text-red-600">
            <Trans>Últimas Noticias de turismo en</Trans> {metadata.estado.name}
          </h3>
          <Noticias
            noticias={data.allStrapiNoticia.nodes}
            perPage={3}
            title="Últimas Noticias"
            isHome="si"
          />
        </div>
        <div>
          <BlockGrey title={t('Compartir')}>
            <Compartir title={t('¿Ya conoces el Turista?')} />
          </BlockGrey>

          {/* <BannerAdsense
            style={{ display: 'inline-block', width: '300px', height: '600px' }}
            className="mx-auto hidden md:inline-block"
          /> */}

          <BlockGrey
            title={`${t('Acerca de')} Turista ${metadata.estado.name}`}
          >
            {metadata.description}
          </BlockGrey>
        </div>
      </div>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query($estadoSlug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
      limit: 3
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
