import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import device from '../../assets/themes/device'

const SearchBox = ({ placeholder, onChangeHandler }) => (
  <Wrapper>
    <input type="search" placeholder={placeholder} onChange={onChangeHandler} />
    <FaSearch className="icon" />
  </Wrapper>
)

export default SearchBox

const Wrapper = styled.div`
  margin: 0 auto 1rem;
  width: 80%;
  color: rgb(68, 71, 106);
  position: relative;

  @media${device.lg} {
    width: 40%;
    margin-right: 1rem;
  }

  .icon {
    position: absolute;
    top: 12px;
    left: 10px;
  }
  input {
    display: block;
    height: calc(1.5em + 1.2625rem);
    padding: 0.6rem 0.75rem;
    padding-left: 30px;
    font-weight: 300;
    line-height: 1.5;
    width: 100%;
    background-color: rgb(236, 240, 243);
    background-clip: padding-box;
    border: 0.0625rem solid rgb(209, 217, 230);
    border-radius: 0.3rem;
    box-shadow: rgb(184 185 190) 2px 2px 5px inset,
      rgb(255 255 255) -3px -3px 7px inset;
    transition: all 0.3s ease-in-out 0s;
  }
`
