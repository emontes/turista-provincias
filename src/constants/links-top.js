import React from 'react'
import { FaHotel, FaHome, FaSearch } from 'react-icons/fa'

const data = [
  {
    id: 1,
    icon: <FaHome />,
    text: 'inicio',
    url: '/',
  },
  {
    id: 2,
    icon: <FaHotel />,
    text: 'hoteles',
    url: '/hoteles',
  },
  {
    id: 6,
    icon: <FaSearch />,
    text: 'buscar',
    url: '/buscar',
  },
]

export default data
