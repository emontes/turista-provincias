const path = require('path')
const createNodes = require('./create-nodes')

exports.sourceNodes = async (params) => {
  console.log('Iniciando sourceNodes')
  try {
    console.log('Volviendo a crear nodos')
    await createNodes(params)
    console.log('Nodos creados exitosamente')
  } catch (error) {
    console.error('Error al crear nodos:', error)
  }
  console.log('Finalizando sourceNodes')
}

exports.createPages = async ({ graphql, actions }) => {
  console.log('Iniciando createPages')
  const { createPage } = actions
  const postPerPage = 16
  const hotelsPerPage = 12
  const estadoSlug = process.env.ESTADO_SLUG

  console.log('Estado Slug:', estadoSlug)

  // ** crea el index
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/index-template.js`),
    context: {
      estadoSlug: estadoSlug,
    },
  })
  console.log('Página de índice creada')

  /* ---------------------------------------
     ------------ Noticias  --------------
     --------------------------------------*/

   // ** Crea el ïndice de topics (ddonde lista los topics que hay)
   createPage({
    path: `/noticias/tema`,
    component: path.resolve(`./src/templates/noticias/topic-index-template.js`),
    context: {
      estadoSlug: estadoSlug,
    },
  })


  console.log('Finalizando createPages')
}

// Añade este hook para ver cuándo se inicia el proceso de construcción
exports.onPreBootstrap = () => {
  console.log('Gatsby está iniciando el proceso de construcción')
}

// Añade este hook para ver cuándo finaliza el proceso de construcción
exports.onPostBuild = () => {
  console.log('Gatsby ha finalizado el proceso de construcción')
}