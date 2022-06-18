import React from 'react'
import styled from 'styled-components'

const BlockGrey = ({ title, children }) => {
  return (
    <Wrapper>
      <div className="block">
        {title && <h2>{title}</h2>}

        <div className={`content ${title ? 'content-border-top' : ''}`}>
          {children}
        </div>
      </div>
    </Wrapper>
  )
}

export default BlockGrey

const Wrapper = styled.div`
  border: 1px solid #e1e1e1;
  margin-bottom: 1rem;
  border-radius: 8px;

  .block {
    background: #f3f3f3;
    border: 1px solid #fcfcfc;
    border-radius: 7px;
  }

  h2 {
    background: #e4e3e3;
    font-size: 1.8rem;
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
    padding: 1rem;
  }

  .content-border-top {
    border-top: 1px solid #e7e7e7;
  }
`
