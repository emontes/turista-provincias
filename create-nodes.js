const fetch = require("node-fetch");

async function fetchAllData(baseUrl, fields = null, maxPages = Infinity, lastFetchTime = null) {
  let page = 1;
  let allData = [];
  let hasNextPage = true;
  console.log('Last Fetch Time: ', lastFetchTime);

  while (hasNextPage && page <= maxPages) {
    console.log(`Generando Nodos ${baseUrl} Página `, page);
    let url = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${page}`;
    if (fields) {
      url += `&fields=${fields.join(",")}`;
    }
    if (lastFetchTime) {
      url += `&last_updated=${encodeURIComponent(lastFetchTime)}`;
	  console.log ('🔥 El url con last_updated es: ', url);
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
      console.error(`❌ Error fetching data from ${url}:`, error);
      hasNextPage = false;
    }
  }

  return allData;
}

async function createNodes({ actions, createNodeId, createContentDigest, getNodesByType }, lastFetchTime = null) {
	console.log("Iniciando creación de nodos");
	const { createNode, touchNode } = actions;
	const estadoSlug = process.env.ESTADO_SLUG;
  
	const maxPages = Number.parseInt(process.env.MAX_PAGES_FETCH) || Number.POSITIVE_INFINITY;
	console.log("Número máximo de páginas:", maxPages);
  
	const newFetchTime = new Date().toISOString();

  try {
    console.log("Obteniendo datos de locations");
    const locations = await fetchAllData(
      `http://api.${estadoSlug}.turista.com.mx/estado-vistas/1`,
      null,
      maxPages,
      lastFetchTime
    );
    console.log(`${locations.length} locations obtenidas`);

    console.log("Obteniendo datos de informacion (SECTIONS)");
    const sections = await fetchAllData(
      `http://api.${estadoSlug}.turista.com.mx/sections`,
      [],
      maxPages,
      lastFetchTime
    );

    console.log("Obteniendo datos de noticias (sin bodytext)");
    const noticias = await fetchAllData(
      `http://api.${estadoSlug}.turista.com.mx/noticia`,
      ["sid", "title", "time", "catid", "topic", "hometext"],
      maxPages,
      lastFetchTime
    );
    console.log(`${noticias.length} noticias obtenidas`);

    console.log("Obteniendo datos de topics");
    const topics = await fetchAllData(
      `http://api.${estadoSlug}.turista.com.mx/topics`,
      null,
      maxPages,
      lastFetchTime
    );
    console.log(`${topics.length} topics obtenidos`);

    console.log("Obteniendo datos de categories");
    const categories = await fetchAllData(
      `http://api.${estadoSlug}.turista.com.mx/categories`,
      null,
      maxPages,
      lastFetchTime
    );
    console.log(`${categories.length} categories obtenidas`);

    // Obtén los nodos existentes
    const existingLocations = getNodesByType('Location');
    const existingSections = getNodesByType('Section');
    const existingTopics = getNodesByType('Topic');
    const existingCategories = getNodesByType('Category');
    const existingNoticias = getNodesByType('Noticia');

    // Create or update nodes for locations
    for (const location of locations) {
      const nodeId = createNodeId(`location-${location.hviid}`);
      const existingNode = existingLocations.find(node => node.id === nodeId);

      if (existingNode) {
        touchNode(existingNode);
      } else {
        const node = {
          ...location,
          id: nodeId,
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
    }

    // Create or update nodes for Sections
    for (const section of sections) {
      const nodeId = createNodeId(`section-${section.secid}`);
      const existingNode = existingSections.find(node => node.id === nodeId);

      if (existingNode) {
        touchNode(existingNode);
      } else {
        const node = {
          ...section,
          id: nodeId,
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
    }

    // Create or update nodes for topics
    for (const topic of topics) {
      const nodeId = createNodeId(`topic-${topic.topicid}`);
      const existingNode = existingTopics.find(node => node.id === nodeId);

      if (existingNode) {
        touchNode(existingNode);
      } else {
        const node = {
          ...topic,
          id: nodeId,
          parent: null,
          children: [],
          internal: {
            type: "Topic",
            content: JSON.stringify(topic),
            contentDigest: createContentDigest(topic),
          },
        };
        createNode(node);
      }
    }

    // Create or update nodes for categories
    for (const category of categories) {
      const nodeId = createNodeId(`category-${category.catid}`);
      const existingNode = existingCategories.find(node => node.id === nodeId);

      if (existingNode) {
        touchNode(existingNode);
      } else {
        const node = {
          ...category,
          id: nodeId,
          parent: null,
          children: [],
          internal: {
            type: "Category",
            content: JSON.stringify(category),
            contentDigest: createContentDigest(category),
          },
        };
        createNode(node);
      }
    }

    // Create or update nodes for noticias
    for (const noticia of noticias) {
      const nodeId = createNodeId(`noticia-${noticia.sid}`);
      const existingNode = existingNoticias.find(node => node.id === nodeId);

      if (existingNode) {
        touchNode(existingNode);
      } else {
        const node = {
          ...noticia,
          id: nodeId,
          parent: null,
          children: [],
          internal: {
            type: "Noticia",
            content: JSON.stringify(noticia),
            contentDigest: createContentDigest(noticia),
          },
        };
        createNode(node);

        actions.createNodeField({
          node,
          name: "topic___NODE",
          value: createNodeId(`topic-${noticia.topic}`),
        });

        actions.createNodeField({
          node,
          name: "category___NODE",
          value: createNodeId(`category-${noticia.catid}`),
        });
      }
    }

    console.log("Finalizando creación de nodos");
    return newFetchTime;
  } catch (error) {
    console.error("Error en la creación de nodos:", error);
	return null;
  }
}

module.exports = { fetchAllData, createNodes };