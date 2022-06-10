import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Banner from '../../components/Banner'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'

const Article = ({ data, pageContext }) => {
  const { title, content, sections } = data.article
  let sectionParent = ''
  if (data.article.sections[0].strapi_parent)
    sectionParent = data.article.sections[0].strapi_parent
  const listItems1 = {
    title: 'Secciones',
    items: pageContext.sectionsMaster,
    linkTo: 'informacion',
  }

  return (
    <Layout linkExterno="/informacion">
      <Seo title={title} description={content.data.content.substring(0, 250)} />
      <Wrapper className="section">
        <div className="section-center">
          <article>
            <div className="breadcrumb">
              <Link to="/informacion">Información</Link>
              {' > '}
              {sectionParent && (
                <>
                  <Link to={`/informacion/${sectionParent.slug}`}>
                    {sectionParent.title}
                  </Link>
                  {' > '}
                </>
              )}
              <Link to={`/informacion/${data.article.sections[0].slug}`}>
                {data.article.sections[0].title}
              </Link>
              {' > '}
              {title}
            </div>
            <div className="post-info">
              <h1>{title}</h1>

              <div className="date-box">
                <div class="s9-widget-wrapper"></div>
              </div>

              <div className="underline"></div>
            </div>

            <ReactMarkdown children={content.data.content} />

            {sections.map((section) => (
              <Link
                key={section.slug}
                className="category topic"
                to={`/informacion/${section.slug}`}
              >
                {section.title}
              </Link>
            ))}
          </article>
          <div
            className="cont-area"
            style={{ background: 'var(--clr-grey-10)' }}
          >
            <Banner
              title="Informacion"
              description="Articulo de Información sobre el Estado de Chiapas, México"
              listItems1={listItems1}
            />
          </div>
        </div>
        <BannerAdsense style={{ marginTop: '1rem' }} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.section`
  .category {
    color: var(--clr-white);
    background: var(--clr-grey-4);
    border-radius: var(--radius);
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
  }
  .topic {
    background: var(--clr-grey-8);
    margin-right: 1rem;
  }
  .post-info {
    margin: 2rem 0 4rem 0;
    text-align: center;

    h1 {
      margin: 1.25rem 0;
      font-size: 1.9rem;
      font-weight: 400;
    }

    .date-box {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--clr-grey-5);

      & .date {
        display: flex;
        align-items: center;
        & .icon {
          color: ${(props) => props.theme.colors.primary5};
          margin-right: 0.5rem;
        }
      }
    }
  }

  .image {
    width: 100%;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }

  p {
    color: var(--clr-grey-5);
  }
  .underline {
    width: 5rem;
    height: 1px;
    background: var(--clr-grey-9);
    margin: 1rem auto;
    margin-bottom: 1rem;
  }
`

export const pageQuery = graphql`
  query($id: String) {
    article: strapiSectionArticle(id: { eq: $id }) {
      slug
      title
      content {
        data {
          content
        }
      }
      sections {
        slug
        title
        strapi_parent {
          title
          slug
        }
      }
    }
  }
`

export default Article
