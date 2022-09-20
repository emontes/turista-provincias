import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Noticias from '../../components/Noticias'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import TopNavSec from '../../components/atoms/TopNavSec'

const Topic = ({ data, pageContext }) => {
  const { t } = useTranslation()
  let titleSeo = `Noticias del Tema: ${t(data.topic.Title)}`
  let descriptionSeo = `Artículos publicados con el tema ${data.topic.Title} en el Turista.`
  if (pageContext.language === 'en') {
    titleSeo = `News in the Topic: ${t(data.topic.Title)}`
    descriptionSeo = `Articles published with the topic ${t(
      data.topic.Title,
    )} in the Turista.`
  }

  let displayImage = data.image.childImageSharp
  if (data.topic.image)
    displayImage = data.topic.image.localFile.childImageSharp
  return (
    <Layout
      heroImg={displayImage}
      main={t(data.topic.Title)}
      seoTitle={titleSeo}
      linkExterno="/noticias"
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={displayImage ? getSrc(displayImage) : ''}
      />
      <TopNavSec />
      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        topics={pageContext.topics}
        perPage={5}
      />
    </Layout>
  )
}

export default Topic

export const query = graphql`
  query($slug: String!, $estadoSlug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allStrapiNoticia(
      filter: {
        estado: { slug: { eq: $estadoSlug } }
        topics: { elemMatch: { slug: { eq: $slug } } }
        locale: { eq: $language }
      }
      limit: 30
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...NoticiaCard
      }
    }

    topic: strapiTopic(slug: { eq: $slug }) {
      Title
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
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
