import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'
import BannnerAdsense from '../../utilities/BannerAdsense'
import { getSrc } from 'gatsby-plugin-image'
import ButtonPages from '../../components/Noticias/ButtonPages'
import Banner from '../../components/Banner'
const Informacion = ({ data, pageContext }) => {
  const metadata = data.site.siteMetadata
  return (
    <Layout
      heroImg={data.image.localFile.childImageSharp}
      main="Información"
      sub={`sobre ${metadata.estado.name}`}
      seoTitle={`${metadata.estado.name} Información`}
      linkExterno="/informacion"
    >
      <Seo
        title={`Información de ${metadata.estado.name}`}
        description={`Artículos Informativos sobre el Estado de ${metadata.estado.name}, México`}
        image={getSrc(data.image.localFile.childImageSharp)}
      />
      <section className=" nav_main">
        <h2 className="nav_main--h2">Información de {metadata.estado.name}</h2>
        <div className="economy_bg">
          <div className="nav_link_details">
            <h3 className="section-title">Secciones</h3>
            <br />
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

              <Banner
                description={`Información sobre el Estado de ${metadata.estado.name}, México`}
              />
            </div>
          </div>
        </div>
      </section>
      <BannnerAdsense />
    </Layout>
  )
}

export default Informacion

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        estado {
          name
          slug
          slogan
        }
      }
    }

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
