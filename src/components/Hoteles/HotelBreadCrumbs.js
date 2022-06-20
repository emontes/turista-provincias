import React from 'react'
import Breadcrumbs from '../atoms/Breadcrumbs'

const HotelBreadCrumbs = ({ location, endTitle }) => {
  const tree = [
    { slug: `${location.hotel_location.slug}.html`, title: location.name },
  ]

  return (
    <Breadcrumbs
      homeLink="/hoteles"
      homeTitle="Hoteles"
      tree={tree}
      endTitle={endTitle}
      singleUrl
    />
  )
}

export default HotelBreadCrumbs
