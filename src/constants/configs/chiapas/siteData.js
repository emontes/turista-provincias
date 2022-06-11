const siteData = {
  siteMetadata: {
    title: 'El Turista Chiapas',
    description:
      'El Turista Chiapas cuenta con las herramientas necesarias para que los turistas puedan planear su viaje por Chiapas.',
    titleTemplate: `%s | Turista Chiapas`,
    url: `https://chiapas.turista.com.mx`,
    siteUrl: `https://chiapas.turista.com.mx`,
    twitterUsername: `@turistamexico`,
    image: `/chiapas/portada-1.jpg`,
    estado: {
      name: 'Chiapas',
      slug: 'chiapas',
      slogan: 'El Espíritu del Mundo Maya',
    },
  },
  googleAnalytics: {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-693957-11',
    },
  },
  manifest: {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/assets/images/chiapas/icon.png',
    },
  },
  sourceFileSystem: {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/assets/images/chiapas/',
    },
    __key: 'images',
  },
}

module.exports = siteData
