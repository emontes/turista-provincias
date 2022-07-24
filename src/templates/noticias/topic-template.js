import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Noticias from '../../components/Noticias'

const Topic = ({ data, pageContext }) => {
  let titleSeo = `Noticias del Tema: ${data.topic.Title}`
  let descriptionSeo = `Artículos publicados con el tema ${data.topic.Title} en el Turista.`

  let displayImage = data.image.childImageSharp
  if (data.topic.image)
    displayImage = data.topic.image.localFile.childImageSharp
  return (
    <Layout
      heroImg={displayImage}
      main={data.topic.Title}
      seoTitle={titleSeo}
      linkExterno="/noticias"
    >
      <Seo
        title={titleSeo}
        description={descriptionSeo}
        image={displayImage ? getSrc(displayImage) : ''}
      />

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
  query($slug: String!, $estadoSlug: String!) {
    allStrapiNoticia(
      filter: {
        estado: { slug: { eq: $estadoSlug } }
        topics: { elemMatch: { slug: { eq: $slug } } }
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
