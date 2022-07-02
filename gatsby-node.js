const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postPerPage = 16
  const hotelsPerPage = 12
  const estadoSlug = process.env.ESTADO_SLUG

  console.log('Creando estrucutra para: ', estadoSlug)
  // ** crea el index
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/index-template.js`),
    context: {
      estadoSlug: estadoSlug,
    },
  })

  /* ---------------------------------
     ------------ Hoteles --------------
     --------------------------------*/

  // ** Crea pagina principal de Hoteles
  createPage({
    path: `/hoteles`,
    component: path.resolve(`./src/templates/hoteles/index-template.js`),
    context: {
      estadoSlug: estadoSlug,
    },
  })

  const globalPages1 = ['mapa', 'ofertas', 'economicos', 'completos', 'grandes']
  const globalPages = ['economicos', 'grandes']

  globalPages.map(async (item) => {
    createPage({
      path: `/hoteles/${item}/global`,
      component: path.resolve(
        `./src/templates/hoteles/global/${item}-template.js`,
      ),
      context: {
        item: item,
        estadoSlug: estadoSlug,
      },
    })
  })

  const resultDestinos = await graphql(`
    {
      locations: allStrapiHotelLocation(
        filter: { location: { estado: { slug: { eq: "${estadoSlug}" } } } }
        sort: { fields: numhoteles, order: DESC }
      ) {
        nodes {
          id: hotellookId
          slug
          location {
            name
          }
        }
      }
    }
  `)

  const destinos = resultDestinos.data.locations.nodes

  const locationPages = [
    'lista',
    'mapa',
    'ofertas',
    'economicos',
    'populares',
    'valorados',
    'completos',
    'grandes',
    'travel',
  ]

  let destinosBlock = []
  destinos.map((item) => {
    let destino = { title: item.location.name, slug: item.slug, id: item.id }
    destinosBlock.push(destino)
  })

  destinos.map(async (item) => {
    // Query para sabar cuantos tipos y cuales de estrellas hay en cada destino
    const resultEstrellas = await graphql(`
      {
        hoteles: allStrapiHotelHotellook(          
          filter: {
            cityId: { eq: "${item.id}" }
            stars: { gt: 0 }            
          }          
        ) {
          distinct(field: stars)          
        }
      }
    `)
    const diferentesEstrellas = resultEstrellas.data.hoteles.distinct.reverse()

    console.log('Hoteles zona', item.slug)

    /* Crea la página principal del destion 
       (pjemplo hoteles-palenque-5)                */
    createPage({
      path: `/${item.slug}.html`,
      component: path.resolve(
        './src/templates/hoteles/locations/home-template.js',
      ),
      context: {
        id: item.id,
        slug: item.slug,
        destinos: destinosBlock,
        estrellas: diferentesEstrellas,
        perPage: hotelsPerPage,
      },
    })

    // ** Paginas de estrellitas

    diferentesEstrellas.forEach(async (estrellas) => {
      createPage({
        path: `${item.slug}-estrellas-${estrellas}.html`,
        component: path.resolve(
          './src/templates/hoteles/locations/estrellas-template.js',
        ),
        context: {
          id: item.id,
          slug: item.slug,
          destinos: destinosBlock,
          estrellas: parseInt(estrellas),
          diferentesEstrellas: diferentesEstrellas,
          estadoSlug: estadoSlug,
          perPage: hotelsPerPage,
        },
      })
    })

    // Crea las páginas específicas (listado, mapa, económicos, etc)
    locationPages.map(async (page) => {
      createPage({
        path: `/${item.slug}-${page}.html`,
        component: path.resolve(
          `./src/templates/hoteles/locations/${page}-template.js`,
        ),
        context: {
          id: item.id,
          slug: item.slug,
          destinos: destinosBlock,
          perPage: hotelsPerPage,
        },
      })
    })
  })

  /* ---------------------------------
     ------------ Links --------------
     --------------------------------*/
  const resultLinks = await graphql(`
    {
      categories: allStrapiLinkCategory(
        filter: {estado: {slug: {eq: "${estadoSlug}"}}}
      ) {
        nodes {
          id
          title
          slug
          slugOld
          link_categories {
            strapi_id
            slug
          }
        }
      }
    }
  `)

  const links = resultLinks.data.categories.nodes
  const estadoRoots = {
    chiapas: 'link-40.html',
    edomexico: 'link-41.html',
    yucatan: 'link-18.html',
  }

  let linksRoot = []
  //Crea las páginas de las Links
  links.map(async (item) => {
    let slug = item.slug
    // Esto para los links de provincia (por ejemplo chiapas, se les pone old slug y el slug como link-chis-1)
    // if (item.slugOld) slug = item.slugOld /* Desechamos esta opcion por que no vale la pena el esfuerzo para recupear tan pocas categoráis

    console.log('Creando página de Links: ', slug)
    createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/links/links-template.js'),
      context: {
        id: item.id,
        slug: item.slug,
      },
    })

    //Este if es para cuando se trata de México Global
    //if (item.link_categories.length === 0) linksRoot.push(item)

    if (item.link_categories[0].slug === estadoRoots[estadoSlug])
      linksRoot.push(item)
  })

  //Crea página del Index de Directorio (links)
  createPage({
    path: `/links.html`,
    component: path.resolve('./src/templates/links/index-template.js'),
    context: {
      linksRoot: linksRoot,
    },
  })

  /* ---------------------------------------------------
     ------------ Información (Sections)  --------------
     ---------------------------------------------------*/
  // *** Create Sections Pages ***
  console.log('Creando páginas de Secciones de Información')
  const resultSections = await graphql(`
    {
      parents: allStrapiSectionArticle(
        filter: { estado: { slug: { eq: "${estadoSlug}" } } }
      ) {
        distinct(field: sections___strapi_parent___slug)
      }
      allStrapiSectionArticle(filter: { estado: { slug: { eq: "${estadoSlug}" } } }) {
        distinct(field: sections___slug)
      }
    }
  `)

  const sections = resultSections.data.parents.distinct
  const sections2 = resultSections.data.allStrapiSectionArticle.distinct

  sections2.map((item) => {
    if (!sections.includes(item)) sections.push(item)
  })

  // Obtiene datos de las Secciones
  let sectionsFull = []
  let sectionsMaster = []
  sections.map(async (item) => {
    console.log('Obteniendo datos de Section: ', item)
    const result = await graphql(`
      {
        strapiSection(
          
          slug: { eq: "${item}" }
        ) {
          title
          slug
          strapi_parent {
            slug
          }
        }
      }
    `)
    sectionsFull.push(result.data.strapiSection)
    if (!result.data.strapiSection.strapi_parent)
      sectionsMaster.push(result.data.strapiSection)
  })

  // ** Crea el index de información
  createPage({
    path: `/informacion`,
    component: path.resolve(`./src/templates/informacion/index-template.js`),
    context: {
      sections: sectionsFull,
      sectionsMaster: sectionsMaster,
    },
  })

  //Crea las páginas de Secciones
  sections.map(async (item) => {
    createPage({
      path: `/informacion/${item}`,
      component: path.resolve(
        './src/templates/informacion/section-template.js',
      ),
      context: {
        slug: item,
        sections: sections,
        sectionsMaster: sectionsMaster,
        estadoSlug: estadoSlug,
      },
    })
  })

  // ** Crea las páginas de Todos los Artículos en Secciones

  const resultSectionArticle = await graphql(
    `
      {
        strapiSection {
          title
          slug
        }
        allStrapiSectionArticle(
          filter: { estado: { slug: { eq: "${estadoSlug}" } } }
        ) {
          nodes {
            id
            slug
          }
        }
      }
    `,
  )

  const sectionArticles =
    resultSectionArticle.data.allStrapiSectionArticle.nodes
  console.log('Creando páginas individuales de Sections Articles.....')
  if (sectionArticles.length > 0) {
    sectionArticles.forEach((article) => {
      // console.log('Creando', article.slug)
      createPage({
        path: `/info/${article.slug}`,
        component: path.resolve(
          './src/templates/informacion/article-template.js',
        ),
        context: {
          id: article.id,
          slug: article.slug,
          sections: sectionsFull,
          sectionsMaster: sectionsMaster,
        },
      })
    })
  }

  /* ---------------------------------------
     ------------ Noticias  --------------
     --------------------------------------*/

  const filtroMexico = 'filter: { estado: {Name: {nin: [ "Chiapas"] }}}' // excluye chiapas
  const filtroChiapas = 'filter: { estado: { Name: { eq: "Chiapas" } } }'

  // ** Crea el ïndice de topics (ddonde lista los topics que hay)
  createPage({
    path: `/noticias/tema`,
    component: path.resolve(`./src/templates/noticias/topic-index-template.js`),
    context: {
      estadoSlug: estadoSlug,
    },
  })

  // *** Create Categories Pages ***
  console.log('Creando páginas de Categorías de noticias')
  const resultCategories = await graphql(`
    {
      allStrapiNoticia(filter: { estado: { slug: { eq: "${estadoSlug}" } } }) {
        distinct(field: location___slug)
      }
    }
  `)

  const categories = resultCategories.data.allStrapiNoticia.distinct

  // Obtiene datos de Categorías
  let categoriesFull = []
  categories.map(async (item) => {
    console.log('Obteniendo datos de Categoria: ', item)
    const result = await graphql(`
      {
        strapiLocation(
          estado: { slug: { eq: "${estadoSlug}" } }
          slug: { eq: "${item}" }
        ) {
          name
          slug
        }
      }
    `)
    categoriesFull.push(result.data.strapiLocation)
  })

  categories.map(async (item) => {
    const result = await graphql(`
     {
      allStrapiNoticia(
        limit: ${postPerPage}
        filter: {
          estado: { slug: { eq: "${estadoSlug}" } }
          location: { slug: {eq: "${item}" } }
        }
    ) {
    pageInfo {
          pageCount
        }
    }
    }`)
    const topicPages = result.data.allStrapiNoticia.pageInfo.pageCount
    console.log('Category (item) ===> ', item)
    console.log('Cuantos paginos:', topicPages)

    for (var i = 0; i < topicPages; i++) {
      createPage({
        path: i === 0 ? `/noticias/${item}` : `/noticias/${item}/${i + 1}`,

        component: path.resolve(
          './src/templates/noticias/category-template.js',
        ),
        context: {
          limit: postPerPage,
          skip: i * postPerPage,
          slug: item,
          topics: topicsFull,
          categories: categoriesFull,
          estadoSlug: estadoSlug,
        },
      })
    }
  })

  // *** Crea las páginas de los Temas ***

  console.log('Creando páginas de Temas de Noticias')
  const resultTopics = await graphql(`
    {
      allStrapiNoticia(filter: { estado: { slug: { eq: "${estadoSlug}" } } }) {
        distinct(field: topics___slug)
      }
    }
  `)

  const topics = resultTopics.data.allStrapiNoticia.distinct

  // Obtiene los datos de los topics (Nombre, url, imagen)

  let topicsFull = []
  topics.map(async (item) => {
    const result = await graphql(`{
      strapiTopic(slug: {eq: "${item}"}) {
        Title
        slug
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    `)
    topicsFull.push(result.data.strapiTopic)
  })

  topics.map(async (item) => {
    const resultTopic = await graphql(`
     {
      allStrapiNoticia(
        limit: ${postPerPage}
        filter: {
          estado: { slug: { eq: "${estadoSlug}" } }
          topics: { elemMatch: { slug: { eq: "${item}" } } }
        }
    ) {
    pageInfo {
          pageCount
        }
    }
    }`)
    const topicPages = resultTopic.data.allStrapiNoticia.pageInfo.pageCount
    console.log('Topic (item) ===> ', item)
    console.log('Cuantos paginos:', topicPages)
    for (var i = 0; i < topicPages; i++) {
      createPage({
        path:
          i === 0
            ? `/noticias/tema/${item}`
            : `/noticias/tema/${item}/${i + 1}`,

        component: path.resolve('./src/templates/noticias/topic-template.js'),
        context: {
          limit: postPerPage,
          skip: i * postPerPage,
          slug: item,
          topics: topicsFull,
          categories: categoriesFull,
          estadoSlug: estadoSlug,
        },
      })
    }
  })

  // ** Crea páginas de cada noticia **

  console.log('Creando páginas para cada noticia')
  const result = await graphql(
    `
      {
        allStrapiNoticia(
          filter: { estado: { slug: { eq: "${estadoSlug}" } } }
          sort: { fields: date, order: ASC }
        ) {
          nodes {
            id
            slug
            slugOld
            dateslug: date(formatString: "yy/M")
          }
        }
      }
    `,
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi Noticias`,
      result.errors,
    )

    return
  }

  // Define a template for noticia post
  const articlePost = path.resolve(
    './src/templates/noticias/noticia-template.js',
  )

  const articles = result.data.allStrapiNoticia.nodes
  console.log('Creando páginas individuales de artículos.....')
  if (articles.length > 0) {
    articles.forEach((article) => {
      let path = `/${article.dateslug}/${article.slug}`

      if (article.slugOld) {
        path = article.slugOld
      }
      console.log('Creando', path)
      createPage({
        path: path,
        component: articlePost,
        context: {
          id: article.id,
          slug: path,
          topics: topicsFull,
          categories: categoriesFull,
          estadoSlug: estadoSlug,
        },
      })
    })

    //Create noticas pages

    const numPages = Math.ceil(articles.length / postPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      // console.log('Creando Pagina de Noticias:', i)
      createPage({
        path: i === 0 ? `/noticias` : `/noticias/ultimas/${i + 1}`,
        component: path.resolve(
          './src/templates/noticias/noticias-template.js',
        ),
        context: {
          limit: postPerPage,
          skip: i * postPerPage,
          topics: topicsFull,
          categories: categoriesFull,
          estadoSlug,
        },
      })
    })
  }
}
