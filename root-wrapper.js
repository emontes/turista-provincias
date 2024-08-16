import React, { lazy, Suspense } from 'react';
import './src/assets/themes/global.css'; // para Tailwind
import { ThemeProvider } from 'styled-components';

const Chiapas = lazy(() => import('./src/assets/themes/chiapas'));
const EdoMexico = lazy(() => import('./src/assets/themes/edomexico'));
const Yucatan = lazy(() => import('./src/assets/themes/yucatan'));
const estadoSlug = process.env.ESTADO_SLUG

export const wrapRootElement = ({ element }) => {
  let ThemeComponent = Chiapas;
  if (estadoSlug === 'edomexico') ThemeComponent = EdoMexico;
  if (estadoSlug === 'yucatan') ThemeComponent = Yucatan;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={ThemeComponent}>
        {element}
      </ThemeProvider>
    </Suspense>
  );
};
