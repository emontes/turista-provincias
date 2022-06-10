import React from 'react'
import styled from 'styled-components'

const Link = ({ link }) => {
  return (
    <Wrapper>
      <div>{link.url}</div>
      <a className="url" href={link.url}>
        {link.title}
      </a>
      <p>{link.description}</p>
    </Wrapper>
  )
}

export default Link

const Wrapper = styled.div`
  width: 80%;
  margin-bottom: 2rem;
  line-height: 1.3;
  font-size: 1rem;

  a {
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    color: #1a0dab !important;
    :hover {
      border-bottom: 2px solid #1a0dab;
    }
  }

  p {
    font-size: 1rem;
  }
`
