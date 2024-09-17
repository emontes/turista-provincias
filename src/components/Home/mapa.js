import React from 'react'
import Banner from '../Banner'
import MapaHoteles from '../../components/Hoteles/partial/Map'
import { Trans } from 'gatsby-plugin-react-i18next'

const estadoSlug = process.env.GATSBY_ESTADO_SLUG
const travelData = require(`../../constants/configs/${estadoSlug}/travelPayouts`)

const Mapa = ({ metadata, pageContext, seoDescription }) => {
  let textos = {
    chiapas:
      'Descubre Chiapas, la última frontera de México y un paraíso auténtico por naturaleza. Aquí, selvas exuberantes abrazan el cielo, cascadas majestuosas danzan entre montañas y lagos multicolores reflejan una belleza infinita. Sumérgete en ruinas milenarias, pueblos mágicos y una biodiversidad asombrosa. Chiapas no solo se visita, se vive; cada rincón promete aventuras inolvidables y experiencias que cautivan el alma. Ven y déjate maravillar por este tesoro natural y cultural.',
    edomexico:
      'Experimente la fascinante diversidad del Estado de México, donde la historia prehispánica se fusiona con la modernidad urbana. Desde majestuosos sitios arqueológicos y museos que narran siglos de cultura, hasta impresionantes maravillas naturales y desarrollos contemporáneos, cada rincón ofrece una aventura única. Descubra un destino que combina perfectamente el pasado y el presente en un solo viaje inolvidable.',
    yucatan:
      'Yucatán, tierra de maravillas, fusiona historia y naturaleza en un paraíso único. Descubre imponentes ruinas mayas, playas de ensueño y cenotes cristalinos. Deléitate con su rica gastronomía, música tradicional y cálida hospitalidad. Explora coloridos pueblos mágicos y sumérgete en una cultura milenaria que cautiva a cada paso.',
  }
  if (pageContext.language === 'en') {
    textos = {
      chiapas:
        'Discover Chiapas, The last frontier of Mexico and a paradise authentic by nature. Here, lush jungles embrace the sky, majestic waterfalls dance among mountains, and multicolored lakes reflect infinite beauty. Immerse yourself in ancient ruins, magical towns, and astounding biodiversity. Chiapas is not just visited, it is experienced; every corner promises unforgettable adventures and soul-stirring moments. Come and be amazed by this natural and cultural treasure.',
      edomexico:
        'Experience the captivating diversity of Estado de México, where ancient history blends with urban modernity. From majestic archaeological sites and museums narrating centuries of culture to breathtaking natural wonders and contemporary developments, every corner offers a unique adventure. Discover a destination that perfectly combines past and present in one unforgettable journey.',
      yucatan:
        'Yucatan, a land of wonders, blends history and nature into a unique paradise. Discover impressive Mayan ruins, dreamy beaches, and crystal-clear cenotes. Delight in its rich cuisine, traditional music, and warm hospitality. Explore colorful magical towns and immerse yourself in an ancient culture that captivates at every turn.',
    }
  }
  console.log('Travel Data: ', travelData)

  return (
    <section className="2xl:flex">
      <div className="2xl:w-1/3 2xl:order-last">
        <Banner showHotelsBox={true} />
      </div>

      <div className=" 2xl:w-2/3">
        <h3 className="text-red-600 text-center uppercase">
          <Trans>¿Conoces</Trans> {metadata.estado.name}?
        </h3>
        <MapaHoteles location={travelData.location} zoom={7} />
        <div className="mt-4">
          <p>{textos[metadata.estado.slug]}</p>
        </div>
      </div>
    </section>
  )
}

export default Mapa
