import React from 'react'
import styled from 'styled-components'
import Title from '../../atoms/Title'
import Mapa from '../partial/Map'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const estadoSlug = process.env.ESTADO_SLUG
const travelData = require(`../../../constants/configs/${estadoSlug}/travelPayouts`)

const Map = ({ metadata }) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Title title={t('¿Conoces')} subtitle={`${metadata.estado.name}?`} />
      <p>
        <Trans>
          En este mapa te presentamos las ubicaciones que cuentan con
        </Trans>{' '}
        <b>
          <Trans>Hoteles en</Trans> {metadata.estado.name}
        </b>
      </p>
      <Mapa location={travelData.location} zoom={7} />
    </Wrapper>
  )
}

export default Map

const Wrapper = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: var(--clr-white);
`
