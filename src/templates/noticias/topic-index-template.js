// src/templates/noticias/topic-index-template.js
import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import TopNavSec from '../../components/atoms/TopNavSec'
import TopicCard from '../../components/Noticias/TopicCard'

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: #e6f2ff;
  border: 10px solid #8b4513;
  border-radius: 20px;
`

const Tema = ({ data }) => {
  const { t } = useTranslation()
  const topics = data.allNoticia.group
  const metadata = data.site.siteMetadata

  return (
    <Layout
      heroImg={data.image}
      main="Temas de Noticias"
      sub={`sobre ${metadata.estado.name}`}
      linkExterno="/noticias/tema"
    >
      <Seo
        title={`Temas de Noticias en Turista ${metadata.estado.name}`}
        description={`Muestra los diferentes temas de noticias que se encuentran registrados en Turista ${metadata.estado.name}.`}
      />
      <TopNavSec />
      <BoardWrapper>
        {topics.map((item) => (
          <TopicCard 
            key={item.fieldValue}
            topic={item.fieldValue}
            image={data.defaultTopicImage}
            newsCount={item.totalCount}
          />
        ))}
      </BoardWrapper>
      <BannerAdsense />
    </Layout>
  )
}

export default Tema

export const query = graphql`
  query {
    allNoticia {
      group(field: topictext) {
        fieldValue
        totalCount
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
    image: file(relativePath: { eq: "topic-turista.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    defaultTopicImage: file(relativePath: { eq: "default-topic.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 200, height: 150, layout: CONSTRAINED)
      }
    }
  }
`