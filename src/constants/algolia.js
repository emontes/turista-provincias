const { BiInfoCircle } = require('react-icons/bi')

const estadoSlug = process.env.ESTADO_SLUG

const querySection = `
{
    allStrapiSectionArticle(filter: {estado: {slug: {eq: "${estadoSlug}"}}}) {
      nodes {
        id
        title
        slug
        childrenStrapiSectionArticleContentTextnode {
          content
        }
      }
    }
  }
`

const queryStrapiNoticia = `
{
    allStrapiNoticia(
      filter: {estado: {slug: {eq: "${estadoSlug}"}}}
      sort: {fields: date, order: DESC}
    ) {
      nodes {
        id
        title
        slug
        slugOld
        dateslug: date(formatString: "yy/M")
        hometext {
          data {
            sid
            title
            hometext
          }
        }
      }
    }
  }
`
const query = ` {
  allNoticia(
      #filter: { language: { eq: $language } }
      sort: {time: DESC}
    ) {
      nodes {
         sid
          title
          hometext
          time(formatString: "ddd D MMM yy", locale: "es-mx")
      }
      totalCount
    }
}`

const queryLinks = `{
    allStrapiLink(
      filter: {link_categories: {elemMatch: {estado: {slug: {eq: "${estadoSlug}"}}}}}
    ) {
      nodes {
        id
        title
        url
        description
      }
    }
  }`

function sectionToAlgoliaRecord({
  id,
  title,
  slug,
  childrenStrapiSectionArticleContentTextnode,
}) {
  const url = `/info/${slug}`
  const text = childrenStrapiSectionArticleContentTextnode[0].content
  return {
    objectID: id,
    title,
    url,
    text,
    tipo: 'info',
  }
}

function pageToAlgoliaRecord({ sid, title, hometext, time }) {
  const hometext1 = hometext
  const text = hometext1.replace(/<\/?[^>]+(>|$)/g, '') // para que quite tags html
  const url = `/article${sid}.html`
  return {
    objectID: sid,
    title,
    url,
    text,
    tipo: 'noticia',
  }
}

function linkToAlgoliaRecord({ id, title, url, description }) {
  return {
    objectID: id,
    title,
    url,
    text: description,
    tipo: 'link',
  }
}

const queries = [
  // {
  //   query: querySection,
  //   transformer: ({ data }) =>
  //     data.allStrapiSectionArticle.nodes.map(sectionToAlgoliaRecord),
  // },
  {
    query: query,
    transformer: ({ data }) =>
      data.allNoticia.nodes.map(pageToAlgoliaRecord),
  },
  // {
  //   query: queryLinks,
  //   transformer: ({ data }) =>
  //     data.allStrapiLink.nodes.map(linkToAlgoliaRecord),
  // },
]

module.exports = queries
