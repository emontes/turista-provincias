import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import { FaRegClock } from 'react-icons/fa'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Banner from '../../components/Banner/indexNoticias'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'
import Compartir from '../../components/atoms/Compartir'
import TopNavSec from '../../components/atoms/TopNavSec'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const Article = ({ data, pageContext }) => {
  const {
    title,
    datePlano,
    date,
    dateSlug,
    location,
    topics,
    hometext,

    bodytext,
    image,
    localizations,
  } = data.strapiNoticia

  const fecha = new Date(datePlano)

  let displayImage
  if (image) {
    displayImage = image
  } else {
    if (topics[0]) displayImage = topics[0].image
  }

  const { t } = useTranslation()

  let footLanguages = []
  console.log({ data })
  if (localizations.data) {
    localizations.data.forEach((item) => {
      let slug = '/'
      slug += `article${dateSlug}-${item.attributes.slug}.html`

      footLanguages.push({
        lng: item.attributes.locale,
        title: item.attributes.title,
        slug: slug,
      })
    })
  }

  return (
    <Layout linkExterno="/noticias" footLanguages={footLanguages}>
      <Seo
        title={title}
        description={
          hometext.data.hometext ? hometext.data.hometext.substring(0, 250) : ''
        }
        image={
          displayImage ? getSrc(displayImage.localFile.childImageSharp) : ''
        }
      />
      <Wrapper className="section">
        <div align="center">
          <BannerAdsense className="h90 mb1" format="fluid" />
        </div>
        <TopNavSec />
        <div className="section-center">
          <article className="article">
            <div className="post-info">
              {location && <span className="category">{location.name}</span>}

              <h1>{title}</h1>

              <div className="date-box text-slate-400">
                <span className="date">
                  <FaRegClock className="icon"></FaRegClock>
                  {date}
                </span>
                <div className="flex gap-2 items-center">
                  <Trans>Compartir</Trans>:{' '}
                  <Compartir url={pageContext.slug} title={title} />
                </div>
              </div>

              <div className="underline"></div>
            </div>

            {image && (
              <GatsbyImage
                image={getImage(image.localFile)}
                className="image"
                alt={title}
                title={title}
              />
            )}

            <ReactMarkdown children={hometext.data.hometext} />
            <BannerAdsense className="h60 mt1 mb1" format="fluid" />
            {bodytext && (
              <MDXRenderer>{bodytext.data.childMdx.body}</MDXRenderer>
            )}

            {topics.map((topic) => (
              <Link
                key={topic.slug}
                className="category topic"
                to={`/noticias/tema/${topic.slug}`}
              >
                {t(topic.Title)}
              </Link>
            ))}
          </article>
          <div
            className="cont-area"
            style={{ background: 'var(--clr-grey-10)' }}
          >
            <Banner
              title="Noticia"
              categories={pageContext.categories}
              image={topics[0] ? topics[0].image : ''}
            />
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.section`
  .article {
    padding: 0 1rem;
    margin: 0 0 2rem;
  }
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

  .underline {
    width: 5rem;
    height: 1px;
    background: var(--clr-grey-9);
    margin: 1rem auto;
    margin-bottom: 1rem;
  }
`

export const pageQuery = graphql`
  query($id: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    strapiNoticia(id: { eq: $id }) {
      id
      slug
      title
      date(formatString: "dd D MMM yy", locale: "es")
      dateSlug: date(formatString: "yy-M")
      datePlano: date
      hometext {
        data {
          hometext
        }
      }

      bodytext {
        data {
          bodytext
          childMdx {
            body
          }
        }
      }
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      location {
        name
      }
      topics {
        Title
        slug
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
      localizations {
        data {
          attributes {
            locale
            title
            slug
          }
        }
      }
    }
  }
`

export default Article
