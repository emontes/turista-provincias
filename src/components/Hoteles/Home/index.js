import React from 'react'
import Advantages from './Advantages'
import Map from './Map'
import OurHotelSearch from './OurHotelSearch'
import ListaLocations from './location-list'

const Hoteles = ({ metadata, locations }) => {
  console.log('Locations en hoteles/home/index: ', locations)
  return (
    <section>
      <Map metadata={metadata} />
      <ListaLocations metadata={metadata} locations={locations} />
      <Advantages metadata={metadata} />

      <OurHotelSearch />
    </section>
  )
}

export default Hoteles
