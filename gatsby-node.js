// gatsby-node.js

const path = require("node:path");
const fs = require("node:fs");
const { createNodes } = require("./create-nodes");
const fetch = require("node-fetch");
const {
	vistaToUrlHtml,
	vistaStarsToUrl,
  vistaActionToUrlHtml,
	hotelToUrlHtml,
} = require("./src/utilities/stringService.cjs");

exports.sourceNodesOld = async (params, { parentSpan }) => {
	const { actions, createNodeId, createContentDigest, getCache } = params;
	const { createNode, touchNode } = actions;

	console.log("Iniciando sourceNodes");
	try {
		const cache = getCache("custom-source-nodes");
		const lastFetchTime = (await cache.get("lastFetchTime")) || null;
		console.log("Última fecha de fetching:", lastFetchTime);

		console.log("Volviendo a crear nodos");
		const newFetchTime = await createNodes(params, lastFetchTime);
		console.log("Nodos creados exitosamente");

		await cache.set("lastFetchTime", newFetchTime);
		console.log("Nueva fecha de fetching guardada:", newFetchTime);
	} catch (error) {
		console.error("Error al crear nodos:", error);
		throw error;
	}
	console.log("✅ Finalizando sourceNodes");
};

exports.sourceNodes = async (params, { parentSpan }) => {
	const { actions, createNodeId, createContentDigest } = params;
	const { createNode } = actions;

	console.log("Iniciando sourceNodes");
	try {
		// Elimina la lógica del cache y siempre crea nodos nuevos
		console.log("Creando nodos");
		const newFetchTime = await createNodes(params, null); // Ya no necesitas `lastFetchTime`
		console.log("Nodos creados exitosamente");

		// No necesitas guardar la fecha del nuevo fetch
		console.log("Fetch completado sin uso de caché");
	} catch (error) {
		console.error("Error al crear nodos:", error);
		throw error;
	}
	console.log("✅ Finalizando sourceNodes");
};

exports.createPages = async ({ graphql, actions }) => {
	console.log("Iniciando createPages");
	const { createPage } = actions;
	const postPerPage = 16;
	const hotelsPerPage = 12;
	const estadoSlug = process.env.GATSBY_ESTADO_SLUG;

	console.log("Estado Slug:", estadoSlug);

	//#region crea el index
	createPage({
		path: "/",
		component: path.resolve("./src/templates/index-template.js"),
		context: {
			estadoSlug: estadoSlug,
		},
	});
	console.log("Página de índice creada");

	//#endregion

	/* ---------------------------------------
	 ------------ Hoteles  --------------	
	 --------------------------------------*/

	//#region Hoteles

	// Crea la página de índice de hoteles
	createPage({
		path: "/hoteles",
		component: path.resolve("./src/templates/hoteles/index-template.js"),
		context: {
			estadoSlug: estadoSlug,
		},
	});

	const globalPages1 = [
		"mapa",
		"ofertas",
		"economicos",
		"completos",
		"grandes",
	];
	const globalPages = ["economicos", "grandes"];

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
		});
	});

	//#region crea las páginas de los destinos

	const resultDestinos = await graphql(`
  query {
    allLocation(filter: { travelpayoutsid: { ne: null } }) {
      totalCount
      nodes {
        hviid
        alias
        hvi_desc_spanish
        banner_spanish
        numhoteles
        travelpayoutsid
      }
    }
  }
`);

	const destinos = resultDestinos.data.allLocation.nodes;

	const locationPages = [
		"lista",
		"mapa",
		"ofertas",
		"economicos",
		"populares",
		"valorados",
		"completos",
		"grandes",
		"travel",
	];

	for (const destino of destinos) {
		// Crea la página principal del destino
		console.log("Destino:", vistaToUrlHtml(destino, "spanish"));

		createPage({
			path: vistaToUrlHtml(destino, "spanish"),
			component: path.resolve(
				"./src/templates/hoteles/locations/home-template.js",
			),
			context: {
				destino: destino,
				id: destino.hviid,
				destinos: destinos,
				perPage: hotelsPerPage,
			},
		});

		// ** Páginas de Estrellas
		const resultEstrellas = await graphql(`
    query {
      allHotel(
        filter: {
          vista: { eq: "${destino.hviid}" },
          visible: { eq: "1" },
          travelpayoutsid: { ne: null },
          rating: { gt: 0 }
        }
      ) {
        distinct(field: { rating: SELECT })
      }
    }
  `);

		const diferentesEstrellas = resultEstrellas.data.allHotel.distinct;
		const diferentesEstrellasInvertidas = [...diferentesEstrellas].reverse();

		for (const estrella of diferentesEstrellas) {
			console.log("Estrella:", vistaStarsToUrl(destino, "spanish", estrella));
			const estrellaInt = Number.parseInt(estrella, 10);
			createPage({
				path: vistaStarsToUrl(destino, "spanish", estrella),
				component: path.resolve(
					"./src/templates/hoteles/locations/estrellas-template.js",
				),
				context: {
					destino: destino,
					id: destino.hviid,
					estrellas: estrellaInt,
					diferentesEstrellas: diferentesEstrellasInvertidas,
					destinos: destinos,
					perPage: hotelsPerPage,
				},
			});
		}

		// ** Páginas por cada tipo en locationPages
		locationPages.map((pageType) => {
			const pagePath2 = `/hoteles/${destino.alias}/${pageType}`;
      const pagePath = vistaActionToUrlHtml(destino, 'spanish', pageType)
			console.log("Page Type:", pagePath);

			createPage({
				path: pagePath,
				component: path.resolve(
					`./src/templates/hoteles/locations/${pageType}-template.js`,
				),
				context: {
					destino: destino,
					id: destino.hviid,
					pageType: pageType,
					destinos: destinos,
					perPage: hotelsPerPage,
				},
			});
		});
	}

	//#endregion

	//#endregion

	/* ---------------------------------------
     ------------ Noticias  --------------
     --------------------------------------*/
	//#region Noticias

	// *** Crea las páginas de los Temas ***
	const resultTopics = await graphql(`
    {
      allNoticia(sort: { time: DESC }) {
        group(field: { topictext: SELECT }) {
          fieldValue
          totalCount
          nodes {
            topicimage
          }
        }
      }
    }
  `);

	const topics = resultTopics.data.allNoticia.group;

	// Crea una página para cada tema

	for (const topic of topics) {
		const slug = topic.fieldValue
			.replace(/\s+/g, "_")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		createPage({
			path: `/noticias/tema/${slug}.html`,
			component: path.resolve("./src/templates/noticias/topic-template.js"),
			context: {
				topic: topic.fieldValue,
				topicImage: topic.nodes[0].topicimage,
				totalCount: topic.totalCount,
				alanguage: "spanish",
				topics: topics,
			},
		});
	}

	// Crea la página de índice de temas
	createPage({
		path: "/noticias/tema",
		component: path.resolve("./src/templates/noticias/topic-index-template.js"),
		context: {
			topics: topics,
		},
	});

	// *** Create Categories Pages ***
	const resultCategories = await graphql(`
    {
      allNoticia {
        group(field: { cattitle: SELECT }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

	const categories = resultCategories.data.allNoticia.group;

	for (const category of categories) {
		const slug = category.fieldValue
			.replace(/\s+/g, "_")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		const totalPages = Math.ceil(category.totalCount / postPerPage);

		Array.from({ length: totalPages }).forEach((_, i) => {
			createPage({
				path:
					i === 0
						? `/noticias/${slug}.html`
						: `/noticias/${slug}/${i + 1}.html`,
				component: path.resolve(
					"./src/templates/noticias/category-template.js",
				),
				context: {
					limit: postPerPage,
					skip: i * postPerPage,
					category: category.fieldValue,
					totalPages,
					currentPage: i + 1,
					categories: categories,
				},
			});
		});
	}

	// Create noticias pages para todas las noticias
	const resultNoticias = await graphql(`
    {
      allNoticia {
        nodes {
          id
          sid
          topicimage
        }
        totalCount
      }
    }
  `);

	const numPages = Math.ceil(
		resultNoticias.data.allNoticia.totalCount / postPerPage,
	);

	Array.from({ length: numPages }).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/noticias.html` : `/noticias/ultimas/${i + 1}.html`,
			component: path.resolve("./src/templates/noticias/noticias-template.js"),
			context: {
				limit: postPerPage,
				skip: i * postPerPage,
				currentPage: i + 1,
				totalPages: numPages,
				topics: topics,
				categories: categories,
			},
		});
	});

	/**
	 * NOTICIAS Crea una página para cada noticia
	 */

	const articlePost = path.resolve(
		"./src/templates/noticias/noticia-template.js",
	);
	const allNoticiasNodes = resultNoticias.data.allNoticia.nodes;

	// Crear una página para cada noticia
	let contador = 0;
	for (const noticia of allNoticiasNodes) {
		const path = `article${noticia.sid}.html`;

		try {
			// Obtener los datos completos de la noticia
			// const noticiaCompleta = await getNoticiaCompleta(noticia.sid);
			contador++;
			if (contador % 40 === 0 || contador === 1) {
				console.log(
					`Creando Noticia: ${noticia.sid} => ${contador} de ${allNoticiasNodes.length}`,
				);
			}

			createPage({
				path: path,
				component: articlePost,
				context: {
					id: noticia.id,
					topics: topics,
					topicimage: noticia.topicimage,
					categories: categories,
				},
			});
		} catch (error) {
			console.error(
				`❌ Error al obtener datos para la noticia ${noticia.sid}:`,
				error,
			);
		}
	}
	console.log(`✅ Total de noticias creadas: ${contador}`);
	//#endregion

	/* --------------------------------------------------
     ------------ Información (Sections)  ---------------
     --------------------------------------------------*/
	//#region Información (Sections)

	const resultSectionParents = await graphql(`
    {
      allSection(filter: { parentid: { eq: "0" } }) {
        nodes {
          secid
          secname
          color
          metadescrip
        }
      }
    }
  `);

	const parentSections = resultSectionParents.data.allSection.nodes;

	// ** Crea el index de información
	createPage({
		path: "/informacion",
		component: path.resolve("./src/templates/informacion/index-template.js"),
		context: {
			sections: parentSections,
		},
	});

	// Crea páginas para cada sección
	const resultSection = await graphql(`
    {
      allSection {
        nodes {
          secid
          secname
          parentid
        }
      }
    }
  `);

	const sections = resultSection.data.allSection.nodes;

	for (const section of sections) {
		const slug = section.secname
			// .toLowerCase() // Convertir a minúsculas
			.replace(/\s+/g, "_") // Reemplazar espacios con guiones bajos
			.normalize("NFD") // Normalizar para separar caracteres diacríticos
			.replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
			.replace(/[¿?]/g, "") // Eliminar caracteres especiales específicos
			.replace(/[^\w_-]/g, ""); // Eliminar cualquier carácter que no sea alfanumérico, guion bajo o guion,

		createPage({
			path: `/informacion/${slug}`,
			component: path.resolve(
				"./src/templates/informacion/section-template.js",
			),
			context: {
				slug: slug,
				secid: section.secid,
				parentid: section.parentid,
				title: section.secname,
				sectionsMaster: parentSections,
			},
		});
	}

	// Crea páginas para cada Section Article
	const resultSectionArticles = await graphql(`
    {
      allSectionArticle {
        nodes {
          artid
          title
          secid
        }
      }
    }
  `);

	const sectionArticles = resultSectionArticles.data.allSectionArticle.nodes;

	for (const article of sectionArticles) {
		const slug = article.title
			.replace(/\s+/g, "_")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		createPage({
			path: `/info/${slug}`,
			component: path.resolve(
				"./src/templates/informacion/article-template.js",
			),
			context: {
				artid: article.artid,
				secid: article.secid,
				title: article.title,
				sectionsMaster: parentSections,
				sections: sections,
			},
		});
	}

	//#endregion

	/* --------------------------------------------------
     ------------ Links  ---------------
     --------------------------------------------------*/

	//#region Links

	const resultLinkCategoryRoot = await graphql(`
    {
      allLinkCategory(filter: { parentid: { eq: "0" } }) {
        nodes {
          cid
          parentid
          title
        }
      }
    }
  `);

	const linksRoot = resultLinkCategoryRoot.data.allLinkCategory.nodes;

	// ** Crea el index de links
	createPage({
		path: "/links.html",
		component: path.resolve("./src/templates/links/index-template.js"),
		context: {
			linksRoot: linksRoot,
		},
	});

	// Crea páginas para cada Link Category
	const resultLinkCategory = await graphql(`
    {
      allLinkCategory {
        nodes {
          cid
          parentid
          title
        }
      }
    }
  `);

	const linkCategories = resultLinkCategory.data.allLinkCategory.nodes;

	for (const linkCategory of linkCategories) {
		const slug = `link-${linkCategory.cid}.html`;
		createPage({
			path: `/${slug}`,
			component: path.resolve("./src/templates/links/links-template.js"),
			context: {
				cid: linkCategory.cid,
				parentid: linkCategory.parentid,
				title: linkCategory.title,
				linksRoot: linksRoot,
			},
		});
	}

	//#endregion

	console.log("Finalizando createPages");
};

// Añade este hook para ver cuándo se inicia el proceso de construcción
exports.onPreBootstrap = () => {
	console.log("Gatsby está iniciando el proceso de construcción");
};

// Añade este hook para ver cuándo finaliza el proceso de construcción
exports.onPostBuild = () => {
	console.log("Gatsby ha finalizado el proceso de construcción");
};

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
	  type Location implements Node {
		hviid: String
		parentid: String
		travelpayoutsid: String
		bdid: String
		bdiddestino: String
		alias: String
		estado: String
		hvi_desc_english: String
		hvi_desc_spanish: String
		banner_spanish: String
		banner_english: String
		latitud: String
		longitud: String
		destacado: String
		numhoteles: Int
		hijas: [Location] @link(from: "hijas___NODE")
		parentLocation: Location @link(from: "parentLocation___NODE")
	  }
	`;
	createTypes(typeDefs);
};
