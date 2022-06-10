import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'

import ButtonPages from '../../components/Noticias/ButtonPages'
const Tema = ({ data }) => {
  const topics = data.allStrapiNoticia.distinct
  return (
    <Layout
      heroImg={data.image.localFile.childImageSharp}
      main="Temas de Noticias"
      sub="sobre Chiapas"
      linkExterno="/noticias/tema"
    >
      <Seo
        title="Temas de Noticias en Turista Chiapas"
        description="Muestra los diferentes temas de noticias que se encuentran registrados en Turista Chiapas."
      />
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
        {topics.map((item) => (
          <p key={item}>
            <ButtonPages url={item} description={item} />
          </p>
        ))}
      </div>
      <BannerAdsense />
    </Layout>
  )
}

export default Tema

export const query = graphql`
  {
    allStrapiNoticia(filter: { estado: { Name: { eq: "Chiapas" } } }) {
      distinct(field: topics___slug)
    }

    image: strapiMedia(name: { eq: "noticia-chiapas-c2c.jpg" }) {
      name
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
