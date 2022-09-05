require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const estadoSlug = process.env.ESTADO_SLUG
const siteData = require(`./src/constants/configs/${estadoSlug}/siteData`)

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    'hotel-hotellook',
    'hotel-location',
    'estado',
    'location',
    'noticia',
    'topic',
    'section',
    'section-article',
    'link',
    'link-category',
  ],
  singleTypes: [],
}

module.exports = {
  siteMetadata: siteData.siteMetadata,
  plugins: [
    'gatsby-plugin-htaccess', // Para que haga las redirecciones en Apache2
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    siteData.googleAnalytics,
    siteData.manifest,
    `gatsby-plugin-offline`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-mdx`,
    siteData.sourceFileSystem,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },

    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.ESTADO_SLUG,
        queries: require('./src/constants/algolia'),
        chunkSize: 10000,
      },
    },
  ],
}
