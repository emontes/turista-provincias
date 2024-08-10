// src/templates/noticias/topic-template.js

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
  const topic = pageContext.topic
  const topicImage = data.topicImage

  let titleSeo = `Noticias del Tema: ${t(topic)}`
  let descriptionSeo = `Artículos publicados con el tema ${topic} en el Turista.`
  if (pageContext.language === 'en') {
    titleSeo = `News in the Topic: ${t(topic)}`
    descriptionSeo = `Articles published with the topic ${t(topic)} in the Turista.`
  }

  return (
    <Layout
      heroImg={data.topicImage}
      main={t(topic)}
      seoTitle={titleSeo}
      linkExterno="/noticias"
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={topicImage ? getSrc(topicImage.childImageSharp.gatsbyImageData) : ''}
      />
      <TopNavSec />
      <Noticias
        noticias={data.allNoticia.nodes}
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
  query($topic: String!, $topicImage: String!) {
    
    allNoticia(
      filter: {
        topictext: { eq: $topic }
       
      }
      limit: 30
      sort: {time: DESC}
    ) {
      nodes {
        ...NoticiaCard
      }
    }
    topicImage: file(relativePath: { eq: $topicImage }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`