import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const ButtonPages = ({ url, description }) => {
  return <Wrapper to={url}>{description}</Wrapper>
}

export default ButtonPages

const Wrapper = styled(Link)`
  border: 1px solid var(--clr-grey-5);
  border-radius: var(--radius);
  box-shadow: var(--light-shadow);
  padding: 1rem;
  background: var(--clr-white);

  margin-right: 1.5rem;
  transition: var(--transition);
  :hover {
    background: var(--clr-grey-5);
    box-shadow: var(--dark-shadow);
  }
`
