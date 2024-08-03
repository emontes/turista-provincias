const path = require("path");
const createNodes = require("./create-nodes");

exports.sourceNodes = async (params) => {
	console.log("Iniciando sourceNodes");
	try {
		console.log("Volviendo a crear nodos");
		await createNodes(params);
		console.log("Nodos creados exitosamente");
	} catch (error) {
		console.error("Error al crear nodos:", error);
	}
	console.log("Finalizando sourceNodes");
};

exports.createPages = async ({ graphql, actions }) => {
	console.log("Iniciando createPages");
	const { createPage } = actions;
	const postPerPage = 16;
	const hotelsPerPage = 12;
	const estadoSlug = process.env.ESTADO_SLUG;

	console.log("Estado Slug:", estadoSlug);

	// ** crea el index
	createPage({
		path: `/`,
		component: path.resolve(`./src/templates/index-template.js`),
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
      allNoticia {
        group(field: topictext) {
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
	topics.forEach((topic) => {
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
			},
		});
	});

	// Crea la página de índice de temas
	createPage({
		path: `/noticias/tema`,
		component: path.resolve("./src/templates/noticias/topic-index-template.js"),
		context: {
			topics: topics,
		},
	});

	// *** Create Categories Pages ***
	const resultCategories = await graphql(`
  {
    allNoticia {
      group(field: cattitle) {
        fieldValue
        totalCount
      }
    }
  }
`);

	const categories = resultCategories.data.allNoticia.group;

	categories.forEach((category) => {
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
				},
			});
		});
	});

  // Create noticias pages para todas las noticias
const resultNoticias = await graphql(`
  {
    allNoticia {
      totalCount
    }
  }
`)

const numPages = Math.ceil(resultNoticias.data.allNoticia.totalCount / postPerPage)

Array.from({ length: numPages }).forEach((_, i) => {
  createPage({
    path: i === 0 ? `/noticias.html` : `/noticias/ultimas/${i + 1}.html`,
    component: path.resolve('./src/templates/noticias/noticias-template.js'),
    context: {
      limit: postPerPage,
      skip: i * postPerPage,
      currentPage: i + 1,
      totalPages: numPages,
    },
  })
})

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
