// src/utilities/stringService.js

export const sanearString = (string, blankReplacement = '-') => {
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
  
  export const vistaToUrl = (vista, currentLang) => {
    const string = vista.alias || vista[`hvi_desc_${currentLang}`];
    return sanearString(string, '+');
  };
  
  export const getFirstChars = (string, length) => {
    if (string.length <= length) return string;
    return string.substring(0, length) + '...';
  };
  
  export const normalizeString = (string) => {
    return string
      .normalize('NFD') // Descompone caracteres latinos en su forma base
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .toLowerCase();
  };
  
  export const stripTagsAndTruncate = (string, length) => {
    const strippedString = string.replace(/<\/?[^>]+(>|$)/g, ""); // Elimina etiquetas HTML
    return getFirstChars(strippedString, length);
  };

  export const vistaToUrlHtml = (vista, currentLang, externo = null) => {
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

  export const vistaActionToUrlHtml = (vista, currentLang, action) => {
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
  
  export const vistaPageToUrl = (vista, currentLang, page, action, stars = null) => {
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
  
  export const vistaStarsToUrl = (vista, currentLang, stars) => {
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
  