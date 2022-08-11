import React from 'react'
import { Partytown } from '@builder.io/partytown/react'
import { wrapRootElement as wrap } from './root-wrapper'

const ORIGIN = 'https://www.googletagmanager.com'
const GATSBY_GA_MEASUREMENT_ID = process.env.ANALYTICS_ID

export const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
    return null
  setHeadComponents([
    <Partytown key="ganalytics" forward={['gtag']} />,
    <script
      key="google-analytics"
      type="text/partytown"
      src={`${ORIGIN}/gtag/js?id=${GATSBY_GA_MEASUREMENT_ID}`}
    />,
    <script
      key="google-analytics-config"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){ window.dataLayer.push(arguments);}
        gtag('js', new Date()); 
        gtag('config', '${GATSBY_GA_MEASUREMENT_ID}', { send_page_view: false })`,
      }}
    />,
  ])
}

export const wrapRootElement = wrap
