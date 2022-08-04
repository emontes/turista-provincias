import React from 'react'
import './src/assets/themes/global.css' // para el Tailwind
// import GlobalStyle from './src/assets/themes/globalStyles'
import { ThemeProvider } from 'styled-components'

import Chiapas from './src/assets/themes/chiapas'
import EdoMexico from './src/assets/themes/edomexico'
import Yucatan from './src/assets/themes/yucatan'
const estadoSlug = process.env.ESTADO_SLUG

export const wrapRootElement = ({ element }) => {
  let themeSel = Chiapas
  if (estadoSlug === 'edomexico') themeSel = EdoMexico
  if (estadoSlug === 'yucatan') themeSel = Yucatan
  return <ThemeProvider theme={themeSel}>{element}</ThemeProvider>
}
