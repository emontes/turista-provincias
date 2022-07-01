import React from 'react'
import styled from 'styled-components'

const SearchBox = ({ placeholder, onChangeHandler }) => (
  <Wrapper type="search" placeholder={placeholder} onChange={onChangeHandler} />
)

export default SearchBox

const Wrapper = styled.input`
  -webkit-appearance: none;
  border: 1px solid grey;
  outline: none;
  padding: 10px;
  width: 150px;
  line-height: 30px;
  margin-bottom: 30px;
`
