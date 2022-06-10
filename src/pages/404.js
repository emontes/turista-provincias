import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import BannerAdsense from '../utilities/BannerAdsense'

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
  backgroundColor: 'var(--clr-white)',
  padding: '5rem',
}
const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4,
}

// markup
const NotFoundPage = () => {
  return (
    <Layout>
      <div style={pageStyles} className="cont-area">
        <title>No encontrada</title>
        <h1 style={headingStyles}>Página no encontrada</h1>
        <p style={paragraphStyles}>
          Lo siento{' '}
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>{' '}
          no pudimos encontrar lo que buscas.
          <br />
          {process.env.NODE_ENV === 'development' ? (
            <>
              <br />
              Try creating a page in <code style={codeStyles}>src/pages/</code>.
              <br />
            </>
          ) : null}
          <br />
          <Link to="/">Ir al home</Link>.
        </p>
      </div>
      <BannerAdsense />
    </Layout>
  )
}

export default NotFoundPage
