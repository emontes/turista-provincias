const siteData = {
  siteMetadata: {
    title: 'El Turista Estado de México',
    description:
      'El Turista Estado de México cuenta con las herramientas necesarias para que los turistas puedan planear su viaje por el Estado de México.',
    titleTemplate: `%s | Turista Estado de México`,
    url: `https://edomexico.turista.com.mx`,
    siteUrl: `https://edomexico.turista.com.mx`,
    twitterUsername: `@turistamexico`,
    image: `/edomexico/portada-1.jpg`,
    estado: {
      name: 'Estado de México',
      slug: 'edomexico',
      slogan: 'Con el mejor Estado de Ánimo',
    },
  },
  googleAnalytics: {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-693957-8',
    },
  },
  manifest: {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/assets/images/edomexico/icon.png',
    },
  },
  sourceFileSystem: {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/assets/images/edomexico/',
    },
    __key: 'images',
  },
}

module.exports = siteData
