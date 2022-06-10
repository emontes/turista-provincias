import React from 'react'
import { FaSearchDollar, FaPiggyBank } from 'react-icons/fa'
import { RiSecurePaymentLine } from 'react-icons/ri'

const advantages = [
  {
    icon: <FaSearchDollar />,
    title: 'Precios y Descuentos',
    text:
      'Supervisamos ofertas, buscamos y comparamos precios proporcionados por 70 servicios de reserva de hoteles.',
  },
  {
    icon: <FaPiggyBank />,
    title: 'Sin cuotas ocultas',
    text:
      'Turista opera con y muestra el precio final de la habitación. Sin impuestos adicionales ni tarifas ocultas.',
  },

  {
    icon: <RiSecurePaymentLine />,
    title: 'Seguro',
    text:
      'Todos los servicios de reserva son inspeccionados minuciosamente por nuestro Departamento de Seguridad.',
  },
]

export default advantages
