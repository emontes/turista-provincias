const path = require('path')
const fetch = require('node-fetch')

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