import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Links from '../../components/Links'

const LinksPage = ({ data }) => {
  const metadata = data.site.siteMetadata
  const { allLinkCategory, allLink, linkCategory, image } = data

  const tree = []

  const buildTree = (cid, categories) => {
    const category = categories.find(cat => cat.cid === cid)
    if (category) {
      const slug = `link-${category.cid}.html`
      tree.unshift({
        ...category,
        slug: slug
      })
      if (category.parentid !== "0") {
        buildTree(category.parentid, categories)
      }
    }
  }

  if (linkCategory) {
    buildTree(linkCategory.parentid, data.allLinkCategory.nodes)
  }

  let seoTitle = 'Enlaces en '
  let seoDescription = 'Directorio de sitios web de '

  for (const item of tree) {
    seoTitle = `${seoTitle + item.title} `
    seoDescription = `${seoDescription + item.title} `
  }
  seoTitle = seoTitle + (linkCategory ? linkCategory.title : '')
  seoDescription = seoDescription + (linkCategory ? linkCategory.title : '')

  return (
    <Layout linkExterno="/links.html">
      <Seo
        title={seoTitle}
        description={seoDescription}
        image={image ? getSrc(image.childImageSharp) : ''}
      />
      <Links
        title={linkCategory ? linkCategory.title : 'Directorio'}
        subtitle={seoDescription}
        tree={tree}
        category={linkCategory}
        linksCategories={allLinkCategory.nodes.filter(cat => cat.parentid === (linkCategory ? linkCategory.cid : "0"))}
        links={allLink.nodes}
        metadata={metadata}
        sideNavSec
      />
    </Layout>
  )
}

export default LinksPage

export const query = graphql`
  query($cid: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    linkCategory(cid: { eq: $cid }) {
      title
      cid
      parentid
    }
    allLinkCategory {
      nodes {
        cid
        parentid
        title
      }
    }
    allLink(filter: {cid: {eq: $cid}}) {
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
    image: file(relativePath: { eq: "topic-directorio.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`