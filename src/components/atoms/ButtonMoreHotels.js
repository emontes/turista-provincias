import React from 'react'
import styled from 'styled-components'
import device from '../../assets/themes/device'

const ButtonMoreHotels = ({ title, onClick }) => {
  return <Wrapper onClick={onClick}>{title}</Wrapper>
}

export default ButtonMoreHotels

const Wrapper = styled.div`
  margin: 1rem auto 2rem !important;
  background: red;
  width: 50%;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.primary5};
  color: ${(props) => props.theme.colors.primary8};
  font-size: 1.5rem;
  border-radius: 50px;
  box-shadow: var(--light-shadow);
  padding: 1rem;
  background: var(--clr-white);
  transition: var(--transition);

  @media ${device.tablet} {
    width: 25%;
  }
  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.primary5};
    box-shadow: var(--dark-shadow);
    color: ${(props) => props.theme.colors.primary10};
  }
`
