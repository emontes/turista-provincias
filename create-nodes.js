// create-nodes.js
const fetch = require("node-fetch");

function getEmbeddedData(data, baseUrl) {
  if (!data._embedded) return null;

  const urlKey = baseUrl.split("/").pop();
  if (data._embedded[urlKey]) return data._embedded[urlKey];

  const underscoreKey = urlKey.replace(/-/g, '_');
  if (data._embedded[underscoreKey]) return data._embedded[underscoreKey];

  const possibleKey = Object.keys(data._embedded).find(key => key.includes(urlKey));
  if (possibleKey) return data._embedded[possibleKey];

  return null;
}

async function fetchAllData(
  baseUrl,
  maxPages = Number.POSITIVE_INFINITY,
  lastFetchTime = null,
) {
  let page = 1;
  let allData = [];
  let hasNextPage = true;
  console.log("Last Fetch Time: ", lastFetchTime);

  while (hasNextPage && page <= maxPages) {
    console.log(`Generando Nodos ${baseUrl} Página`, page);
    let url = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${page}`;

    if (lastFetchTime) {
      url += `&last_updated=${encodeURIComponent(lastFetchTime)}`;
      console.log("🔗 El url con last_updated es: ", url);
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

      const embeddedData = getEmbeddedData(data, baseUrl);
      if (embeddedData && Array.isArray(embeddedData)) {
        allData = allData.concat(embeddedData);
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
      console.error(`❌ Error fetching data from ${url}:`, error);
      hasNextPage = false;
    }
  }

  return allData;
}
async function createNodes(
	{ actions, createNodeId, createContentDigest, getNodesByType },
	lastFetchTime = null,
) {
	console.log("Iniciando creación de nodos");
	const { createNode, touchNode } = actions;
	const estadoSlug = process.env.GATSBY_ESTADO_SLUG;

	const maxPages =
		Number.parseInt(process.env.MAX_PAGES_FETCH) || Number.POSITIVE_INFINITY;
	console.log("Número máximo de páginas:", maxPages);

	const newFetchTime = new Date().toISOString();

  // Lista de campos a convertir
	const floatFields = ['lowestrate', 'otroCampoFloat'];
	const intFields = ['rating', 'cuartos', 'numhoteles'];

	try {
		// Función helper para actualizar o crear nodos
		const updateOrCreateNodes = async (fetchFunction, nodeType, idField) => {
			const existingNodes = getNodesByType(nodeType);
			const updatedData = await fetchFunction();

			console.log(
				`${nodeType}: Existentes: ${existingNodes.length}, Actualizados: ${updatedData.length}`,
			);

			const existingNodesMap = new Map(
				existingNodes.map((n) => [n[idField], n]),
			);

			for (const item of updatedData) {
				
				const nodeId = createNodeId(
					`${nodeType.toLowerCase()}-${item[idField]}`,
				);

        	// Convertir campos float
			floatFields.forEach(field => {
				if (item[field] !== undefined && !isNaN(parseFloat(item[field]))) {
				  item[field] = Number.parseFloat(item[field]);
				} else {
				  item[field] = 0; // Asignar un valor predeterminado si el valor no es válido
				}
			  });

			// Convertir campos integer
			intFields.forEach(field => {
				if (item[field] !== undefined && !isNaN(parseInt(item[field], 10))) {
				  item[field] = parseInt(item[field], 10);
				} else {
				  item[field] = 0; // Asignar un valor predeterminado si el valor no es válido
				}
			  });

				// Si el tipo es SectionArticle, obtenemos el content
				if (nodeType === "SectionArticle") {
					const content = await fetchArticleContent(estadoSlug, item[idField]);
					item.content = content;
				}

				if (existingNodesMap.has(item[idField])) {
					const existingNode = existingNodesMap.get(item[idField]);
					touchNode(existingNode);
				}

        if (typeof item !== 'object' || item === null) {
          console.error(`Item inválido para ${nodeType} ${idField}:`, item);
          return;
        }
				createNode({
					...item,
					id: nodeId,
					parent: null,
					children: [],
					internal: {
						type: nodeType,
						content: JSON.stringify(item),
						contentDigest: createContentDigest(item),
					},
				});
				existingNodesMap.delete(item[idField]);
			}

			for (const [, node] of existingNodesMap) {
				touchNode(node);
			}

			console.log(
				`${nodeType}: Nodos no actualizados: ${existingNodesMap.size}`,
			);
		};

    // Hoteles
    await updateOrCreateNodes(
      () =>
        fetchAllData(
          `http://api.${estadoSlug}.turista.com.mx/hotel`,
          maxPages,
          lastFetchTime,
        ),
      "Hotel",
      "hotelid",
    )

		// Locations
		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/estado-vistas/1`,
					maxPages,
					lastFetchTime,
				),
			"Location",
			"hviid",
		);

		// Sections
		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/sections`,
					maxPages,
					lastFetchTime,
				),
			"Section",
			"secid",
		);

		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/articles`,
					maxPages,
					lastFetchTime,
				),
			"SectionArticle",
			"artid",
		);

		// Noticias
		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/noticia`,
					maxPages,
					lastFetchTime,
				),
			"Noticia",
			"sid",
		);

		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/topics`,
					maxPages,
					lastFetchTime,
				),
			"Topic",
			"topicid",
		);

		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/categories`,
					maxPages,
					lastFetchTime,
				),
			"Category",
			"catid",
		);

		// Links
		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/links`,
					maxPages,
					lastFetchTime,
				),
			"Link",
			"lid",
		);

		await updateOrCreateNodes(
			() =>
				fetchAllData(
					`http://api.${estadoSlug}.turista.com.mx/links-categories`,
					maxPages,
					lastFetchTime,
				),
			"LinkCategory",
			"cid",
		);

		console.log("Finalizando creación de nodos");
		return newFetchTime;
	} catch (error) {
		console.error("Error en la creación de nodos:", error);
		return null;
	}
}

module.exports = { fetchAllData, createNodes };

async function fetchArticleContent(estadoSlug, artid) {
	const url = `http://api.${estadoSlug}.turista.com.mx/articles/${artid}`;
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
		return data.content || null;
	} catch (error) {
		console.error(`❌ Error fetching content for article ${artid}:`, error);
		return null;
	}
}
