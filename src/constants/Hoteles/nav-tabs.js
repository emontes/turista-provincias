import React from 'react'
import {
  FaRegMap,
  FaList,
  // FaRegLightbulb,
  FaRegMoneyBillAlt,
  FaChartLine,
  // FaRegPaperPlane,
  FaUserPlus,
  FaRegHeart,
} from 'react-icons/fa'
// import { GrDiamond } from 'react-icons/gr'

const Tabs = [
  {
    icon: <FaList />,
    title: 'Listado',
    url: 'lista',
  },
  {
    icon: <FaRegMap />,
    title: 'Mapa',
    url: 'mapa',
  },
  // {
  //   icon: <FaRegLightbulb />,
  //   title: 'Ofertas',
  //   url: 'ofertas',
  // },
  {
    icon: <FaRegMoneyBillAlt />,
    title: 'Económicos',
    url: 'economicos',
  },
  {
    icon: <FaUserPlus />,
    title: 'Populares',
    url: 'populares',
  },
  {
    icon: <FaRegHeart />,
    title: 'Valorados',
    url: 'valorados',
  },
  // {
  //   icon: <GrDiamond />,
  //   title: 'Completos',
  //   url: 'completos',
  // },
  {
    icon: <FaChartLine />,
    title: 'Grandes',
    url: 'grandes',
  },
  // {
  //   icon: <FaRegPaperPlane />,
  //   title: 'Travel',
  //   url: 'travel',
  // },
]

export default Tabs
