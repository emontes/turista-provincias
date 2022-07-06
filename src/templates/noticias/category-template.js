import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Noticias from '../../components/Noticias'

const Category = ({ data, pageContext }) => {
  let titleSeo = `Noticias de ${data.location.name}`
  let descriptionSeo = `La categoría de noticias de ${data.location.name} se refiere a noticias relacionadas con el turismo en ${data.location.name}`

  return (
    <Layout seoTitle={titleSeo} linkExterno="/noticias">
      <Seo title={titleSeo} description={descriptionSeo} />

      <Noticias
        noticias={data.allStrapiNoticia.nodes}
        title={titleSeo}
        description={descriptionSeo}
        topics={pageContext.topics}
        categories={pageContext.categories}
        perPage={5}
      />
    </Layout>
  )
}

export default Category

export const query = graphql`
  query($slug: String!, $estadoSlug: String!) {
    allStrapiNoticia(
      filter: {
        estado: { slug: { eq: $estadoSlug } }
        location: { slug: { eq: $slug } }
      }
      limit: 500
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...NoticiaCard
      }
    }

    location: strapiLocation(slug: { eq: $slug }) {
      name
      latitude
      longitude
    }

    image: file(relativePath: { eq: "portada-1.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
