import React from 'react'

const Leyenda = ({ location }) => {
  return (
    <p style={{ background: 'var(--crl-white)' }}>
      * Tarifas para reservar hoteles en {location} listadas en Pesos Mexicanos
      basado en el costo promedio más económico (antes de impuestos) por noche.
      <br />
      ** Los precios son solamente de referencia y varían, para saber el precio
      exacto debe hacer click en el Hotel que le parezca más atractivo.
    </p>
  )
}

export default Leyenda
