import React from 'react'
import Banner from '../Banner'
import InsertaScript from '../../utilities/InsertaScript'
import styled from 'styled-components'
import device from '../../assets/themes/device'

const textos = {
  chiapas:
    'Chiapas es auténtico por naturaleza.  Chiapas es, y ha sido, siempre la última frontera, un estado que no puedes dejar de visitar',
  edomexico:
    'El estado de México tiene mucho para ver, desde los más impresionantes sitios arqueológicos, museos y maravillas naturales; hasta los más modernos desarrollos urbanos.',
}

const ligas = {
  chiapas:
    '//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=7&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=&lat=16.75&lng=-92.633333',
  edomexico:
    '//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=7&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=&lat=19.288333&lng=-99.667222',
  yucatan:
    '//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=7&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=&lat=20.978431&lng=-89.619942',
}

const Mapa = ({ metadata }) => {
  return (
    <Wrapper>
      <div className="mapa-container">
        <h2 className="section-title">¿Conoces {metadata.estado.name}?</h2>
        <div className="mapa">
          <InsertaScript liga={ligas[metadata.estado.slug]} />
        </div>
        <div>
          <p>{textos[metadata.estado.slug]}</p>
          <p>{metadata.description}</p>
        </div>
      </div>
      <Banner showHotelsBox={true} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-white);
  padding: 1rem;
  @media ${device.desktop} {
    display: grid;
    grid-template-columns: 1fr 30rem;
    column-gap: 1rem;
  }
  h2 {
    margin: 1.5rem;
    font-size: 1.9rem;
    text-align: center;
  }
  .mapa-container {
    display: none;
    @media ${device.laptopL} {
      display: block;
    }
  }
  .mapa {
    width: 800px;
    margin: 0 auto 1.5rem;
  }
`

export default Mapa
