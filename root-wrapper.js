import React  from 'react';
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

const estadoSlug = process.env.ESTADO_SLUG

export const wrapRootElement = ({ element }) => {
  const theme  = themeMap[estadoSlug] || ChiapasTheme;
  return (

      <ThemeProvider theme={theme}>
        {element}
      </ThemeProvider>

  );
};
