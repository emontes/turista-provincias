import React from 'react'
import styled from 'styled-components'
import About from './About'
import Topics from '../Noticias/Topics'
import Categories from '../Noticias/Categories'
import BannerAdsense from '../../utilities/BannerAdsense'

const index = ({
  title,
  description = 'Noticias de Turismo en Chiapas',
  isHome,
  topics,
  categories,
  image,
}) => {
  return (
    <Wrapper>
      {!isHome && (
        <About title={title} description={description} image={image} />
      )}
      {categories && <Categories items={categories} />}
      {topics && <Topics topics={topics} />}
      <BannerAdsense />
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  display: grid;
  grid-template-columns: 90%;
  justify-content: center;
  row-gap: 1rem;
  background: var(--clr-grey-10);
  border-radius: var(--radius);
  padding: 1rem 0;

  @media (min-width: 576px) {
    & {
      grid-template-columns: repeat(auto-fit, 300px);
      column-gap: 3rem;
    }
  }
`
export default index
