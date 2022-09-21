import React from 'react'
import Banner from '../Banner'
import Map from '../../components/Hoteles/partial/Map'
import { Trans } from 'gatsby-plugin-react-i18next'

const estadoSlug = process.env.ESTADO_SLUG
const travelData = require(`../../constants/configs/${estadoSlug}/travelPayouts`)

const Mapa = ({ metadata, pageContext, seoDescription }) => {
  let textos = {
    chiapas:
      'Chiapas es auténtico por naturaleza.  Chiapas es, y ha sido, siempre la última frontera de México, el lugar que aparece en tus seños cuando la selva tapa el cielo con el verde de su follaje, cascadas maravillosas, lagos de colores, un estado que no puedes dejar de visitar.',
    edomexico:
      'El estado de México tiene mucho para ver, desde los más impresionantes sitios arqueológicos, museos y maravillas naturales; hasta los más modernos desarrollos urbanos.',
    yucatan:
      'Yucatán es la tierra del faisán y del venado, es poesía... es música... el lugar de las Maravilas, imponente arqueología, la cuna de la trova. No dejes de visitar la tierra de los elegidos.',
  }
  if (pageContext.language === 'en') {
    textos = {
      chiapas:
        'Chiapas is authentic by nature. Chiapas is, and has always been, the last frontier of Mexico, the place that appears in your dreams when the jungle covers the sky with the green of its foliage, wonderful waterfalls, colored lakes, a state that you cannot miss.',
      edomexico:
        'The state of Mexico has much to see, from the most impressive archaeological sites, museums and natural wonders; to the most modern urban developments.',
      yucatan:
        'Yucatan is the land of the pheasant and the deer, it is poetry... it is music... the place of wonders, imposing archeology, the cradle of trova. Be sure to visit the land of the chosen ones.',
    }
  }

  return (
    <section className="2xl:flex">
      <div className="2xl:w-1/3 2xl:order-last">
        <Banner showHotelsBox={true} />
      </div>

      <div className=" 2xl:w-2/3">
        <h3 className="text-red-600 text-center uppercase">
          <Trans>¿Conoces</Trans> {metadata.estado.name}?
        </h3>
        <Map location={travelData.location} zoom={7} />
        <div className="mt-16">
          <p>{textos[metadata.estado.slug]}</p>
        </div>
      </div>
    </section>
  )
}

export default Mapa
