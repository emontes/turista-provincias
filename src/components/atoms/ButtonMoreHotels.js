import React from 'react'
import styled from 'styled-components'

const ButtonMoreHotels = ({ title, onClick }) => {
  return <Wrapper onClick={onClick}>{title}</Wrapper>
}

export default ButtonMoreHotels

const Wrapper = styled.div`
  margin: 1rem auto 2rem !important;
  width: 25%;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.primary5};
  color: ${(props) => props.theme.colors.primary8};
  font-size: 1.5rem;
  border-radius: 50px;
  box-shadow: var(--light-shadow);
  padding: 1rem;
  background: var(--clr-white);

  transition: var(--transition);
  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.primary5};
    box-shadow: var(--dark-shadow);
    color: ${(props) => props.theme.colors.primary10};
  }
`
