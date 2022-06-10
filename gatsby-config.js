require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const siteData = require('./src/constants/configs/chiapas')

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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    siteData.sourceFileSystem,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: 'gatsby-plugin-social9-socialshare',
      options: {
        content: 'ae9c46e812cc4d8db2c068957c7c140b',
        async: true,
        defer: true,
      },
    },
  ],
}
