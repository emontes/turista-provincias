// src/components/Noticias/TopicCard.js
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const CardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  border: 2px solid #000;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f0f0f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ImageWrapper = styled.div`
  height: 150px;
`

const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const NewsCount = styled.span`
  font-size: 0.9rem;
  color: #666;
`

const TopicCard = ({ topic, image, newsCount }) => {
  const formattedUrl = `/noticias/tema/${topic.replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.html`
  
  return (
    <CardWrapper to={formattedUrl}>
      <ImageWrapper>
        <GatsbyImage image={getImage(image)} alt={topic} style={{height: '100%'}} />
      </ImageWrapper>
      <Content>
        <Title>{topic}</Title>
        <NewsCount>{newsCount} noticias</NewsCount>
      </Content>
    </CardWrapper>
  )
}

export default TopicCard