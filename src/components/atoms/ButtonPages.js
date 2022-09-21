import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby-plugin-react-i18next'

const ButtonPages = ({ url, description }) => {
  return <Wrapper to={url}>{description}</Wrapper>
}

export default ButtonPages

const Wrapper = styled(Link)`
  border: 1px solid ${(props) => props.theme.colors.primary5};
  border-radius: 50px;
  box-shadow: var(--light-shadow);
  padding: 1rem;
  background: var(--clr-white);

  margin-right: 1.5rem;
  transition: var(--transition);
  :hover {
    background: ${(props) => props.theme.colors.primary5};
    box-shadow: var(--dark-shadow);
  }
`
