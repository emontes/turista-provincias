import React from 'react'
import styled from 'styled-components'
const Title = ({ title }) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <div className="line"></div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 1.25rem;
  z-index: 0;
  h4 {
    color: ${(props) => props.theme.colors.primary1};
    font-size: 1.5rem;
    font-weight: 500;
    background: var(--clr-grey-10);
    display: inline-block;
    margin-bottom: 0;
    padding: 0 0.6rem;
  }
  .line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1.5px;
    transform: translateY(-50%);
    background: ${(props) => props.theme.colors.primary9};
    z-index: -1;
  }
`
export default Title
