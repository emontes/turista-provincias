import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
// import ReactMarkdown from 'react-markdown'
import Banner from '../../components/Banner'
import Seo from '../../components/Seo'
import BannerAdsense from '../../utilities/BannerAdsense'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'
import BlockGrey from '../../components/atoms/BlockGrey'
import Compartir from '../../components/atoms/Compartir'

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

  let tree = []
  if (sectionParent) {
    let item = {
      slug: sectionParent.slug,
      title: sectionParent.title,
    }
    tree.push(item)
  }
  tree.push({
    slug: data.article.sections[0].slug,
    title: data.article.sections[0].title,
  })

  return (
    <Layout linkExterno="/informacion">
      <Seo title={title} description={content.data.content.substring(0, 250)} />
      <Wrapper title="Informaciónes">
        <div className=" xl:flex">
          <article>
            <Breadcrumbs
              homeLink="/informacion"
              homeTitle="Información"
              tree={tree}
              endTitle={title}
            />

            <h2 className="text-center">{title}</h2>
            <div className="border-b w-2/3 m-auto"></div>

            <BannerAdsense className="h90" format="fluid" />
            <div className="section-article">
              <MDXRenderer>{content.data.childMdx.body}</MDXRenderer>
              {/* <ReactMarkdown children={content.data.content} /> */}
            </div>

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
          <div>
            <Banner
              title="Informacion"
              description="&nbsp;"
              listItems1={listItems1}
            />

            <BlockGrey title="compartir">
              <Compartir url={`/info/${pageContext.slug}`} title={title} />
            </BlockGrey>
          </div>
        </div>
        <br />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled(ContainerGrecas)`
  .mdarti {
    border: 1px solid red;
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
          childMdx {
            body
          }
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
