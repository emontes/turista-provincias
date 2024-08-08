const fetch = require("node-fetch");

async function fetchAllData(baseUrl, fields = null, maxPages = Infinity) {
	let page = 1;
	let allData = [];
	let hasNextPage = true;

	while (hasNextPage && page <= maxPages) {
		console.log("Generando Página ", page);
		let url = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${page}`;
		if (fields) {
			url += `&fields=${fields.join(",")}`;
		}

		try {
			const response = await fetch(url, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				timeout: 60000, // 60 segundos de timeout
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (
				data._embedded &&
				Array.isArray(data._embedded[baseUrl.split("/").pop()])
			) {
				allData = allData.concat(data._embedded[baseUrl.split("/").pop()]);
			} else if (typeof data === "object" && !Array.isArray(data)) {
				allData = allData.concat(Object.values(data));
				hasNextPage = false;
			} else {
				allData = allData.concat(data);
				hasNextPage = false;
			}

			hasNextPage =
				hasNextPage && data._links && data._links.next !== undefined;
			page++;

			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error(`Error fetching data from ${url}:`, error);
			hasNextPage = false;
		}
	}

	return allData;
}

async function createNodes({ actions, createNodeId, createContentDigest }) {
	console.log("Iniciando creación de nodos");
	const { createNode, createNodeField } = actions;
	const estadoSlug = process.env.ESTADO_SLUG;

	// Leer la variable de entorno para el número máximo de páginas
	const maxPages = Number.parseInt(process.env.MAX_PAGES_FETCH) || Number.POSITIVE_INFINITY;
	console.log("Número máximo de páginas:", maxPages);

	try {
		/** LOCATIONS  (Vistas Estado 1 para Homepage */
		console.log("Obteniendo datos de locations");
		const locations = await fetchAllData(
			`http://api.${estadoSlug}.turista.com.mx/estado-vistas/1`,
		);
		console.log(`${locations.length} locations obtenidas`);

		

		/** INFORMACION */
		console.log("Obteniendo datos de informacion (SECTIONS)");
		const sections = await fetchAllData(
			`http://api.${estadoSlug}.turista.com.mx/sections`,[],maxPages
		);

		/** NOTICIAS */
		console.log("Obteniendo datos de noticias (sin bodytext)");
		const noticias = await fetchAllData(
			`http://api.${estadoSlug}.turista.com.mx/noticia`,
			["sid", "title", "time", "catid", "topic", "hometext"],
			maxPages,
		);
		console.log(`${noticias.length} noticias obtenidas`);

		console.log("Obteniendo datos de topics");
		const topics = await fetchAllData(
			`http://api.${estadoSlug}.turista.com.mx/topics`,
		);
		console.log(`${topics.length} topics obtenidos`);

		console.log("Obteniendo datos de categories");
		const categories = await fetchAllData(
			`http://api.${estadoSlug}.turista.com.mx/categories`,
		);
		console.log(`${categories.length} categories obtenidas`);

		// Create nodes for locations
		for (const location of locations) {
			const node = {
				...location,
				id: createNodeId(`location-${location.hviid}`),
				parent: null,
				children: [],
				internal: {
					type: "Location",
					content: JSON.stringify(location),
					contentDigest: createContentDigest(location),
				},
			};
			createNode(node);
		}

		// Create nodes for Sections
		for (const section of sections) {
			const node = {
				...section,
				id: createNodeId(`section-${section.secid}`),
				parent: null,
				children: [],
				internal: {
					type: "Section",
					content: JSON.stringify(section),
					contentDigest: createContentDigest(section),
				},
			};
			createNode(node);
		}

		// Create nodes for topics
		for (const topic of topics) {
			const node = {
				...topic,
				id: createNodeId(`topic-${topic.topicid}`),
				parent: null,
				children: [],
				internal: {
					type: "Topic",
					content: JSON.stringify(topic),
					contentDigest: createContentDigest(topic),
				},
			};
			createNode(node);
		};

		// Create nodes for categories
		for (const category of categories) {
			const node = {
				...category,
				id: createNodeId(`category-${category.catid}`),
				parent: null,
				children: [],
				internal: {
					type: "Category",
					content: JSON.stringify(category),
					contentDigest: createContentDigest(category),
				},
			};
			createNode(node);
		};

		for (const noticia of noticias) {
			const node = {
				...noticia,
				id: createNodeId(`noticia-${noticia.sid}`),
				parent: null,
				children: [],
				internal: {
					type: "Noticia",
					content: JSON.stringify(noticia),
					contentDigest: createContentDigest(noticia),
				},
			};
			createNode(node);

			createNodeField({
				node,
				name: "topic___NODE",
				value: createNodeId(`topic-${noticia.topic}`),
			});

			createNodeField({
				node,
				name: "category___NODE",
				value: createNodeId(`category-${noticia.catid}`),
			});
		}

		console.log("Finalizando creación de nodos");
	} catch (error) {
		console.error("Error en la creación de nodos:", error);
	}
}

module.exports = { fetchAllData, createNodes };
