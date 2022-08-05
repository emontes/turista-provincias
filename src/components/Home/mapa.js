import React from 'react'
import InsertaScript from '../../utilities/InsertaScript'
import Banner from '../Banner'
import styled from 'styled-components'
import device from '../../assets/themes/device'

const estadoSlug = process.env.ESTADO_SLUG
const travelData = require(`../../constants/configs/${estadoSlug}/travelPayouts`)

const textos = {
  chiapas:
    'Chiapas es auténtico por naturaleza.  Chiapas es, y ha sido, siempre la última frontera, un estado que no puedes dejar de visitar',
  edomexico:
    'El estado de México tiene mucho para ver, desde los más impresionantes sitios arqueológicos, museos y maravillas naturales; hasta los más modernos desarrollos urbanos.',
  yucatan:
    'Yucatán es la tierra del faisán y del venado, es poesía... es música...  no dejes de visitar la tierra de los elegidos',
}

const Mapa = ({ metadata }) => {
  return (
    <Wrapper>
      <div className="mapa-container">
        <h2 className="section-title">¿Conoces {metadata.estado.name}?</h2>
        <div className="mx-auto mb-5 w-fit">
          <InsertaScript src={travelData.mapa} />
        </div>

        <div>
          <p>{textos[metadata.estado.slug]}</p>
          <p>{metadata.description}</p>
        </div>
      </div>
      <Banner showHotelsBox={true} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-white);
  padding: 1rem;
  @media ${device.desktop} {
    display: grid;
    grid-template-columns: 1fr 30rem;
    column-gap: 1rem;
  }
  h2 {
    margin: 1.5rem;
    font-size: 1.9rem;
    text-align: center;
  }
  .mapa-container {
    display: none;
    @media ${device.laptopL} {
      display: block;
    }
  }
`

export default Mapa
