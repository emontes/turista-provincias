import React from 'react'
import { Script, ScriptStrategy } from 'gatsby'
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
  return (
    <ThemeProvider theme={themeSel}>
      {element}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5136877882943908"
        crossOrigin="anonymous"
        strategy={ScriptStrategy.idle}
        id="adsense"
      />
    </ThemeProvider>
  )
}
