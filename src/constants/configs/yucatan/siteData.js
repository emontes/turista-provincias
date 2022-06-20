const siteData = {
  siteMetadata: {
    title: 'El Turista Yucatán',
    description:
      'El Turista Yucatán cuenta con las herramientas necesarias para que los turistas puedan planear su viaje por Yucatán.',
    titleTemplate: `%s | Turista Yucatán`,
    url: `https://yucatan.turista.com.mx`,
    siteUrl: `https://yucatan.turista.com.mx`,
    twitterUsername: `@turistamexico`,
    image: `/yucatan/portada-1.jpg`,
    estado: {
      name: 'Yucatán',
      slug: 'yucatan',
      slogan: 'La tierra de los Elegidos',
    },
  },
  googleAnalytics: {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-693957-28',
    },
  },
  manifest: {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/assets/images/yucatan/icon.png',
    },
  },
  sourceFileSystem: {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/assets/images/yucatan/',
    },
    __key: 'images',
  },
}

module.exports = siteData
