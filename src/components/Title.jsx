import React from 'react'
import styled from 'styled-components'

const Title = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <h4>
        <span className="title">{title}</span>
        <span>{subtitle}</span>
      </h4>
    </div>
  )
}

export default styled(Title)`
  margin-bottom: 2rem;
  h4 {
    font-size: 1.6rem;
    text-align: center;
    letter-spacing: 0.1rem;
    color: ${(props) => props.theme.colors.primary5};
  }
  .title {
    color: var(--clr-black);
  }
  span {
    display: block;
  }
  @media (min-width: 576px) {
    h4 {
      font-size: 2.3rem;
    }

    span {
      display: inline-block;
      margin: 0 0.35rem;
    }
  }
`
