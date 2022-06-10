import React from 'react'
import styled from 'styled-components'
import About from './About'
import HotelsBox from './HotelsBox'
import ListItems from './ListItems'

const index = ({ title, description, image, showHotelsBox, listItems1 }) => {
  return (
    <Wrapper>
      <About title={title} description={description} image={image} />
      {listItems1 && (
        <ListItems
          title={listItems1.title}
          items={listItems1.items}
          linkTo={listItems1.linkTo}
          linkToSuffix={listItems1.linkToSuffix}
        />
      )}
      {showHotelsBox && <HotelsBox />}
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
      grid-template-columns: repeat(auto-fit, 28rem);
      column-gap: 3rem;
    }
  }
`
export default index
