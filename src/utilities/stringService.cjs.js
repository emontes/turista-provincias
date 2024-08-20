// src/utilities/stringService.cjs.js

// Notas: Este lo usamos como wrapper para CommonJS y que se pueda usar en Node.js (gatsby-node)

// src/utilities/stringService.js

const sanearString = (string, blankReplacement = '-') => {
    if (!string) return '';
    string = string.trim().toLowerCase();

    const map = {
      'á': 'a', 'à': 'a', 'ä': 'a', 'â': 'a',
      'é': 'e', 'è': 'e', 'ë': 'e', 'ê': 'e',
      'í': 'i', 'ì': 'i', 'ï': 'i', 'î': 'i',
      'ó': 'o', 'ò': 'o', 'ö': 'o', 'ô': 'o',
      'ú': 'u', 'ù': 'u', 'ü': 'u', 'û': 'u',
      'ñ': 'n', 'ç': 'c',
      '@': 'at', '&': 'and'
    };

    string = string.replace(/[áàäâéèëêíìïîóòöôúùüûñç@&]/g, match => map[match]);
    string = string.replace(/[\W_]+/g, blankReplacement);

    return string;
};

const vistaToUrl = (vista, currentLang) => {
    const string = vista.alias || vista[`hvi_desc_${currentLang}`];
    return sanearString(string, '+');
};

const getFirstChars = (string, length) => {
    if (string.length <= length) return string;
    return string.substring(0, length) + '...';
};

const normalizeString = (string) => {
    return string
      .normalize('NFD') // Descompone caracteres latinos en su forma base
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .toLowerCase();
};

const stripTagsAndTruncate = (string, length) => {
    const strippedString = string.replace(/<\/?[^>]+(>|$)/g, ""); // Elimina etiquetas HTML
    return getFirstChars(strippedString, length);
};

const hotelToUrlHtml = ($id, $hotelName, $currentlang) => {
    const stringSano = sanearString($hotelName, '+').toLowerCase();
    if ($currentlang === 'english') {
      return `${stringSano}-hotel-${$id}.html`;
    } 
    return `hotel-${stringSano}-${$id}.html`;
};

const vistaToUrlHtml = (vista, currentLang, externo = null) => {
    const stringSano = vistaToUrl(vista, currentLang).toLowerCase();
    let hotelesLet;

    if (currentLang === 'english') {
      hotelesLet = `${stringSano}-hotels-${vista.hviid}.html`;
    } else {
      hotelesLet = `hoteles-${stringSano}-${vista.hviid}.html`;
    }

    let retval;
    if (externo) {
      retval = `${externo.canonical}/${hotelesLet}`;
    } else {
      retval = hotelesLet;
    }

    return retval;
};

const vistaActionToUrlHtml = (vista, currentLang, action) => {
    const stringSano = vistaToUrl(vista, currentLang).toLowerCase();
    let hotelesLet;

    if (currentLang === 'english') {
      hotelesLet = `${stringSano}-hotels-${vista.hviid}`;
    } else {
      hotelesLet = `hoteles-${stringSano}-${vista.hviid}`;
    }

    const retval = `${hotelesLet}-${action}.html`;
    return retval;
};

const vistaPageToUrl = (vista, currentLang, page, action, stars = null) => {
    const stringSano = vistaToUrl(vista, currentLang).toLowerCase();
    let hotelesLet;

    if (currentLang === 'english') {
      hotelesLet = `${stringSano}-hotels-${vista.hviid}`;
    } else {
      hotelesLet = `hoteles-${stringSano}-${vista.hviid}`;
    }

    let retval;
    let yaEsta = false;

    if (action === 'index') {
      if (page === 1) {
        retval = vistaActionToUrlHtml(vista, currentLang, action);
      } else {
        retval = `${hotelesLet}-p${page}.html`;
      }
      yaEsta = true;
    }

    if (action === 'estrellas' || action === 'stars') {
      if (page === 1) {
        retval = `${hotelesLet}-${action}-${stars}.html`;
      } else {
        retval = `${hotelesLet}-${action}-${stars}-p${page}.html`;
      }
      yaEsta = true;
    }

    if (!yaEsta) {
      if (page === 1) {
        retval = vistaActionToUrlHtml(vista, currentLang, action);
      } else {
        retval = `${hotelesLet}-${action}-p${page}.html`;
      }
    }

    return retval;
};

const vistaStarsToUrl = (vista, currentLang, stars) => {
    const stringSano = vistaToUrl(vista, currentLang).toLowerCase();
    let hotelesLet;
    let starsLet;

    if (currentLang === 'english') {
      hotelesLet = `${stringSano}-hotels-${vista.hviid}`;
      starsLet = '-stars-';
    } else {
      hotelesLet = `hoteles-${stringSano}-${vista.hviid}`;
      starsLet = '-estrellas-';
    }

    const retval = `${hotelesLet}${starsLet}${stars}.html`;
    return retval;
};

// Exportar funciones
module.exports = {
    sanearString,
    vistaToUrl,
    getFirstChars,
    normalizeString,
    stripTagsAndTruncate,
    hotelToUrlHtml,
    vistaToUrlHtml,
    vistaActionToUrlHtml,
    vistaPageToUrl,
    vistaStarsToUrl,
};
