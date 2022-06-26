import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'
import { getSrc } from 'gatsby-plugin-image'
import ButtonPages from '../../components/atoms/ButtonPages'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'

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
      <ContainerGrecas
        title={`Información de ${metadata.estado.name}`}
        sideNavSec
      >
        <h3 className="section-title">Secciones</h3>
        <BannerAdsense />
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
      </ContainerGrecas>
      <BannerAdsense />
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
