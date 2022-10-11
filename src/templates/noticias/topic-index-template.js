import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import TopNavSec from '../../components/atoms/TopNavSec'

import ButtonPages from '../../components/atoms/ButtonPages'
const Tema = ({ data }) => {
  const { t } = useTranslation()
  const topics = data.allStrapiNoticia.distinct
  const metadata = data.site.siteMetadata
  return (
    <Layout
      heroImg={data.image ? data.image.localFile.childImageSharp : ''}
      main="Temas de Noticias"
      sub={`sobre ${metadata.estado.name}`}
      linkExterno="/noticias/tema"
    >
      <Seo
        title={`Temas de Noticias en Turista ${metadata.estado.name}`}
        description={`Muestra los diferentes temas de noticias que se encuentran registrados en Turista ${metadata.estado.name}.`}
      />
      <TopNavSec />
      <div
        className="cont-area"
        style={{
          padding: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {topics.map((item) => (
          <p key={item}>
            <ButtonPages url={item} description={t(item)} />
          </p>
        ))}
      </div>
      <BannerAdsense />
    </Layout>
  )
}

export default Tema

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
    allStrapiNoticia(filter: { estado: { slug: { eq: $estadoSlug } } }) {
      distinct(field: topics___slug)
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

    image: strapiMedia(name: { eq: "noticias.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
