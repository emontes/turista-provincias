// gatsby-node.js

const path = require("node:path");
const fs = require("node:fs");
const { createNodes } = require("./create-nodes");
const fetch = require("node-fetch");

exports.sourceNodes = async (params, { parentSpan }) => {
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

exports.createPages = async ({ graphql, actions }) => {
	console.log("Iniciando createPages");
	const { createPage } = actions;
	const postPerPage = 16;
	const hotelsPerPage = 12;
	const estadoSlug = process.env.GATSBY_ESTADO_SLUG;

	console.log("Estado Slug:", estadoSlug);

	// ** crea el index
	createPage({
		path: "/",
		component: path.resolve("./src/templates/index-template.js"),
		context: {
			estadoSlug: estadoSlug,
		},
	});
	console.log("Página de índice creada");

	/* ---------------------------------------
     ------------ Noticias  --------------
     --------------------------------------*/

	// *** Crea las páginas de los Temas ***
	const resultTopics = await graphql(`
    {
		allNoticia(sort: {time: DESC}) {
			group(field: {topictext: SELECT}) {
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
		group(field: {cattitle: SELECT}) {
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

	/* --------------------------------------------------
     ------------ Información (Sections)  ---------------
     --------------------------------------------------*/

	const resultSectionParents = await graphql(`	
	{
		allSection(filter: {parentid: {eq: "0"}}) {
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
		const slug = section.secname.replace(/\s+/g, "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
				const slug = article.title.replace(/\s+/g, "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

	/* --------------------------------------------------
     ------------ Links  ---------------
     --------------------------------------------------*/

	const resultLinkCategoryRoot = await graphql(`
		{
			allLinkCategory(
				filter: {parentid: {eq: "0"}}
			) {
				nodes {
				cid
				parentid
				title
				}
			}
		}
	`);

	const linksRoot = resultLinkCategoryRoot.data.allLinkCategory.nodes;
	console.log('Links Root:', linksRoot);

	// ** Crea el index de links
	createPage({
		path: "/links.html",
		component: path.resolve("./src/templates/links/index-template.js"),
		context: {
			linksRoot: linksRoot,
		},
	});

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
