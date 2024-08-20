import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Title from '../../atoms/Title'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { vistaToUrlHtml } from '../../../utilities/stringService'

const Lista = ({ metadata, locations }) => {
  const { t } = useTranslation()
  const estadoDslug = metadata.estado.slug
  const defaultImage = `https://edomexico.turista.com.mx/img/hoteles/banner/edomexico/hoteles-turista.jpg`

  return (
    <Wrapper>
      <Title
        title={t('Destinos con')}
        subtitle={`${t('Hoteles en')} ${metadata.estado.name}`}
      />
      <div className="destinos">
        {locations.map((item) => {
          const slug = vistaToUrlHtml(item, 'spanish')
          const imageUrl = item.banner_spanish
            ? `https://turista.me/img/hoteles/banner/${estadoDslug}/${item.banner_spanish}`
            : defaultImage

          return (
            <Link key={item.hviid} to={`/${slug}`}>
              <div className="hero">
                <img
                  src={imageUrl}
                  alt={`${t('Hoteles en')} ${item.hvi_desc_spanish}`}
                  title={`${t('Hoteles en')} ${item.hvi_desc_spanish}`}
                  className="hero-img"
                />
                <div className="overlay" />
                <div className="name">{item.hvi_desc_spanish}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Lista

const Wrapper = styled.section`
  padding: 2rem;
  text-align: center;

  .destinos {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .hero {
    background-color: ${(props) => props.theme.colors.primary9};
    background-size: cover;
    background-position: top;
    position: relative;
    overflow: hidden;
  }

  .hero-img {
    width: 350px;
    height: auto;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* Ajusta la opacidad según sea necesario */
  }

  .name {
    position: absolute;
    top: 0;
    left: 1%;
    padding: 0.5rem;
    color: white; /* Asegura que el color del texto sea blanco para contraste */
    font-size: 1.5 rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Sombra para mejorar la legibilidad */
    z-index: 1;
  }
`
