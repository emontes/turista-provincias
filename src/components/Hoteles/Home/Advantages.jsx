import React from 'react'
import Title from '../../atoms/Title'
import advantages from '../../../constants/Hoteles/advantages'
import advantagesEn from '../../../constants/Hoteles/advantages-en'
import styled from 'styled-components'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

const Advantages = ({ metadata }) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  let ventajas = advantages
  if (language === 'en') {
    ventajas = advantagesEn
  }

  return (
    <Wrapper>
      <Title
        title={t('Ventajas de Reservar con')}
        subtitle={`Turista ${metadata.estado.name}`}
      />
      <div className="center">
        {ventajas.map((item, index) => {
          return (
            <article key={index} className="advantage">
              <span>{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Advantages

const Wrapper = styled.section`
  background: var(--clr-white);
  padding: 4rem 0;
  .center {
    width: 80vw;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 2rem;
  }
  .advantage {
    margin: 2rem 0;
    text-align: center;
  }
  .advantage span {
    color: ${(props) => props.theme.colors.primary5};
    padding: 0.5rem;
    display: inline-block;
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }
  .advantage h4 {
    text-transform: uppercase;
  }
`
