import React, { useState, useEffect } from 'react';
import './src/assets/themes/global.css'; // para Tailwind
import { ThemeProvider } from 'styled-components';

import ChiapasTheme from './src/assets/themes/chiapas';
import EdoMexicoTheme from './src/assets/themes/edomexico';
import YucatanTheme from './src/assets/themes/yucatan';

const themeMap = {
  chiapas: ChiapasTheme,
  edomexico: EdoMexicoTheme,
  yucatan: YucatanTheme,
};

// Nuevo componente de React
const ThemedWrapper = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(ChiapasTheme);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const estadoSlug = process.env.GATSBY_ESTADO_SLUG;
    setCurrentTheme(themeMap[estadoSlug] || ChiapasTheme);
  }, []);

  if (!isClient) return null;

  return (
    <ThemeProvider theme={currentTheme}>
      {children}
    </ThemeProvider>
  );
};

// Modificamos wrapRootElement para usar el nuevo componente
export const wrapRootElement = ({ element }) => {
  return <ThemedWrapper>{element}</ThemedWrapper>;
};