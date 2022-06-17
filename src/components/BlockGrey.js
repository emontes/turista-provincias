import React from 'react'
import styled from 'styled-components'

const BlockGrey = ({ title, children }) => {
  return (
    <Wrapper>
      <div className="block">
        <h2>{title}</h2>
        <div className="content">{children}</div>
      </div>
    </Wrapper>
  )
}

export default BlockGrey

const Wrapper = styled.div`
  border: 1px solid #e1e1e1;
  margin-bottom: 12px;
  border-radius: 8px;
  position: relative;

  .block {
    background: #f3f3f3;
    border: 1px solid #fcfcfc;
    border-radius: 7px;
    position: relative;
  }

  h2 {
    background: #e4e3e3;
    font-size: 18px;
    font-weight: normal;
    color: ${(props) => props.theme.colors.primary1};
    line-height: 39px;
    border-bottom: 1px solid #f8f8f8;
    padding: 0 0 0 20px;
    margin: 0;
    border-radius: 7px 7px 0px 0px;
    position: relative;
    letter-spacing: -1px;
  }

  .content {
    color: #acabab;
    border-top: 1px solid #e7e7e7;
    padding: 1rem;
  }
`
