import React from 'react'
import BlockGrey from '../../atoms/BlockGrey'
import ListaHotelesUl from './lista-hoteles-ul'
import styled from 'styled-components'
import device from '../../../assets/themes/device'

const Top = ({ data }) => {
  const { location } = data
  const locationName = location.hvi_desc_spanish
  return (
    <BlockGrey title={`Top Hoteles ${locationName}`}>
      <Wrapper>
        <ListaHotelesUl
          title={`Los Hoteles más Económicos de ${locationName}`}
          hoteles={data.topecono.nodes}
        />

        {/* <ListaHotelesUl
          title={`Los Hoteles más Populares de ${locationName}`}
          hoteles={data.toppopular.nodes}
        /> */}

        {/* <ListaHotelesUl
          title={`Los Hoteles mejor Valorados de ${locationName}`}
          hoteles={data.toprated.nodes}
        /> */}

        <ListaHotelesUl
          title={`Los Hoteles más Grandes de ${locationName}`}
          hoteles={data.topgrandes.nodes}
        />
      </Wrapper>
    </BlockGrey>
  )
}

export default Top

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  @media${device.lg} {
    flex-direction: row;
  }
  @media${device.laptopL} {
    flex-direction: column;
  }
`
