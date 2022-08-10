import React from 'react'
import styled from 'styled-components'
import InsertaScript from '../../../utilities/InsertaScript'

const Map = ({ location, zoom = 14 }) => {
  const { latitude, longitude } = location

  const liga = `//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&lat=${latitude}&lng=${longitude}&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=${zoom}&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=`
  return (
    <Wrapper>
      <div className="map">
        <InsertaScript id="map" src={liga} />
      </div>
    </Wrapper>
  )
}

export default Map

const Wrapper = styled.div`
  text-align: center;
  .map {
    width: 95%;
    margin: auto;
    border: 1px solid var(--clr-grey-8);
    box-shadow: var(--light-shadow);
    @media screen and (min-width: 992px) {
      width: 800px;
    }
  }
`
