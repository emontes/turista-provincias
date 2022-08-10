import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import styled from 'styled-components'

const Item = ({ text }) => {
  return (
    <Wrapper className="name transition flex items-center text-xl pl-2 pr-4 rounded-md">
      <BiChevronRight />
      {text}
    </Wrapper>
  )
}

export default Item

const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.primary5};
  :hover {
    background: ${(props) => props.theme.colors.primary6};
    color: ${(props) => props.theme.colors.primary10};
  }
`
