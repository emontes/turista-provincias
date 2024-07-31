const path = require('path')
const { exit } = require('process')

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

}