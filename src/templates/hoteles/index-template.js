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
import { useTranslation } from 'gatsby-plugin-react-i18next'

const HotelesIndex = ({ data, pageContext }) => {
  const src = getSrc(data.image.childImageSharp)
  const metadata = data.site.siteMetadata
  const { t } = useTranslation()
  let seoDescription = `Encuentre el Hotel que busca con el buscador de hoteles de ${metadata.estado.name}, o con el listado de ciudades que tienen Hoteles en ${metadata.estado.name}`
  let muestranText = `
            Se muestran ${data.locations.totalCount} Destinos con 
            <i>Hoteles en ${metadata.estado.name}</i>
            <br />
            Tenemos ${data.locations.sum} hoteles registrados en el 
            <b>Turista ${metadata.estado.name}</b>
          `
  if (pageContext.language === 'en') {
    seoDescription = `Find the hotel you are looking for with the hotel search engine for ${metadata.estado.name}, or with the list of cities that have hotels in ${metadata.estado.name}`
    muestranText = `
            Shown ${data.locations.totalCount} Destinations with  
            <i>Hotels in ${metadata.estado.name}</i>
            <br />
            We have ${data.locations.sum} hotels registered in the  
            <b>Turista ${metadata.estado.name}</b>
          `
  }

  const seoTitle = t('Destinos con Hoteles en')
  return (
    <Layout
      seoTitle={`${seoTitle} ${metadata.estado.name}`}
      linkExterno="/hoteles"
      heroImg={data.image}
      heroComponent={<HotelesHero topDestinos={data.topDestinos.nodes} />}
      footerList1={footerList1}
      footerList2={footerList2}
    >
      <Chat />
      <Seo
        title={`${seoTitle} ${metadata.estado.name}`}
        description={seoDescription}
        image={src}
      />
      <section style={{ background: 'var(--clr-grey-10)' }}>
        <Hoteles metadata={metadata} locations={data.locations.nodes} />
      </section>
      <TopNavSec />
      <section className="section-center" style={{ marginTop: '2rem' }}>
        <BannerAdsense />
        <BlockGrey title={`${t('Hoteles en')} Turista ${metadata.estado.name}`}>
          <p dangerouslySetInnerHTML={{ __html: muestranText }} />
        </BlockGrey>
      </section>
    </Layout>
  )
}



export default HotelesIndex

export const query = graphql`
  query( $language: String) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    locations: allLocation (filter: {travelpayoutsid: {ne: null}}) {
    totalCount
    sum(field: {numhoteles: SELECT})
    nodes {
      hviid
      hvi_desc_spanish
      banner_spanish
      numhoteles
      travelpayoutsid
    }
  }
    topDestinos: allLocation(filter: {destacado: {eq: "1"}}, limit: 2) {
    nodes {
      hviid
      hvi_desc_spanish
      banner_spanish
      numhoteles
      travelpayoutsid
      destacado
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
