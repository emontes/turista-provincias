const path = require('path')
const fetch = require('node-fetch')

async function fetchAllNoticias(baseUrl) {
  let page = 1
  let allNoticias = []
  let hasNextPage = true

  while (hasNextPage) {
    const response = await fetch(`${baseUrl}?page=${page}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    allNoticias = allNoticias.concat(data._embedded.noticia)

    hasNextPage = data._links.next !== undefined
    page++

    // Optional: add a small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return allNoticias
}
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const estadoSlug = process.env.ESTADO_SLUG

  // Fetch data from the API
  const result = await fetch(`http://api.${estadoSlug}.turista.com.mx/estado-vistas/1`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await result.json()

  // Create nodes for each location
  Object.values(data).forEach((location) => {
    const nodeContent = JSON.stringify(location)
    const nodeMeta = {
      id: createNodeId(`location-${location.hviid}`),
      parent: null,
      children: [],
      internal: {
        type: `Location`,
        content: nodeContent,
        contentDigest: createContentDigest(location),
      },
    }
    const node = Object.assign({}, location, nodeMeta)
    createNode(node)
  })

  // Fetch all news data
  const baseUrl = `http://api.${estadoSlug}.turista.com.mx/noticia`
  const allNoticias = await fetchAllNoticias(baseUrl)

  // Create nodes for each news item
  allNoticias.forEach((noticia) => {
    const nodeContent = JSON.stringify(noticia)
    const nodeMeta = {
      id: createNodeId(`noticia-${noticia.sid}`),
      parent: null,
      children: [],
      internal: {
        type: `Noticia`,
        content: nodeContent,
        contentDigest: createContentDigest(noticia),
      },
    }
    const node = Object.assign({}, noticia, nodeMeta)
    createNode(node)
  })

  // Create a node for total news count
  const totalNewsInfo = {
    total_items: allNoticias.length
  }
  createNode({
    ...totalNewsInfo,
    id: createNodeId(`noticia-total`),
    parent: null,
    children: [],
    internal: {
      type: `NoticiaTotal`,
      content: JSON.stringify(totalNewsInfo),
      contentDigest: createContentDigest(totalNewsInfo),
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postPerPage = 16
  const hotelsPerPage = 12
  const estadoSlug = process.env.ESTADO_SLUG

  // ** crea el index
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/index-template.js`),
    context: {
      estadoSlug: estadoSlug,
    },
  })

  // Aquí puedes agregar más lógica para crear otras páginas basadas en templates y consultas a la API
}