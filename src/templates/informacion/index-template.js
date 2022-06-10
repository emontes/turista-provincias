import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'
import BannnerAdsense from '../../utilities/BannerAdsense'
import { getSrc } from 'gatsby-plugin-image'
import ButtonPages from '../../components/Noticias/ButtonPages'
import Banner from '../../components/Banner'
const Informacion = ({ data, pageContext }) => {
  return (
    <Layout
      heroImg={data.image.localFile.childImageSharp}
      main="Información"
      sub="sobre Chiapas"
      seoTitle="Información de Chiapas"
      linkExterno="/informacion"
    >
      <Seo
        title="Información de Chiapas"
        description="Artículos Informativos sobre el Estado de Chiapas, México"
        image={getSrc(data.image.localFile.childImageSharp)}
      />
      <section className="section">
        <h1 className="section-title">Información de Chiapas</h1>
        <div className="section-center">
          <div
            className="cont-area"
            style={{
              padding: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {pageContext.sections.map((item) => (
              <p key={item.slug}>
                <ButtonPages url={item.slug} description={item.title} />
              </p>
            ))}
          </div>
          <Banner description="Información sobre el Estado de Chiapas, México" />
        </div>
      </section>
      <BannnerAdsense />
    </Layout>
  )
}

export default Informacion

export const query = graphql`
  query {
    image: strapiMedia(name: { eq: "topic-informacion.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
