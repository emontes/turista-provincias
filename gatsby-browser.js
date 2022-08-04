import { wrapRootElement as wrap } from './root-wrapper'

export const wrapRootElement = wrap

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5136877882943908"
      crossOrigin="anonymous"
    ></script>,
  ])
}
