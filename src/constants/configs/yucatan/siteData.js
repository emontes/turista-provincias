const siteData = {
  siteMetadata: {
    title: 'siteTitleYucatan',
    description: 'siteDescriptionYucatan',
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
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: ['G-WGT7JK0T5T'],
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
