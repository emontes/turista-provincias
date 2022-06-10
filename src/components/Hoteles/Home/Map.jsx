import React from 'react'
import styled from 'styled-components'
import InsertaScript from '../../../utilities/InsertaScript'
import Title from '../../Title'

const ligas = {
  chiapas:
    '//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=7&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=&lat=16.75&lng=-92.633333',
  edomexico:
    '//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=7&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=&lat=19.288333&lng=-99.667222',
}
const Map = ({ metadata }) => {
  return (
    <Wrapper>
      <Title title="¿Conoces " subtitle={`${metadata.estado.name}?`} />
      <p>
        En este mapa te presentamos las ubicaciones que cuentan con{' '}
        <b>hoteles en {metadata.estado.name}</b>
      </p>
      <div className="map">
        <InsertaScript liga={ligas[metadata.estado.slug]} noAsync={true} />
      </div>
    </Wrapper>
  )
}

export default Map

const Wrapper = styled.section`
  display: none;
  text-align: center;
  padding: 4rem 0;
  background: var(--clr-white);
  @media screen and (min-width: 992px) {
    display: block;
  }
  .map {
    width: 800px;
    margin: auto;
    border: 1px solid var(--clr-grey-8);
    box-shadow: var(--light-shadow);
  }
`
