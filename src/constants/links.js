import React from 'react'
import {
  FaHotel,
  // FaHome,
  FaRegNewspaper,
  FaInfoCircle,
  FaLink,
} from 'react-icons/fa'

const data = [
  // {
  //   id: 1,
  //   icon: <FaHome />,
  //   text: 'inicio',
  //   url: '/',
  // },
  {
    id: 2,
    icon: <FaHotel />,
    text: 'hoteles',
    url: '/hoteles',
  },

  {
    id: 3,
    icon: <FaRegNewspaper />,
    text: 'noticias',
    url: '/noticias',
  },
  {
    id: 4,
    icon: <FaInfoCircle />,
    text: 'información',
    url: '/informacion',
  },
  {
    id: 5,
    icon: <FaLink />,
    text: 'directorio',
    url: '/links.html',
  },
]

export default data
