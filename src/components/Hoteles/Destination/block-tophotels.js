import React from 'react'
import BlockGrey from '../../atoms/BlockGrey'
import ListaHotelesUl from './lista-hoteles-ul'
import styled from 'styled-components'
import device from '../../../assets/themes/device'

const Top = ({ data, location }) => {
  return (
    <BlockGrey title={`Top Hoteles ${location.name}`}>
      <Wrapper>
        <ListaHotelesUl
          title={`Los Hoteles más Económicos de ${location.name}`}
          hoteles={data.topecono.nodes}
        />

        <ListaHotelesUl
          title={`Los Hoteles más Populares de ${location.name}`}
          hoteles={data.toppopular.nodes}
        />

        <ListaHotelesUl
          title={`Los Hoteles mejor Valorados de ${location.name}`}
          hoteles={data.toprated.nodes}
        />

        <ListaHotelesUl
          title={`Los Hoteles más Grandes de ${location.name}`}
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
