// src/templates/noticias/noticia-template.js

import React from 'react';
import { Link } from 'gatsby';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import styled from 'styled-components';

const MonopolyCard = styled.article`
  max-width: 800px;
  margin: 2rem auto;
  background-color: #f9f9f9;
  border: 8px solid #000;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  font-family: 'Monopoly', 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #d32f2f;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  border-bottom: 2px solid #000;
  padding-bottom: 0.5rem;
`;

const Metadata = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
  }
`;

const Category = styled(Link)`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Topic = styled(Link)`
  background-color: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  margin-left: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e88e5;
  }
`;

const NoticiaTemplate = ({ pageContext }) => {
  const { noticiaCompleta } = pageContext;

  return (
    <Layout>
      <Seo 
        title={noticiaCompleta.title} 
        description={noticiaCompleta.hometext.replace(/<[^>]*>/g, '').slice(0, 160)}
      />
      <MonopolyCard>
        <Title>{noticiaCompleta.title}</Title>
        <Metadata>
          <span>Fecha: {new Date(noticiaCompleta.time).toLocaleDateString()}</span>
          <span>Autor: {noticiaCompleta.aid}</span>
        </Metadata>
        <Metadata>
          <Category to={`/noticias/${noticiaCompleta.cattitle?.toLowerCase().replace(/\s+/g, '-')}.html`}>
            {noticiaCompleta.cattitle || 'Sin categoría'}
          </Category>
          <Topic to={`/noticias/tema/${noticiaCompleta.topictext?.toLowerCase().replace(/\s+/g, '-')}.html`}>
            {noticiaCompleta.topictext || 'Sin tema'}
          </Topic>
        </Metadata>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: noticiaCompleta.hometext }} />
          <div dangerouslySetInnerHTML={{ __html: noticiaCompleta.bodytext }} />
        </Content>
        <Metadata>
          <span>Vistas: {noticiaCompleta.counter}</span>
          <span>Comentarios: {noticiaCompleta.comments}</span>
        </Metadata>
      </MonopolyCard>
    </Layout>
  );
};

export default NoticiaTemplate;