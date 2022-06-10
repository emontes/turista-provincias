import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import BannerAdsense from '../../utilities/BannerAdsense'
import { getSrc } from 'gatsby-plugin-image'
import Links from '../../components/Links'

const LinksPage = ({ data }) => {
  const metadata = data.site.siteMetadata
  const { categories, links, category, image } = data

  let tree = []

  if (category.link_categories.length > 0) {
    tree.push(category.link_categories[0])

    // Obtiene el Arbol de categorías hasta en 5 niveles (para el site de todo México)
    if (category.link_categories[0].link_categories.length > 0) {
      tree.push(category.link_categories[0].link_categories[0])
      if (
        category.link_categories[0].link_categories[0].link_categories.length >
        0
      ) {
        tree.push(
          category.link_categories[0].link_categories[0].link_categories[0],
        )
        if (
          category.link_categories[0].link_categories[0].link_categories[0]
            .link_categories.length > 0
        ) {
          tree.push(
            category.link_categories[0].link_categories[0].link_categories[0]
              .link_categories[0],
          )
        }
      }
    }
  }

  tree = tree.reverse()
  //Para hacer el arbol de un estado le quitamos 2 niveles ('Estados de la República / Chiapas')
  if (tree.length > 0) {
    let treeLocal = []
    for (let [i, item] of tree.entries()) {
      if (i > 1) {
        treeLocal.push(item)
      }
    }
    tree = treeLocal
  }

  let seoTitle = 'Enlaces en '
  let seoDescription = 'Directorio de sitios web de '

  for (let item of tree) {
    seoTitle = seoTitle + item.title + ' '
    seoDescription = seoDescription + item.title + ' '
  }
  seoTitle = seoTitle + category.title
  seoDescription = seoDescription + category.title

  return (
    <Layout linkExterno="/links.html">
      <Seo
        title={seoTitle}
        description={seoDescription}
        image={getSrc(image.localFile.childImageSharp)}
      />

      <Links
        title={category.title}
        subtitle={seoDescription}
        tree={tree}
        category={category}
        linksCategories={categories.nodes}
        links={links.nodes}
        metadata={metadata}
      />

      <BannerAdsense />
    </Layout>
  )
}

export default LinksPage

export const query = graphql`
  query($slug: String!) {
    category: strapiLinkCategory(slug: { eq: $slug }) {
      title
      slug
      link_categories {
        title
        slug
        link_categories {
          title
          slug
          link_categories {
            title
            slug
            link_categories {
              title
              slug
            }
          }
        }
      }
    }
    categories: allStrapiLinkCategory(
      filter: { link_categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        slug
        title
        featured
      }
    }

    links: allStrapiLink(
      filter: { link_categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        title
        url
        description
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

    image: strapiMedia(name: { eq: "topic-historias.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
