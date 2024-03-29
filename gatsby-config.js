require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const estadoSlug = process.env.ESTADO_SLUG
const siteData = require(`./src/constants/configs/${estadoSlug}/siteData`)
const { languages, defaultLanguage } = require('./languages.js')

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    'hotel-hotellook',
    'hotel-location',
    'estado',
    'location',
    // 'noticia',
    {
      singularName: 'noticia',
      pluginOptions: {
        i18n: {
          locale: 'all',
        },
      },
    },
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages,
        defaultLanguage,
        siteUrl: `https://turista.com.mx`,
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
        },
        pages: [
          {
            matchPath: '/:lang?/article:id?',
            getLanguageFromPath: true,
            excludeLanguages: ['en'],
          },
          {
            matchPath: '/:lang?/info/:id',
            excludeLanguages: ['en'],
          },
        ],
      },
    },
  ],
}
