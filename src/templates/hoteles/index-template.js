import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import HotelesHero from '../../components/Hoteles/Home/HotelsHero'
import Hoteles from '../../components/Hoteles/Home'
import { getSrc } from 'gatsby-plugin-image'
import BannerAdsense from '../../utilities/BannerAdsense'
import BlockGrey from '../../components/atoms/BlockGrey'
import footerList1 from '../../constants/Hoteles/global-hotels-links'
import footerList2 from '../../constants/especialistas-links'
import Chat from '../../components/atoms/chat-hubspot'
import TopNavSec from '../../components/atoms/TopNavSec'

const hoteles = ({ data }) => {
  const src = getSrc(data.image.childImageSharp)
  const metadata = data.site.siteMetadata

  return (
    <Layout
      seoTitle={`Destinos con Hoteles en ${metadata.estado.name}`}
      linkExterno="/hoteles"
      heroImg={data.image}
      heroComponent={<HotelesHero topDestinos={data.topDestinos.nodes} />}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Chat />
      <Seo
        title={`Destinos con Hoteles en ${metadata.estado.name}`}
        description={`Encuentre el Hotel que busca con el buscador de hoteles de ${metadata.estado.name}, o con el listado de ciudades que tienen Hoteles en ${metadata.estado.name}`}
        image={src}
      />
      <section style={{ background: 'var(--clr-grey-10)' }}>
        <Hoteles metadata={metadata} locations={data.locations.nodes} />
      </section>
      <TopNavSec />
      <section className="section-center" style={{ marginTop: '2rem' }}>
        <BannerAdsense />
        <BlockGrey title={`Hoteles en Turista ${metadata.estado.name}`}>
          <p>
            Se muestran {data.locations.totalCount} Destinos con{' '}
            <i>Hoteles en {metadata.estado.name}</i>
            <br />
            Tenemos {data.locations.sum} hoteles registrados en el{' '}
            <b>Turista {metadata.estado.name}</b>
          </p>
        </BlockGrey>
      </section>
    </Layout>
  )
}

export default hoteles

export const query = graphql`
  query($estadoSlug: String!, $language: String) {
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
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          banner {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }

    topDestinos: allStrapiHotelLocation(
      filter: {
        location: {
          destacado: { eq: true }
          estado: { slug: { eq: $estadoSlug } }
        }
      }
      limit: 2
      sort: { fields: numhoteles, order: DESC }
    ) {
      nodes {
        slug
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }

        location {
          name
        }
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

    image: file(relativePath: { eq: "portada-hoteles.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
