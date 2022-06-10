import React from 'react'
import styled from 'styled-components'
import FormSearchHotels from '../FormSearchHotels'
import DestinationCard from './destination-card'
import device from '../../../assets/themes/device'

const Hoteles = ({ topDestinos }) => {
  console.log('Top destinos en el Hero de hoteles: ', topDestinos)
  return (
    <Wrapper>
      <div className="featured">
        <FormSearchHotels />
      </div>
      <div className="destinos">
        {topDestinos.map((destino, index) => {
          return <DestinationCard key={index} destino={destino} />
        })}
      </div>
    </Wrapper>
  )
}

export default Hoteles

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .destinos {
    margin: 0 0 -13rem;

    width: 50%;
    display: flex;
    gap: 2rem;
  }
  .featured {
    flex-basis: 100%;
    @media ${device.laptop} {
      flex-basis: 45%;
    }
  }
`
