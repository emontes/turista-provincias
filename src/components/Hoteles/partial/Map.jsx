import React from 'react'
import InsertaScript from '../../../utilities/InsertaScript'

const Mapa = ({ location, zoom = 14 }) => {
  const { latitud, longitud } = location

  const liga = `//tp.media/content?0=0&1=10&currency=mxn&promo_id=4285&lat=${latitud}&lng=${longitud}&shmarker=182367&campaign_id=101&trs=29063&search_host=jet.turista.com.mx%2Fhotels&locale=es&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=800&height=500&zoom=${zoom}&radius=60&stars=0%2C1%2C2%2C3%2C4%2C5&price_from=&price_to=`

  return (
    <div className="p-10 text-center">
      <div className="w-[95%] mx-auto border border-gray-300 shadow-md lg:w-[800px]">
        <InsertaScript id="map" src={liga} />
      </div>
    </div>
  )
}

export default Mapa